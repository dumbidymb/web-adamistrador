import React from 'react';
import ReactDOM from 'react-dom/client'
import Inicio from './pages/Inicio'
import Login from './pages/Login';
import DarDeAlta from './pages/DarDeAlta';
import Editar from './pages/Editar';
import { BrowserRouter, Routes, Route } from "react-router-dom";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <BrowserRouter>
  <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Daralta" element={<DarDeAlta/>} />
        <Route path="/Editar" element={<Editar/>} />
      </Routes>
    </BrowserRouter>

  </React.StrictMode>,
)
