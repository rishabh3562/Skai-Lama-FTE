import React from "react";
import "../styles/Banner.css";
const Banner = ({ Text, BtnText }) => {
  return (
    <div className="banner-wrapper">
      <p className="banner-text">{Text}</p>
      <button className="banner-btn-text">{BtnText}</button>
    </div>
  );
};

export default Banner;
