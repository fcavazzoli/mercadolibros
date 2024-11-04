import React, { useState } from 'react';
import '../css/Header.css';

import Index from './Index';

function Render() {
  const [currentPage, setCurrentPage] = useState("index");

  const handlePageChange = function (page) {
    setCurrentPage(page);
  };

  const signOut = function () {
    localStorage.removeItem('sessionToken');
    window.location.replace('');
  };

  const renderPage = function () {
    switch (currentPage) {
      case "index":
        return <Index />;
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
        <button onClick={() => handlePageChange("index")}>Index</button>
        <button onClick={() => signOut()}>SignOut</button>
      </nav>
      {renderPage()}
    </div>
  );

  //<button onClick={() => handlePageChange("other")}>???</button>
}

export default Render;