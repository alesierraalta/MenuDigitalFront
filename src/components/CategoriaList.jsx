import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import './CategoriaList.css';  // Importar el archivo CSS

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    console.log('Fetching categorias...');
    getCategorias()
      .then(data => {
        console.log('Fetched categorias:', data);
        setCategorias(data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
    if (isDarkMode) {
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.add('dark-mode');
    }
  };

  return (
    <div className="main-container">
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {isDarkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>
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
