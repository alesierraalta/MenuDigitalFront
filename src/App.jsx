// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriaList from "./components/CategoriaList";
import ComidaList from "./components/ComidaList";
import ComidaDetalle from "./components/ComidaDetalle";
import UploadForm from "./components/UploadForm";
import CrearCategoria from "./components/CrearCategoria"; // Importa el componente para crear categoría
import CrearComida from "./components/CrearComida"; // Importa el componente para crear comida

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriaList />} />
        <Route path="/categorias/:id" element={<ComidaList />} />
        <Route path="/categoria/:categoriaId/comida/:comidaId" element={<ComidaDetalle />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/crear-categoria" element={<CrearCategoria />} /> {/* Ruta para crear categoría */}
        <Route path="/crear-comida" element={<CrearComida />} /> {/* Ruta para crear comida */}
      </Routes>
    </Router>
  );
}

export default App;
