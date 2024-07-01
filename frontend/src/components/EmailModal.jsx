// EmailModal.jsx

import React, { useState } from "react";
import { useEmail } from "../context/EmailContext";
import "../styles/EmailModal.css";

const EmailModal = () => {
  const [emailInput, setEmailInput] = useState("");
  const { saveUserData } = useEmail();
  const [isOpen, setIsOpen] = useState(true); // State to control modal open/close

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metadata = { userAgent: navigator.userAgent, timestamp: new Date() };
    await saveUserData(emailInput, metadata);
    setEmailInput(""); // Clear input after submission
    setIsOpen(false); // Close modal after submission
  };

  if (!isOpen) {
    return null; // Return null if isOpen is false (modal is closed)
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Enter your email</h2>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
            placeholder="Type Here"
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default EmailModal;
