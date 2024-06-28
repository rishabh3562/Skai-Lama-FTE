import React from "react";
import logo from "../assets/logo_lama.svg";
import logoText from "../assets/Lama_text.svg";
import notificationIcon from "../assets/notifications.svg";
import settingsIcon from "../assets/settings.svg";

const LogoBar = () => {
    //advisable to use under container-95
    return (
      <>
        <header className="home-header ">
          <div className="logo-box icon-hover-logo">
            <img src={logo} alt="" width={"38px"} height={"38px"} />
            <img src={logoText} alt="" width={"74px"} height={"74px"} />
          </div>
          <div className="logo-box ">
            <img
              src={settingsIcon}
              alt=""
              width={"28px"}
              height={"28px"}
              className="icon-hover"
            />
            <img
              src={notificationIcon}
              alt=""
              width={"28px"}
              height={"28px"}
              className="icon-hover"
            />
          </div>
        </header>
      </>
    );
  };


  export default LogoBar;