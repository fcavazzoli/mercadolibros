import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { setServerSource } from './helpers/HttpProtocol';

import LoginGlobal from './login/Global';
import PageGlobal from './components/Index';
import AddBook from './components/libros/AddBook';
import LibroMenu from './components/libros/Menu';
import EditBook from './components/libros/EditBook';
import LibroList from './components/libros/LibroList';
import TruequeList from './components/trueques/TruequeList';
import OtherBooksList from './components/libros/OtherBooksList';

function App() {
  // Configurar la fuente del servidor
  setServerSource("http://localhost:3000/api/");

  // Verificar si el usuario está autenticado
  const isAuthenticated = Boolean(localStorage.getItem('sessionToken'));

  return (
    <Router>
      <div>
        <Routes>
          {/* Ruta principal (Home) */}
          <Route path="/" element={isAuthenticated ? <PageGlobal /> : <LoginGlobal />} />

          {/* Rutas exclusivas para funcionalidades adicionales */}
          <Route
            path="/add-book"
            element={isAuthenticated ? <AddBook /> : <Navigate to="/" />}
          />
          <Route
            path="/menu"
            element={isAuthenticated ? <LibroMenu /> : <Navigate to="/" />}
          />
          <Route
            path="/edit-book/:bookId"
            element={isAuthenticated ? <EditBook /> : <Navigate to="/" />}
          />
          <Route
            path="/books"
            element={isAuthenticated ? <LibroList /> : <Navigate to="/" />}
          />
          <Route
            path="/exchanges"
            element={isAuthenticated ? <TruequeList /> : <Navigate to="/" />}
          />
          <Route path="/libros-disponibles" element={<OtherBooksList />} />

          {/* Redirigir cualquier ruta desconocida a la ruta de inicio */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
