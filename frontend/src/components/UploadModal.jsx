import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UploadModal.css"
import CloseIcon from '../assets/closeX.svg'
import { BASE_URL, API_ENDPOINTS } from '../utils/constants';
const UploadModal = ({ isOpen, handleClose, projectId,IconImageFromCard }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const handleSave = async () => {
    try {
      const response = await axios.post(`${BASE_URL}${API_ENDPOINTS.transcript}`, {
        projectId,
        name,
        description: link, // Assuming description and link are the same for your use case
      });
      console.log("Transcript saved:", response.data);
      handleClose(); // Close modal after successful save
    } catch (error) {
      console.error("Error saving transcript:", error);
      // Handle error (show message, etc.)
    }
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeLink = (e) => {
    setLink(e.target.value);
  };

  // Close modal on Escape key press
  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  // Listen for Escape key press
  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="uploadcard-modal">
      <div className="uploadcard-modal-content">
        <div className="uploadcard-modal-header">
          <div className="uploadcard-modal-header-left">
          <img src={IconImageFromCard} alt="logo" className="uploadcard-modal-logo" />
          <h2>Upload Transcript</h2>
          </div>
         
          <button className="uploadcard-close-btn" onClick={handleClose}>
            <img src={CloseIcon} alt="close" />
            
            </button>
        </div>
        <div className="uploadcard-modal-input">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
            placeholder="Enter name"
          />
        </div>
        <div className="uploadcard-modal-input">
          <label htmlFor="link">Link</label>
          <input
            type="text"
            id="link"
            value={link}
            onChange={handleChangeLink}
            placeholder="Enter link"
          />
        </div>
        <div className="uploadcard-modal-actions">
          
          <button onClick={handleSave} className="uploadcard-modal-btn upload">
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
