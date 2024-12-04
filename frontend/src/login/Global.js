import React, { useState } from 'react';
import '../css/Header.css';
import { setServerSource } from '../helpers/HttpProtocol'

import Login from './Login';
import Singup from './Singup';
import SingupSucess from './SingInSuccess';
import { useNavigate } from 'react-router-dom';

function Render() {
  const [currentPage, setCurrentPage] = useState("login");
  setServerSource("http://localhost:3000/api/");

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
    <div>
      <nav>
        <button onClick={() => handlePageChange("singup")}>Sing up</button>
        <button onClick={() => handlePageChange("login")}>Login</button>
      </nav>
      {renderPage()}
    </div>
  );
}

export default Render;