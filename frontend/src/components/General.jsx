import React from 'react'
import '../styles/General.css'
export default function General() {
  return (
    
<div className="general-form-section">
          <form>
            <div className="general-form-group-gen">
              <label htmlFor="chatbotName">Chatbot Name</label>
              <input type="text" id="chatbotName" placeholder="Enter chatbot name" />
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
            </div>
            <div className="general-form-group-gen">
              <label htmlFor="welcomeMessage">Welcome Message</label>
              <input type="text" id="welcomeMessage" placeholder="Enter welcome message" />
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>
              
            </div>
            <div className="general-form-group-gen">
              <label htmlFor="inputPlaceholder">Input Placeholder</label>
              <input type="text" id="inputPlaceholder" placeholder="Enter input placeholder" />
            <p>Lorem ipsuim dolor sit Lorem ipsuim dolor sit</p>

            </div>
          </form>
        </div>
  )
}
