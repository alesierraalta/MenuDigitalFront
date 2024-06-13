import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoriaList from "./components/CategoriaList";
import ComidaList from "./components/ComidaList";
import ComidaDetalle from "./components/ComidaDetalle";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CategoriaList />} />
        <Route path="/categorias/:id" element={<ComidaList />} />
        <Route path="/categoria/:categoriaId/comida/:comidaId" element={<ComidaDetalle />} />
      </Routes>
    </Router>
  );
}

export default App;
