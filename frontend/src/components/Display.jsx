import React, { useState } from 'react';
import '../styles/Display.css';
import Toggle from './Toggle';
const Display = () => {
    const [showSources, setShowSources] = useState(false);

  const handleToggle = () => {
    setShowSources(prevState => !prevState);
  };
  return (
    <div className="display-container">
    <form action="">
      <div className="form-section">
        <div className="form-group">
          <label>Primary Color</label>
          <input type="color" value="#7BD658" />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
        <div className="form-group">
          <label>Font Color</label>
          <input type="color" value="#3C3C3C" />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
        <div className="form-group">
          <label>Font Size (in px)</label>
          <input type="number" placeholder="Enter font size" value="25" />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
        <div className="form-group">
          <label>Chat Height (in % of total screen)</label>
          <input type="number" placeholder="Enter chat height" />
          <small>Lorem ipsum dolor sit Lorem ipsum dolor sit</small>
        </div>
        <div className="form-group">
          <label>Show Sources</label>
          <div className="toggle-switch-container">
            <Toggle isChecked={showSources} onToggle={handleToggle} />
            <small>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, possimus!</small>
          </div>
        </div>
      </div>

    </form>
    <h2>Chat Icon</h2>
    <form action="">

      <div className="form-section">
        <div className="form-group">
          <label>Chat Icon Size</label>
          <select>
            <option>Small (45x45 px)</option>
            <option>Medium (60x60 px)</option>
            <option>Large (75x75 px)</option>
          </select>
        </div>
        <div className="form-group">
          <label>Position on Screen</label>
          <select>
            <option>Bottom Right</option>
            <option>Bottom Left</option>
            <option>Top Right</option>
            <option>Top Left</option>
          </select>
        </div>
        <div className="form-group">
          <label>Distance from Bottom (in px)</label>
          <input type="number" value="20" />
        </div>
        <div className="form-group">
          <label>Horizontal Distance (in px)</label>
          <input type="number" value="20" />
        </div>
        <div className="form-group">
          <label>Bot Icon</label>
          <div className='boticon'></div>
          <button className="upload-button">Upload Image</button>
          <small>Recommended Size: 45x45px</small>
        </div>
      </div>
    </form>
    </div>
  );
};

export default Display;
