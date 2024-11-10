import React, { useState } from 'react';
import '../css/Header.css';

import Login from './Login';
import Singup from './Singup';
import SingupSucess from './SingInSuccess';

function Render() {
  const [currentPage, setCurrentPage] = useState("login");

  const handlePageChange = function (page) {
    setCurrentPage(page);
  };

  const renderPage = function () {
    switch (currentPage) {
      case "login":
        return <Login onLoginSuccess={() => window.location.replace('')} />;
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
    <div className="dark">
      <nav>
        <button onClick={() => handlePageChange("singup")}>Sing up</button>
        <button onClick={() => handlePageChange("login")}>Login</button>
      </nav>
      {renderPage()}
    </div>
  );
}

export default Render;