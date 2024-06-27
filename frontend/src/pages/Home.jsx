import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_lama.svg";
import logoText from "../assets/Lama_text.svg";
import notificationIcon from "../assets/notifications.svg";
import settingsIcon from '../assets/settings.svg'
import addIcon from "../assets/plus.svg"
import heroImage from '../assets/Home.svg';
import "../styles/home.css";
const Home = () => {
  return (<>
  {/* logo and notification */}
  <div className="container-95 home" >

  
<header className="home-header "> 
  <div className="logo-box icon-hover-logo">
    <img src={logo} alt="" width={"38px"} height={"38px"} />
    <img src={logoText} alt="" width={"74px"} height={"74px"} />
  </div>
  <div className="logo-box ">
  <img src={settingsIcon} alt="" width={"28px"} height={"28px"} className="icon-hover"/>
  <img src={notificationIcon} alt=""  width={"28px"} height={"28px"} className="icon-hover"/>
  </div>
</header>
  {/* home page content */}
  <section className="home-section container-85">
    <h2 className="home-heading">Create a New Project </h2>
    <img src={heroImage} alt="" className="heroImage"   />
    <p className="home-text container-80"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.</p>
    {/* create new butto */}
    <button className=" btn-home">
      <img src={addIcon} alt=""  width={"28px"} height={"28px"} />
      <p className="btn-text-home">
        <Link to="/project">Create New Project</Link>
        </p>
    </button>
  </section>
  </div>
  
  </>);
};

export default Home;
