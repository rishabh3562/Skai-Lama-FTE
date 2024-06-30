import React, { useState } from "react";
import { Button } from "@mui/material";
import UploadModal from "./UploadModal"; // Import the modal component
import YoutubeImage from "../assets/Youtube.svg";
import SpotifyImage from "../assets/Spotify.svg";
import RssImage from "../assets/Rss.svg";
import NotFoundImage from "../assets/NotFoundImage.svg";
import "../styles/UploadCard.css";

const UploadCard = ({ name, logo, projectId }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Map logos to their respective image paths
  const logoPaths = {
    youtube: YoutubeImage,
    spotify: SpotifyImage,
    rss: RssImage,
    notfound: NotFoundImage,
  };

  // Determine the correct image source based on the logo prop
  const logoImage = logoPaths[logo] || NotFoundImage; // Default to RssImage if logo is undefined

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="uploadCard-wrapper" onClick={handleOpenModal}>
      <img src={logoImage} alt="logo" className="uploadCard-image" />
      <div className="uploadCard-name-wrapper">
        <p className="uploadCard-name">{name}</p>
        <UploadModal
          isOpen={modalOpen}
          handleClose={handleCloseModal}
          projectId={projectId}
          IconImageFromCard={logoImage}
        />
      </div>
    </div>
  );
};

export default UploadCard;
