import '../css/App.css'; 
import Banner from './globals/Banner';
import Sidebar from './globals/Sidebar';
import React from 'react';

function Render({ children }) {
  return (
    <div className="layout">
      <Banner />
      <Sidebar />

      <div className="main-content">
        {children}
      </div>
    </div>
  );
}

export default Render;