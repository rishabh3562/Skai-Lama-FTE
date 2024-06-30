import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import BreadCrumbBar from "../components/BreadCrumbBar";
import { SearchOffOutlined } from "@mui/icons-material";
import "../styles/EditTranscipt.css";

const EditTranscript = () => {
  const { updateBreadcrumbs } = useBreadcrumbs();
  const location = useLocation();
  const { project, slug } = location.state || {};
  const projectId = project ? project._id : "";

  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(project?.description || ""); // Initial description from project
  const [tempDescription, setTempDescription] = useState(description);

  const CachedBreadcrumbs = useCallback(() => {
    if (projectId) {
      updateBreadcrumbs([
        {
          id: "project",
          label: slug.slug,
          link: `/project/${projectId}`,
          isActive: false,
        },
        { id: "upload", label: "Transcript", isActive: true },
      ]);
    }
  }, []);

  useEffect(() => {
    CachedBreadcrumbs(); // Initialize breadcrumbs when component mounts
  }, []);

  useEffect(() => {
    // Cleanup function to reset breadcrumbs when component unmounts
    return () => {
      updateBreadcrumbs([]); // Reset breadcrumbs when component unmounts
    };
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDiscardClick = () => {
    setTempDescription(description);
    setIsEditMode(false);
  };

  const handleSaveClick = () => {
    setDescription(tempDescription);
    setIsEditMode(false);
  };

  const handleDescriptionChange = (e) => {
    setTempDescription(e.target.value);
  };

  return (
    <div className="section-wrapper">
      <div className="edit-transcript-wrapper">
        <div className="edit-transcript-breadcrumb-handler">
          <BreadCrumbBar />
        </div>
        <section className="edit-transcript-section">
          <h1 className="section-header">Edit Transcript</h1>
          <div className="edit-transcript-controls">
            <button onClick={handleEditClick} disabled={isEditMode}>
              Edit
            </button>
            {isEditMode && (
              <>
                <button onClick={handleDiscardClick}>Discard</button>
                <button onClick={handleSaveClick}>Save & Exit</button>
              </>
            )}
          </div>
          {isEditMode ? (
            <div className="editor-container">
              <textarea
                value={tempDescription}
                onChange={handleDescriptionChange}
                className="edit-transcript-textarea"
              />
              <div className="search-icon">
                <SearchOffOutlined />
              </div>
            </div>
          ) : (
            <p className="transcript-description">{description}</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default EditTranscript;
