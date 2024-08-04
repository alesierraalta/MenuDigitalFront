import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService'; // Corrected import path
import './CategoriaList.css';  // Importar el archivo CSS

function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    console.log('Fetching categorias...');
    getCategorias()
      .then(data => {
        console.log('Fetched categorias:', data);
        setCategorias(data);
      })
      .catch(error => {
        console.error('Error fetching categorias:', error.message);
        console.log('Full error object:', error); // Log the full error object

        // Print error to text
        const errorText = `
          Error fetching categorias: ${error.message}
          Error details: ${error.response?.data || error}
          Error config: ${JSON.stringify(error.config, null, 2)}
          Error code: ${error.code}
          Error request: ${JSON.stringify(error.request, null, 2)}
        `;
        console.log('Error Text:', errorText);

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
