import React from "react";
import { useBreadcrumbs } from "../context/BreadCrumbContext";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import "../styles/BreadCrumb.css";

const Breadcrumbs = () => {
  const { breadcrumbs } = useBreadcrumbs();
  const navigate = useNavigate();

  const handleTabClick = (breadcrumb) => {
    if (breadcrumb.link) {
      navigate(breadcrumb.link);
    }
  };

  return (
    <div className="BreadCrumb-path">
      <span id="BreadCrumb-homeIcon">
        <Link to="/">
          <HomeOutlinedIcon />
        </Link>
      </span>

      <div className="BreadCrumb-start">
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <span
              id={breadcrumb.id}
              className={breadcrumb.isActive ? "active" : ""}
              onClick={() => handleTabClick(breadcrumb)}
            >
              &nbsp;{breadcrumb.label}&nbsp;
            </span>
            {index < breadcrumbs.length - 1 && (
              <span style={{ color: "rgb(167, 164, 164)" }}>/</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumbs;
