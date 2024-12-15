import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import Login from './login/Login';
import AddBook from './components/libros/AddBook';
import LibroMenu from './components/libros/Menu';
import EditBook from './components/libros/EditBook';
import LibroList from './components/libros/LibroList';
import TruequeList from './components/trueques/TruequeList';
import OtherBooksList from './components/trueques/OtherBooksList';
import OfferBook from './components/trueques/OfferBook';
import PerfilMenu from './components/perfil/PerfilPrincipal';
import EditarPerfil from './components/perfil/EditarPerfil';
import Landing from './components/Index';
import Singup from './login/Singup';
import SingupSucess from './login/SingInSuccess';

function App() {
  // Verificar si el usuario está autenticado
  const isAuthenticated = Boolean(localStorage.getItem('sessionToken'));

  return (
    <Router>
      <div>
        <Routes>
          {/* Ruta principal (Home) */}
          <Route path="/" element={isAuthenticated ? <Landing /> : <Login />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Singup />} />
          <Route path="/singupsuccess" element= {<SingupSucess />} />


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

          <Route
            path="/perfil"
            element={isAuthenticated ? <PerfilMenu /> : <Navigate to="/" />}
          /> 

          <Route
            path="/EditarPerfil"
            element={isAuthenticated ? <EditarPerfil /> : <Navigate to="/" />}
          /> 

          <Route
            path="/ask-trade/:bookId"
            element={isAuthenticated ? <OfferBook /> : <Navigate to="/" />}
          />

          {/* Redirigir cualquier ruta desconocida a la ruta de inicio */}
          <Route path="*" element={<Navigate to="/" />} />
             
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
