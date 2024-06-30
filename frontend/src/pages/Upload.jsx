import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import "../styles/Upload.css";
import UploadCard from "../components/UploadCard";
import BreadCrumbBar from "../components/BreadCrumbBar";

import Banner from "../components/Banner";
const Upload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateBreadcrumbs } = useBreadcrumbs();
  const { project, slug } = location.state || {};
  const projectId = project ? project._id : "";
  const uploadData = [
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
  // Function to handle delete action (assuming API call)

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

  if (!project || !slug) {
    return <div>Loading...</div>;
  }

  // Function to handle delete action (assuming API call)
  const handleDelete = (id) => {
    // Implement your API call for delete here
    console.log("Delete item with ID:", id);
  };

  const handleEdit = (id) => {
    const upload = {
      _id: id,
      name: "Upload Spotify Podcast",
      url: "this is the project description/url",
      dateTime: "2024-06-30 11:45 AM",
      status: "Processing",
      id: "2",
      logoName: "spotify",
    };
    navigate(`/project/${slug.slug}/edit-transcript/`, {
      state: { project, slug, upload },
    });
  };

  return (
    <>
      <div className="section-wrapper">
    
        <div className="upload-breacrumbar-handler">
          <BreadCrumbBar/>
        </div>
        <section className="upload-section">
          <h1 className="section-header">{project.name}</h1>
          <div className="upload-card-grid">
            {uploadData.map((item) => (
              <UploadCard key={item.id} name={item.name} logo={item.logoName} />
            ))}
          </div>
        </section>
        {/* banner */}
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
              {uploadData.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.dateTime}</td>
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
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
};

export default Upload;
