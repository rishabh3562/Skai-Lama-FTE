import React, { useState } from 'react';
import '../styles/FileDescModal.css';

const FileDescModal = ({ onClose }) => {
  const [nameInput, setNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle form submission logic here

    // Example: Close modal after submission (assuming you have logic to create a project)
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Project</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            required
            placeholder="Enter project name"
          />

          <label>Description:</label>
          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            required
            placeholder="Enter project description"
          />

          <div className="modal-buttons">
            <button type="submit">Create Project</button>
            <button type="button" onClick={onClose}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FileDescModal;
