//import React from 'react';
import '../css/Header.css';
import { useNavigate } from 'react-router-dom';

function Render() {
  const navigate = useNavigate();
  const signOut = function () {
    localStorage.removeItem('sessionToken');
    window.location.replace('');
  };

  return (
    <div></div>
  );
}

export default Render;