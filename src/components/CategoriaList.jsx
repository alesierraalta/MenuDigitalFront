import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import './CategoriaList.css';

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getCategorias()
      .then(data => {
        setCategorias(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeSwitch = document.querySelector('.switch-container input');
    if (themeSwitch) {
      themeSwitch.checked = currentTheme === 'dark';
    }
  }, []);

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="main-container">
      {/* Botón para redirigir a la página de subida con símbolo de "+" */}
      <Link to="/upload" className="upload-button">
        <span className="plus-symbol">+</span>
      </Link>
      
      <label className="switch-container">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider"></span>
      </label>
      
      <div className="logo-container">
        <div className="logo-title">ísola</div>
        <div className="logo-subtitle">-RISTORANTE-</div>
        <div className="logo-caption">by Pastelería Carabobo</div>
      </div>
      
      <h1 className="categorias-titulo">Explore our Categories</h1>
      
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
