import React from 'react';
import Breadcrumbs from '../components/BreadCrumb';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import flag from '../assets/UK Flag.svg';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import '../styles/BreadCrumbBar.css';

const BreadCrumbBar = () => {
  return (
    <div className="BreadCrumbBar-header">
      <Breadcrumbs />
      <div className="BreadCrumbBar-icons">
        <div className="BreadCrumbBar-lang">
          <ArrowDropDownOutlinedIcon />
          <h4>EN</h4>
          <img className="BreadCrumbBar-flag" src={flag} alt="" />
        </div>
        <NotificationsNoneOutlinedIcon />
      </div>
    </div>
  );
};

export default BreadCrumbBar;
