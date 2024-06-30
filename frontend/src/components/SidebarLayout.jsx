// src/components/SidebarLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import "../styles/Sidebar.css";

const SidebarLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <aside>
        <Sidebar />
      </aside>
      {/* <main style={{ marginLeft: '220px', padding: '20px', width: '100%' }}> */}
      <main className='sidebar-outlet-right'>
        <Outlet />
      </main>
    </div>
  );
};

export default SidebarLayout;
