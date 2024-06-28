import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEmail } from "../context/EmailContext";
import addIcon from "../assets/plus.svg";
import EmailModal from "./EmailModal";
import CreateProjectModal from "./CreateProjectModal";

const CreateProjectBtn = ({ text, redirect }) => {
    const { email } = useEmail();
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);

    const handleBtnClick = () => {
        if (email) {
            setShowCreateProjectModal(true); // Show create project modal if logged in
        } else {
            setShowEmailModal(true); // Show email modal to prompt login
        }
    };

    return (
        <>
            <div className="btn-home" onClick={handleBtnClick}>
                <img src={addIcon} alt="" width={"28px"} height={"28px"} />
                <p className="btn-text-home">
                    {redirect ? (
                        <Link to={redirect}>{text ? text : "Create New Project"}</Link>
                    ) : (
                        <>{text ? text : "Create New Project"}</>
                    )}
                </p>
            </div>

            {showEmailModal && (
                <EmailModal onClose={() => setShowEmailModal(false)} />
            )}

            {showCreateProjectModal && (
                <CreateProjectModal onClose={() => setShowCreateProjectModal(false)} />
            )}
        </>
    );
};

export default CreateProjectBtn;
