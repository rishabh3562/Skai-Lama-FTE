import React, { useState, useEffect } from "react";
import { useEmail } from '../context/EmailContext';
import { useCreateProject } from "../hooks/queryHooks/useCreateProject";
import "../styles/CreateProjectModal.css";
const CreateProjectModal = ({ onClose }) => {
    const [projectName, setProjectName] = useState('');
    const { email } = useEmail();

    const { mutate, isLoading, isError, isSuccess } = useCreateProject();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const project = {
            userEmail: email,
            name: projectName,
        };

        mutate(project);
    };

    // Close modal on successful project creation
    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess, onClose]);

    return (
        <div className="CreateProjectModal-modal-overlay">
            <div className="CreateProjectModal-modal-content">
                <h2>Create Project</h2>
                <form onSubmit={handleSubmit}>
                    <label>Enter Project Name:</label>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        placeholder="Type here"
                    />

                    <div className="CreateProjectModal-modal-buttons">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancel
                        </button>
                        <button type="submit" className="create-btn" disabled={isLoading}>
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                    {isError && <p className="error-message">Error creating project. Please try again.</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateProjectModal;
