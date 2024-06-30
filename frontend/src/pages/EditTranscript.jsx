import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import BreadCrumbBar from "../components/BreadCrumbBar";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import axios from "axios";
import "../styles/EditTranscript.css";
import SearchPath from "../assets/Transcript_Search.svg";
import { API_ENDPOINTS, BASE_URL } from "../utils/constants";

const EditTranscript = () => {
  const { updateBreadcrumbs } = useBreadcrumbs();
  const location = useLocation();
  const { project, slug, upload } = location.state || {};
  const projectId = project ? project._id : "";
const transcriptId = upload ? upload._id : "";
console.log("transcriptId", transcriptId);
console.log("projectId", projectId);
  const [isEditMode, setIsEditMode] = useState(false);
  const [description, setDescription] = useState(upload ? upload.description : "");
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
    CachedBreadcrumbs();
  }, []);

  useEffect(() => {
    return () => {
      updateBreadcrumbs([]);
    };
  }, []);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleDiscardClick = () => {
    setTempDescription(description);
    setIsEditMode(false);
  };

  const handleSaveClick = async () => {
    try {
      // Make API call to update description
      const putUrl = `${BASE_URL}${API_ENDPOINTS.transcript}/${transcriptId}`;
      await axios.put(putUrl, { description: tempDescription,
        transcriptId: transcriptId,
        projectId: projectId
       });

      // Update local state with new description
      setDescription(tempDescription);
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating description:", error);
      // Handle error (show message, etc.)
    }
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
          <div className="header-section-active">
            <h1 className="section-header">Edit Transcript</h1>
            <div className="edit-transcript-controls-twobtns-active">
              {isEditMode && (
                <>
                  <button onClick={handleDiscardClick} className="discard-button">
                    Discard
                  </button>
                  <button onClick={handleSaveClick} className="transcript-save-button">
                    Save & Exit
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="editor-container">
            {isEditMode ? (
              <textarea
                className="edit-transcript-textarea-active"
                value={tempDescription}
                onChange={handleDescriptionChange}
              />
            ) : (
              <div
                className="edit-transcript-textarea"
                dangerouslySetInnerHTML={{ __html: tempDescription }}
              />
            )}
            <div className="edit-transcript-controls">
              {!isEditMode && (
                <div onClick={handleEditClick} className="edit-button">
                  <div className="edit-button-wrapper">
                    <EditTwoToneIcon />
                    Edit
                  </div>
                </div>
              )}
              <div className="search-icon">
                <img src={SearchPath} alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EditTranscript;
