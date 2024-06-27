import React, { useState } from 'react';
import { useEmail } from '../context/EmailContext';
import '../styles/EmailModal.css'; // Import the CSS for modal styling

const EmailModal = () => {
  const [emailInput, setEmailInput] = useState('');
  const { saveEmail } = useEmail();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior
    const metadata = { userAgent: navigator.userAgent, timestamp: new Date() };
    await saveEmail(emailInput, metadata);
    // Optionally, you can clear the input after submission
    setEmailInput('');
  };

  return (<>
  

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
placeholder='Type Here'
/>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default EmailModal;
