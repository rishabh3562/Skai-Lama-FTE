import React from 'react'

export default function General() {
  return (
    
<div className="form-section">
          <form>
            <div className="form-group-gen">
              <label htmlFor="chatbotName">Chatbot Name</label>
              <input type="text" id="chatbotName" placeholder="Enter chatbot name" />
            </div>
            <div className="form-group-gen">
              <label htmlFor="welcomeMessage">Welcome Message</label>
              <input type="text" id="welcomeMessage" placeholder="Enter welcome message" />
            </div>
            <div className="form-group-gen">
              <label htmlFor="inputPlaceholder">Input Placeholder</label>
              <input type="text" id="inputPlaceholder" placeholder="Enter input placeholder" />
            </div>
          </form>
        </div>
  )
}
