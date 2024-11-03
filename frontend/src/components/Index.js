import { useState, useEffect } from "react"
import logo from '../css/logo.svg';
import '../css/App.css';
import * as server from '../helpers/HttpProtocol'

function Index() {
  const [name, setName] = useState("...");

   // Use useEffect to run identifyMe only once on component mount
   useEffect(() => {
    const identifyMe = async () => {
      try {
        const data = await server.get("users/me", {});
        setName(data.user?.name ?? "Guest");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    
    identifyMe();
  }, []); // Empty dependency array ensures this runs only once


  const identifyMe = async (e) => {
    const data = await server.get("users/me", {});
    setName(data.user.name ?? "Anon");
  };
  
  return (
    <div className="App max-height-possible">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a className="App-link" href="https://reactjs.org"
          target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        <p>Hello { name }</p>
      </header>
    </div>
  );
}

export default Index;