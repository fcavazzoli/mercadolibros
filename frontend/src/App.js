import React from 'react';
import { setServerSource } from './helpers/HttpProtocol'

import LoginGlobal from './login/Global';
import PageGlobal from './components/Global';

function App() {
  setServerSource("http://localhost:3000/api/");

  const renderPage = function () {
    const token = localStorage.getItem('sessionToken');
    if (token) 
      return <PageGlobal />;
    return <LoginGlobal />;
  }


  return (
    <div>
      {renderPage()}
    </div>
  );
}

export default App;