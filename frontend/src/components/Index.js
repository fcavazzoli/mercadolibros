import { useState, useEffect } from "react"
import logo from '../css/logo.svg';
import '../css/App.css';
import * as server from '../helpers/HttpProtocol'

function Render() {
  const [name, setName] = useState("...");

   useEffect(() => { identifyMe(setName); }, []);
  
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

        <button >Libro nuevo</button>
      </header>
    </div>
  );
}

async function identifyMe(setName) {
  try {
    const data = await server.get("users/me", {});
    
    setName(data.user?.name ?? "Guest");

  } catch (error) {
    console.error("Error fetching user:", error);
  }
};

export default Render;