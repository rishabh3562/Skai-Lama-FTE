import React, { useState } from 'react';
import '../styles/Toggle.css'; // Import the CSS for the toggle switch

const Toggle = ({ isChecked, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isChecked} onChange={onToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default Toggle;
