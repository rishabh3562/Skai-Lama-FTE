import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UploadModal.css";
import CloseIcon from '../assets/closeX.svg';
import { BASE_URL, API_ENDPOINTS } from '../utils/constants';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from "../main"; // Import the existing queryClient
import { toast } from "react-toastify";

const UploadModal = ({ isOpen, handleClose, projectId, IconImageFromCard }) => {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  const createMutation = useMutation({
    mutationFn: (formData) =>
      axios.post(`${BASE_URL}${API_ENDPOINTS.transcript}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries(["uploads", projectId]);
      toast.success("Transcript saved successfully",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style:{
          cursor:"grab"
        },
        progress: undefined,
        theme: "light",
      });
      handleClose(); // Close modal after successful save
    },
    onError: (error) => {
      console.error("Error saving transcript:", error);
      // Handle error (show message, etc.)
      toast.error("Some Error occurred",{
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
  });

  const handleSave = () => {
    createMutation.mutate({
      projectId,
      name,
      description: link, // Assuming description and link are the same for your use case
    });
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
