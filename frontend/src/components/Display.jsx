import React, { useState } from 'react';
import '../styles/Display.css';
import Toggle from './Toggle';
import uploadImageToS3 from '../utils/aws/awsConfig';
import { API_ENDPOINTS, BASE_URL } from '../utils/constants';
import {useEmail}from '../context/EmailContext'
import axios from 'axios';
const Display = () => {
  const [primaryColor, setPrimaryColor] = useState("#7BD658");
  const [fontColor, setFontColor] = useState("#3C3C3C");
  const [fontSize, setFontSize] = useState(25);
  const [chatHeight, setChatHeight] = useState("");
  const [showSources, setShowSources] = useState(false);
  const [file, setFile] = useState(null);
  const [chatIconSize, setChatIconSize] = useState('Medium (60x60 px)');
  const [positionOnScreen, setPositionOnScreen] = useState('Bottom Right');
  const [distanceFromBottom, setDistanceFromBottom] = useState(20);
  const [horizontalDistance, setHorizontalDistance] = useState(20);
const {email}=useEmail();
console.log(email)
  const handlePrimaryColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };

  const handleFontColorChange = (e) => {
    setFontColor(e.target.value);
  };

  const handleFontSizeChange = (e) => {
    setFontSize(e.target.value);
  };

  const handleChatHeightChange = (e) => {
    setChatHeight(e.target.value);
  };

  const handleToggle = () => {
    setShowSources(prevState => !prevState);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (file) {
      try {
        const url = await uploadImageToS3(file);
        console.log('File uploaded successfully:', url); //gives the url that is to be stored in db
        

        // Save URL to database using API call (PUT/PATCH request)
        const response = await axios.put(`${BASE_URL}${API_ENDPOINTS.user}/${email}/profile-pic`, { profilePicUrl: url });
console.log(response.data)
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleChatIconSizeChange = (e) => {
    setChatIconSize(e.target.value);
  };

  const handlePositionOnScreenChange = (e) => {
    setPositionOnScreen(e.target.value);
  };

  const handleDistanceFromBottomChange = (e) => {
    setDistanceFromBottom(e.target.value);
  };

  const handleHorizontalDistanceChange = (e) => {
    setHorizontalDistance(e.target.value);
  };

  return (
    <div className="display-container">
      <form action="">
        <div className="display-form-section">
          <div className="display-form-group-colour">
            <label className='display-form-group-label'>Primary Color</label>
            <div className="display-from-group-colour-wrapper">
              <input type="text" placeholder="#7BD658" value={primaryColor} onChange={handlePrimaryColorChange} />
              <input type="color" value={primaryColor} onChange={handlePrimaryColorChange} />
            </div>
            <small>Lorem ipsum dolor sit amet</small>
          </div>
          <div className="display-form-group-colour">
            <label className='display-form-group-label'>Font Color</label>
            <div className="display-from-group-colour-wrapper">
              <input type="text" placeholder="#3C3C3C" value={fontColor} onChange={handleFontColorChange} />
              <input type="color" value={fontColor} onChange={handleFontColorChange} />
            </div>
            <small>Lorem ipsum dolor sit amet</small>
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Font Size (in px)</label>
            <input type="number" placeholder="Enter font size" value={fontSize} onChange={handleFontSizeChange} />
            <small>Lorem ipsum dolor sit amet</small>
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Chat Height (in % of total screen)</label>
            <input type="number" placeholder="Enter chat height" value={chatHeight} onChange={handleChatHeightChange} />
            <small>Lorem ipsum dolor sit amet</small>
          </div>
        </div>
        <div className="display-form-group-showSources">
          <div className='display-form-group-showSources-top'>
            <label className='display-form-group-label'>Show Sources</label>
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit.</small>
          </div>
          <div className="toggle-switch-container">
            <Toggle isChecked={showSources} onToggle={handleToggle} />
          </div>
        </div>
        <hr style={{ opacity: 0.6, color: "#DADADA", margin: "2rem 2rem" }} className='' />
      </form>

      <form action="">
        <h2 style={{ marginBottom: "1rem", paddingLeft: "20px" }}>Chat Icon</h2>
        <div className="display-form-section">
          <div className="display-form-group">
            <label className='display-form-group-label'>Chat Icon Size</label>
            <select value={chatIconSize} onChange={handleChatIconSizeChange}>
              <option>Small (45x45 px)</option>
              <option>Medium (60x60 px)</option>
              <option>Large (75x75 px)</option>
            </select>
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Position on Screen</label>
            <select value={positionOnScreen} onChange={handlePositionOnScreenChange}>
              <option>Bottom Right</option>
              <option>Bottom Left</option>
              <option>Top Right</option>
              <option>Top Left</option>
            </select>
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Distance from Bottom (in px)</label>
            <input type="number" value={distanceFromBottom} onChange={handleDistanceFromBottomChange} />
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Horizontal Distance (in px)</label>
            <input type="number" value={horizontalDistance} onChange={handleHorizontalDistanceChange} />
          </div>
          <div className="display-form-group">
            <label className='display-form-group-label'>Bot Icon</label>
            <div className="boticon"></div>
            <input type="file" onChange={handleFileChange} />
            <button type="button" className="display-upload-button" onClick={handleUpload}>Upload Image</button>
            <small>Recommended Size: 45x45px</small>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Display;
