import React from 'react';
import YoutubeImage from '../assets/Youtube.svg';
import SpotifyImage from '../assets/Spotify.svg';
import RssImage from '../assets/Rss.svg';
import NotFoundImage from '../assets/NotFoundImage.svg'
import '../styles/UploadCard.css';

const UploadCard = ({ name, logo }) => {
  // Map logos to their respective image paths
  const logoPaths = {
    youtube: YoutubeImage,
    spotify: SpotifyImage,
    rss: RssImage,
    notfound: NotFoundImage
  };

  // Determine the correct image source based on the logo prop
  const logoImage = logoPaths[logo] || NotFoundImage; // Default to RssImage if logo is undefined

  return (
    <div className="uploadCard-wrapper">
      <img src={logoImage} alt="logo" className="uploadCard-image" />
      <div className="uploadCard-name-wrapper">
        <p className="uploadCard-name">{name}</p>
      </div>
    </div>
  );
};

export default UploadCard;
