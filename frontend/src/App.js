import React, { useState } from 'react';
import './css/Header.css';
import { setServerSource } from './helpers/HttpProtocol'

import Login from './components/Login';
import Index from './components/Index';
import Singup from './components/Singup';

function App() {
  const [currentPage, setCurrentPage] = useState("login");
  setServerSource("http://localhost:3000/api/");

  const handlePageChange = function (page) {
    setCurrentPage(page);
  }
  const renderPage = function () {
    switch (currentPage) {
      case "login":
        return <Login onLoginSuccess={() => handlePageChange("index")} />;
      case "index":
        return <Index />;
      case "singup":
        return <Singup />;
    };

    return (
      <div class="max-height-possible">
        <label>This page is not valid</label>
      </div>
    );
  }


  return (
    <div>
      <nav>
        <button onClick={() => handlePageChange("singup")}>Sing up</button>
        <button onClick={() => handlePageChange("login")}>Login</button>
        <button onClick={() => handlePageChange("index")}>Index</button>
      </nav>
      {renderPage()}
    </div>
  );

  //<button onClick={() => handlePageChange("other")}>???</button>
}

export default App;