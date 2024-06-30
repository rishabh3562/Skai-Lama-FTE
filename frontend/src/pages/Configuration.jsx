import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/Configuration.css";
import General from "../components/General";
import Display from "../components/Display";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import flag from "../assets/UK Flag.svg";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import Breadcrumbs from "../components/BreadCrumb"; // Adjusted import
import BreadCrumbBar from "../components/BreadCrumbBar";

const Configuration = () => {
  const [activeTab, setActiveTab] = useState("general");
  const { updateBreadcrumbs } = useBreadcrumbs();

  useEffect(() => {
    // Update breadcrumbs only once when the component mounts
    updateBreadcrumbs([
      { id: "home", label: "Sample Project", link: "/home", isActive: false },
      { id: "configuration", label: "Widget Configuration", isActive: true },
    ]);
  }, []); // Empty dependency array ensures this effect runs only once

  const handleActiveTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <main>
        <BreadCrumbBar />
        <div className="configuration-header">
          <h1>Configuration</h1>
        </div>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "general" ? "active" : ""}`}
            onClick={() => handleActiveTabClick("general")}
          >
            General
          </button>
          <button
            className={`tab ${activeTab === "display" ? "active" : ""}`}
            onClick={() => handleActiveTabClick("display")}
          >
            Display
          </button>
          <button
            className={`tab ${activeTab === "advanced" ? "active" : ""}`}
            onClick={() => handleActiveTabClick("advanced")}
          >
            Advanced
          </button>
        </div>
        {activeTab === "general" && <General />}
        {activeTab === "display" && <Display />}
      </main>
    </div>
  );
};

export default Configuration;
