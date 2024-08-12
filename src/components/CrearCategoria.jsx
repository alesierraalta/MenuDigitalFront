// src/components/CrearCategoria.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearCategoria.css'; // Importa los estilos específicos del componente

const CrearCategoria = () => {
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombreCategoria.trim()) {
      setError('El nombre de la categoría no puede estar vacío');
      return;
    }

    try {
      const response = await fetch('/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nombre_categoria: nombreCategoria }),
      });

      if (response.ok) {
        alert('Categoría creada exitosamente');
        navigate('/upload'); // Navega de regreso a la página de subida
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la categoría');
      }
    } catch (error) {
      setError('Error al crear la categoría');
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
