// src/components/CategoriaList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoriaList.css';  // Importar el archivo CSS

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
    axios.get(`${apiUrl}/api/categorias`)
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error);
      });
  }, []);

  return (
    <div className="main-container">
      <div className="logo-container">
        <div className="logo-title">ísola</div>
        <div className="logo-subtitle">-RISTORANTE-</div>
        <div className="logo-caption">by Pastelería Carabobo</div>
      </div>
      <h1 className="categorias-titulo">Categorías</h1>
      {categorias.length > 0 ? (
        <div className="categorias-container">
          {categorias.map((categoria) => (
            <Link key={categoria.id_categoria} to={`/categorias/${categoria.id_categoria}`} className="categoria-item">
              <img src={categoria.imagen_url} alt={categoria.nombre_categoria} className="categoria-imagen" />
              <div className="categoria-nombre-wrapper">
                <div className="categoria-nombre">{categoria.nombre_categoria}</div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>No hay categorías disponibles</p>
      )}
    </div>
  );
}

export default CategoriaList;
