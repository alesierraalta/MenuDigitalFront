// src/components/CrearCategoria.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategoria } from '../services/categoriaService';
import './CrearCategoria.css';

const CrearCategoria = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombreCategoria.trim()) {
      const errorMessage = 'El nombre de la categoría no puede estar vacío';
      console.error(errorMessage);
      setError(errorMessage);
      return;
    }

    try {
      console.log('Attempting to create category:', nombreCategoria);
      const nuevaCategoria = await createCategoria(nombreCategoria);
      console.log('Nueva categoría creada:', nuevaCategoria);
      alert('Categoría creada exitosamente');
      navigate('/upload');
    } catch (error) {
      console.error('Error occurred while creating category:', error);
      setError(error.message || 'Error al crear la categoría');
    }
  };

  return (
    <div className="crear-categoria-container">
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
