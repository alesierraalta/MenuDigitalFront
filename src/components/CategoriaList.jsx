import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './CategoriaList.css';  // Importar el archivo CSS

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const apiUrl = window?.configs?.categoriasApiUrl ? window.configs.categoriasApiUrl : "/";
    console.log('Using API URL:', apiUrl); // Log para verificar la URL de la API

    axios.get(apiUrl) // URL sin `/api/categorias`
      .then(response => {
        setCategorias(response.data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error.message);
        console.log('Error details:', error.response?.data || error);
        setError({
          message: 'No se pudo conectar al backend',
          details: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });
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
        <div>
          <p>{error.message}</p>
          <p>Detalles: {error.details}</p>
          {error.status && <p>Estado HTTP: {error.status}</p>}
          {error.data && <pre>{JSON.stringify(error.data, null, 2)}</pre>}
          <pre>Configuración: {JSON.stringify(error.config, null, 2)}</pre>
        </div>
      ) : (
        categorias.length > 0 ? (
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
        )
      )}
    </div>
  );
}

export default CategoriaList;
