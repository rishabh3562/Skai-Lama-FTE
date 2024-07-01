import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import axios from "axios";
import "../styles/Upload.css";
import UploadCard from "../components/UploadCard";
import BreadCrumbBar from "../components/BreadCrumbBar";
import Banner from "../components/Banner";
import { API_ENDPOINTS, BASE_URL } from "../utils/constants";
import formatDate from "../utils/dateFormatter1";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { queryClient } from "../main";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ClipLoader } from "react-spinners";
import ContentLoader from "react-content-loader";

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateBreadcrumbs } = useBreadcrumbs();
  const { project, slug } = location.state || {};
  const projectId = project ? project._id : "";

  const { data: uploadData, isLoading: isUploadDataLoading } = useQuery({
    queryKey: ["uploads", projectId],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}${API_ENDPOINTS.transcript}/${projectId}`
      );
      return response.data;
    },
  });

  useEffect(() => {
    if (projectId) {
      updateBreadcrumbs([
        {
          id: "project",
          label: slug.slug,
          link: `/project/${projectId}`,
          isActive: false,
        },
        { id: "upload", label: "Upload", isActive: true },
      ]);
    }
  }, []);

  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${BASE_URL}${API_ENDPOINTS.transcript}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["uploads", projectId]);
      toast.success("Item deleted successfully");
    },
    onError: () => {
      toast.error("Error deleting item");
    },
  });

  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (id) => {
    const itemToEdit = uploadData.find((item) => item._id === id);
    if (itemToEdit) {
      navigate(`/project/${slug.slug}/edit-transcript/`, {
        state: { project, slug, upload: itemToEdit },
      });
    }
  };

  if (!project || !slug) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
          alignItems: "center",
          minWidth: "100vw",
        }}
      >
        <PuffLoader
          color="#7E22CE"
          cssOverride={null}
          loading
          size={59}
          speedMultiplier={1}
        />
      </div>
    );
  }

  // Example card data (you can fetch this dynamically as you did before)
  const cardData = [
    {
      _id: "667f1c7b0c22ef560aa47efe",
      name: "Upload Youtube Video",
      dateTime: "2024-06-30 10:30 AM",
      status: "Uploaded",
      id: "1",
      logoName: "youtube",
    },
    {
      _id: "667f1c670c22ef560aa47ed6",
      name: "Upload Spotify Podcast",
      dateTime: "2024-06-30 11:45 AM",
      status: "Processing",
      id: "2",
      logoName: "spotify",
    },
    {
      _id: "667f2f1e0c22ef560aa4888a",
      name: "Upload Media or Text File",
      dateTime: "2024-06-30 01:00 PM",
      status: "Failed",
      id: "3",
      logoName: "file",
    },
    // Add more sample data as needed
  ];

  return (
    <div className="section-wrapper">
      <ToastContainer />
      <div className="upload-breacrumbar-handler">
        <BreadCrumbBar />
      </div>
      <section className="upload-section">
        <h1 className="section-header">{project.name}</h1>
        <div className="upload-card-grid">
          {cardData.map((item) => (
            <UploadCard
              key={item._id}
              name={item.name}
              logo={item.logoName}
              projectId={projectId}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item._id)}
            />
          ))}
        </div>
      </section>
      <Banner
        Text={"All files are processed! Your widget is ready to go!"}
        BtnText={"Try it out!"}
      />
      <section className="upload-info-table">
        <table className="upload-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Upload Date & Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isUploadDataLoading ? (
              <tr key={1}>
                <td>
                  <ContentLoader
                    speed={2}
                    width={300}
                    height={100}
                    viewBox="0 0 300 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="10" y="10" rx="4" ry="4" width="300" height="10" />
                    <rect x="10" y="30" rx="4" ry="4" width="300" height="10" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    speed={2}
                    width={200}
                    height={100}
                    viewBox="0 0 200 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="10" y="10" rx="4" ry="4" width="300" height="10" />
                    <rect x="10" y="30" rx="4" ry="4" width="300" height="10" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    speed={2}
                    width={100}
                    height={100}
                    viewBox="0 0 100 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="10" y="10" rx="4" ry="4" width="300" height="10" />
                    <rect x="10" y="30" rx="4" ry="4" width="300" height="10" />
                  </ContentLoader>
                </td>
                <td>
                  <ContentLoader
                    speed={2}
                    width={100}
                    height={100}
                    viewBox="0 0 100 160"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                  >
                    <rect x="10" y="10" rx="4" ry="4" width="300" height="10" />
                    <rect x="10" y="30" rx="4" ry="4" width="300" height="10" />
                  </ContentLoader>
                </td>
              </tr>
            ) : (
              uploadData.map((item) => (
                <tr>
                  <td>{item.name}</td>
                  <td>{formatDate(item.timestamp)}</td>
                  <td>{item.status}</td>
                  <td>
                    <div className="upload-btn-wrapper">
                      <button
                        className="update-table-edit-btn"
                        onClick={() => handleEdit(item._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="update-table-delete-btn"
                        onClick={() => handleDelete(item._id)}
                      >
                        {deleteMutation.isLoading &&
                        deleteMutation.variables === item._id ? (
                          <ClipLoader size={15} color={"#ffffff"} />
                        ) : (
                          "Delete"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Upload;
