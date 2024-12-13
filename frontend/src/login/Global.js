import React, { useState } from 'react';
//import '../css/App.css'; 
import '../css/Login.css'; 


import Banner from '../components/globals/Banner';
import Login from './Login';
import Singup from './Singup';
import SingupSucess from './SingInSuccess';
import { useNavigate } from 'react-router-dom';

function Render({children}) {
  const [currentPage, setCurrentPage] = useState("login");
  const handlePageChange = function (page) {
    setCurrentPage(page);
  };
  const navigate = useNavigate()
  const renderPage = function () {
    switch (currentPage) {
      case "login":
        return <Login onLoginSuccess={() => navigate("/")} />;
      case "singup":
        return <Singup onSuccess={() => handlePageChange("singupsucess")} />;
      case "singupsucess":
        return <SingupSucess />
    };

    return (
      <div class="max-height-possible">
        <label>This page is not valid</label>
      </div>
    );
  };

  return (
    <div class="login-holder">
      <Banner />
      <div class="center-content">
        {children}
      </div>
    </div>
  );
}

export default Render;