import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearCategoria.css';

const CrearCategoria = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí iría la lógica para crear la categoría.
  };

  return (
    <div className="crear-categoria-container">
      <button className="back-button-comidalist" onClick={() => navigate(-1)}>
        &#8592; Back
      </button>
      <h1 className="crear-categoria-title">Crear Nueva Categoría</h1>
      <form onSubmit={handleSubmit} className="crear-categoria-form">
        <div className="crear-categoria-group">
          <label className="crear-categoria-label">Nombre de la Categoría:</label>
          <input
            type="text"
            value={nombreCategoria}
            onChange={(e) => setNombreCategoria(e.target.value)}
            className="crear-categoria-input"
            placeholder="Introduce el nombre de la categoría"
          />
        </div>
        {error && <p className="crear-categoria-error">{error}</p>}
        <button type="submit" className="crear-categoria-button">Crear Categoría</button>
      </form>
    </div>
  );
};

export default CrearCategoria;
