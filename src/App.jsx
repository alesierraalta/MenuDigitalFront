import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriaList from "./components/CategoriaList";
import ComidaList from "./components/ComidaList";
import ComidaDetalle from "./components/ComidaDetalle";
import CrearCategoria from "./components/CrearCategoria";
import CrearComida from "./components/CrearComida";
import UploadForm from "./components/UploadForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriaList />} />
        <Route path="/categorias/:id" element={<ComidaList />} />
        <Route path="/categoria/:categoriaId/comida/:comidaId" element={<ComidaDetalle />} />
        <Route path="/upload" element={<UploadForm />} />
        <Route path="/crear-categoria" element={<CrearCategoria />} />
        <Route path="/crear-comida" element={<CrearComida />} />
      </Routes>
    </Router>
  );
}

export default App;
