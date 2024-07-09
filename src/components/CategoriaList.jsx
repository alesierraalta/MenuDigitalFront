// src/components/CategoriaList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoriaList.css';  // Importar el archivo CSS

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
    axios.get(`${apiUrl}/api/categorias`)
      .then(response => {
        console.log('Categorias fetched successfully:', response.data); // Log para éxito
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error.message); // Log para errores
        console.log('Error details:', error.response?.data || error);
        setError(`Error fetching categorias: ${error.message}`);
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
      {error ? (
        <p>{error}</p> // Mostrar mensaje de error
      ) : categorias.length > 0 ? (
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
