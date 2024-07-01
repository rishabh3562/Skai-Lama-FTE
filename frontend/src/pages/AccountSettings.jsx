import React, { useState, useEffect } from "react";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BASE_URL, API_ENDPOINTS } from "../utils/constants";
import { useEmail } from "../context/EmailContext";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import BreadCrumbBar from "../components/BreadCrumbBar";
import Banner from "../components/Banner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContentLoader,{} from "react-content-loader";
import { css } from "@emotion/react"; // Import css from emotion
import { BarLoader } from "react-spinners"; // Import BarLoader from react-spinners
import "../styles/AccountSetting.css";

const fetchUserProfile = async (email) => {
  const url = `${BASE_URL}${API_ENDPOINTS.user}/url/${encodeURIComponent(
    email
  )}/profile-pic`;
  const response = await axios.post(url, { email });
  return response.data;
};

const updateUsername = async ({ userEmail, username }) => {
  const url = `${BASE_URL}${API_ENDPOINTS.user}/${encodeURIComponent(
    userEmail
  )}/username`;
  const response = await axios.put(url, { username });
  return response.data;
};

const AccountSettings = () => {
  const [newUsername, setNewUsername] = useState("");
  const { email, setUsernameContext, username } = useEmail();
  const { updateBreadcrumbs } = useBreadcrumbs();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submit loading

  useEffect(() => {
    updateBreadcrumbs([
      { id: "settings", label: "/ Account Settings", isActive: true },
    ]);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile", email],
    queryFn: () => fetchUserProfile(email),

    refetchOnWindowFocus: false,
  });

  const mutation = useMutation({
    mutationKey: ["updateUsername"],
    mutationFn: updateUsername,
    onMutate: async ({ userEmail }) => {
      setIsSubmitting(true); // Start submitting
      await queryClient.cancelQueries(["userProfile", userEmail]);

      const previousUserProfile = queryClient.getQueryData([
        "userProfile",
        userEmail,
      ]);

      queryClient.setQueryData(["userProfile", userEmail], (oldData) => ({
        ...oldData,
        username: newUsername,
      }));

      return { previousUserProfile };
    },
    onError: (error, _, context) => {
      toast.error(`Error updating username: ${error.message}`);
      if (context?.previousUserProfile) {
        queryClient.setQueryData(
          ["userProfile", email],
          context.previousUserProfile
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries(["userProfile", email]);
      setNewUsername("");
      setIsSubmitting(false); // End submitting
    },
    onSuccess: () => {
      toast.success("Username updated successfully!");
    },
  });

  const handleUsernameChange = () => {
    if (newUsername.trim() !== "") {
      mutation.mutate({ userEmail: email, username: newUsername });
    }
  };

  return (
    <div className=" section-wrapper">
      <BreadCrumbBar />
      <section className="accounts-section">
      <h1 className="section-header ">Account Settings</h1>
      <section className="account-settings">
        <div className="image-accounts">
          {isLoading ? (
         <ContentLoader
         speed={2}
         width={200}
         height={200}
         viewBox="0 0 200 200"
         backgroundColor="#e0e0e0"
         foregroundColor="#bdbdbd"
         uniqueKey="large-circle-loader"
       >
         <circle cx="100" cy="100" r="80" /> {/* Adjust cx, cy, and r values as needed */}
       </ContentLoader>
          ) : (
          
          
            <img
              src={data?.profilePicUrl}
              alt="Profile Pic"
              className="profile-pic"
              onError={(e) => {
                e.target.style.display = "none"; // Hide image on error
              }}
              onLoad={(e) => {
                e.target.style.display = "block"; // Show image on load
              }}
            />
          )}
        </div>
        <div className="account-settings-form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUsernameChange();
            }}
            className="account-settings-details"
          >
            <div className="input-section-username">
              <div className="input-section-accounts">

              
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                placeholder={username || ""}
                disabled={mutation.isLoading || isSubmitting} // Disable while loading or submitting
              /></div>
                <button type="submit" className="btn-accounts-username" disabled={mutation.isLoading || isSubmitting}>
              Change Username
              {mutation.isLoading ? (
                <BarLoader
                  css={css`
                    display: inline-block;
                    vertical-align: middle;
                  `}
                  color="#ffffff"
                  height={16}
                  width={70}
                />
              ) : (
                isSubmitting && <div className="loader" />
              )}
            </button>
            </div>

            <div className="input-section-accounts">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                readOnly
                onFocus={() => mutation.reset()} // Reset mutation on focus
              />
            </div>
          </form>
        </div>
      </section>
      </section>

      
      <section className="account-settings-subscription " >
        <h1 className="section-header">Subscription</h1>
        <Banner
          Text="You are currently on the Ques AI Basic Plan!"
          BtnText="Upgrade"
        />
      </section>
      <ToastContainer />
    </div>
  );
};

export default AccountSettings;
