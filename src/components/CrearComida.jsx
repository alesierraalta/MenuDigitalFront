// src/components/CrearComida.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import './CrearComida.css'; // Importa los estilos específicos del componente

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [descripcionComida, setDescripcionComida] = useState('');
  const [precioComida, setPrecioComida] = useState('');
  const [idCategoria, setIdCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategorias() {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    }
    fetchCategorias();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombreComida.trim() || !descripcionComida.trim() || !precioComida.trim() || !idCategoria) {
      setError('Todos los campos son obligatorios');
      return;
    }

    try {
      const response = await fetch('/api/comidas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre_comida: nombreComida,
          descripcion_comida: descripcionComida,
          precio_comida: parseFloat(precioComida),
          id_categoria: parseInt(idCategoria, 10),
        }),
      });

      if (response.ok) {
        alert('Comida creada exitosamente');
        navigate('/upload'); // Navega de regreso a la página de subida
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al crear la comida');
      }
    } catch (error) {
      setError('Error al crear la comida');
    }
  };

  return (
    <div className="crear-comida-container">
      <h1 className="crear-comida-title">Crear Nueva Comida</h1>
      
      <form onSubmit={handleSubmit} className="crear-comida-form">
        <div className="crear-comida-group">
          <label className="crear-comida-label">Nombre de la Comida:</label>
          <input
            type="text"
            value={nombreComida}
            onChange={(e) => setNombreComida(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el nombre de la comida"
          />
        </div>

        <div className="crear-comida-group">
          <label className="crear-comida-label">Descripción de la Comida:</label>
          <textarea
            value={descripcionComida}
            onChange={(e) => setDescripcionComida(e.target.value)}
            className="crear-comida-textarea"
            placeholder="Introduce una descripción de la comida"
          />
        </div>

        <div className="crear-comida-group">
          <label className="crear-comida-label">Precio de la Comida:</label>
          <input
            type="number"
            step="0.01"
            value={precioComida}
            onChange={(e) => setPrecioComida(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el precio de la comida"
          />
        </div>

        <div className="crear-comida-group">
          <label className="crear-comida-label">Categoría:</label>
          <select
            value={idCategoria}
            onChange={(e) => setIdCategoria(e.target.value)}
            className="crear-comida-select"
          >
            <option value="">-- Seleccionar Categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">Crear Comida</button>
      </form>
    </div>
  );
};

export default CrearComida;
