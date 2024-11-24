import { useState, useEffect } from "react";
import logo from '../css/logo.svg'; // Asegúrate de usar el logo correcto
import '../css/App.css';
import * as server from '../helpers/HttpProtocol';
import Header from './Header';

function Render() {
  const [name, setName] = useState("...");

  useEffect(() => { identifyMe(setName); }, []);

  return (
    <Header>
      <div className="App max-height-possible">
        <header className="App-header">
          <img src={"/logo192.png"} className="App-logo-centered" alt="logo" />
          <h1>¡Bienvenido a Mercado Libros!</h1>
          <p>El mercado para amantes de los libros.</p>
        </header>
      </div>
    </Header>
  );
}

async function identifyMe(setName) {
  try {
    const data = await server.get("users/me", {});
    setName(data.user?.name ?? "Invitado");
  } catch (error) {
    console.error("Error fetching user:", error);
  }
}

export default Render;
