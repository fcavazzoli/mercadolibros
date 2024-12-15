import React, { useState } from 'react';
import '../css/Login.css'; 

import Banner from '../components/globals/Banner';
function Render({children}) {
  
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