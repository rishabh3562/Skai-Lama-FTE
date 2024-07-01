import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import axios from "axios";
import "../styles/Upload.css";
import UploadCard from "../components/UploadCard";
import BreadCrumbBar from "../components/BreadCrumbBar";
import Banner from "../components/Banner";
import { API_ENDPOINTS, BASE_URL } from "../utils/constants";
import formatDate from '../utils/dateFormatter1';
import {
  useQuery,
  useMutation,
  
  useQueryClient,
} from "@tanstack/react-query";
import {queryClient} from '../main'

const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateBreadcrumbs } = useBreadcrumbs();
  const { project, slug } = location.state || {};
  const projectId = project ? project._id : "";
  // const [uploadData, setUploadData] = useState([]);
  const fetchUploadData = async () => {
    try {
      const fetchUrl = `${BASE_URL}${API_ENDPOINTS.transcript}/${projectId}`;
      const response = await axios.get(fetchUrl);
      setUploadData(response.data);
    } catch (error) {
      console.error('Error fetching upload data:', error);
      // Handle error (show message, etc.)
    }
  };

  const {data:uploadData,isLoading:isUploadDataLoading} = useQuery({
    queryKey: ["uploads", projectId],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}${API_ENDPOINTS.transcript}/${projectId}`
      );
      return response.data;
    },
    
  });
  useEffect(() => {
    // Update breadcrumbs when projectId or slug changes
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

  // / Mutation to delete an upload
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`${BASE_URL}${API_ENDPOINTS.transcript}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["uploads", projectId]);
    },
  });


  if (!project || !slug) {
    return <div>Loading...</div>;
  }

  // Function to handle delete action
  const handleDelete = async (id) => {
    try {
     const {}= await deleteMutation.mutateAsync(
        id
      );
      console.log("Deleted item with ID:", id);
    } catch (error) {
      console.error("Error deleting item:", error);
      // Handle error (show message, etc.)
    }
  };

  const handleEdit = (id) => {
    // Find the correct item to edit based on ID from uploadData
    const itemToEdit = uploadData.find((item) => item._id === id);
    if (itemToEdit) {
      navigate(`/project/${slug.slug}/edit-transcript/`, {
        state: { project, slug, upload: itemToEdit }, // Pass the item to edit as upload state
      });
    }
  };

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
      logoName: "asdasdas",
    },
    // Add more sample data as needed
  ];

  return (
    <div className="section-wrapper">
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
              onEdit={() => handleEdit(item._id)} // Pass edit handler to card
            />
          ))}
        </div>
      </section>
      {/* Banner */}
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
           <>
           <div>loading..</div>
           
           </>  
           ):(<>
            {uploadData.map((item) => (
              <tr key={item._id}>
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
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
           </>)}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Upload;
