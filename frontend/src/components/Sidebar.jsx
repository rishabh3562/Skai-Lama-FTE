// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css";
import logoText from "../assets/Lama_text.svg";
import logo from "../assets/logo_lama.svg";
import settingsIcon from "../assets/settings_sidebar.svg";
const sidebarItems = [
  { path: "/project", serial: "1", text: "Projects" },
  { path: "/configuration", serial: "2", text: "Widget Configurations" },
  { path: "/deployment", serial: "3", text: "Deployment" },
  { path: "/pricing", serial: "4", text: "Pricing" },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
       <div className="sidebar-top">
       <div className="sidebar-logo-box icon-hover-logo">
          <img src={logo} alt="" width={"38px"} height={"38px"} />
          <img src={logoText} alt="" width={"74px"} height={"74px"} />
        </div>
        <p className="container-90">Sample project name</p>
        <ul className="sidebarList">
          {sidebarItems.map((item) => (
            <li key={item.path} className="sidebarListItem">
              <NavLink to={item.path} className={(e)=>{ return e.isActive?"active-sidebarListItem":""}}>
                <div className="serial" >{item.serial}</div>
                <span className="sidebarListItemText">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        <hr className="sidebar-hr "/>
       </div>
      <div className="sidebar-end">
      <hr className="sidebar-hr-end container-95"/>
      <div className="sidebar-settings-box">
        <img src={settingsIcon} alt="" />
        <p className="settings-text">Settings</p>
      </div>
      </div>
      </div>
    </div>
  );
}
