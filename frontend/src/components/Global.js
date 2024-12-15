import '../css/App.css'; 
import Index from './Index';
import LibrosMenu from './libros/Menu';
import React, { useState, useEffect } from 'react';

function Render() {
  const [currentPage, setCurrentPage] = useState("index");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sessionToken');
    setIsAuthenticated(!!token);
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
  };

  const signOut = () => {
    localStorage.removeItem('sessionToken');
    window.location.replace('');
  };

  const renderPage = () => {
    switch (currentPage) {
      case "index":
        return <Index />;
      case "libros":
        return <LibrosMenu />;
      default:
        return (
          <div className="max-height-possible">
            <label>This page is not valid</label>
          </div>
        );
    }
  };

  if (!isAuthenticated) {
    window.location.replace('/login');
    return null;
  }

  return (
    <div className="global-container">
      <div className={`sidebar ${isMenuOpen ? 'open' : ''}`}>
        <button className="hamburger-button" onClick={() => setMenuOpen(!isMenuOpen)}>
          ☰
        </button>
        <div className="menu">
          <button onClick={() => handlePageChange("index")}>Home</button>
          <button onClick={() => handlePageChange("libros")}>Libros</button>
          <button onClick={() => signOut()}>SignOut</button>
        </div>
      </div>
      <div className="content">
        {renderPage()}
      </div>
    </div>
  );
}

export default Render;