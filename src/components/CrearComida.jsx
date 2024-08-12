import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createComida } from '../services/comidaService';
import './CrearComida.css';

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [descripcionComida, setDescripcionComida] = useState('');
  const [precioComida, setPrecioComida] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombreComida.trim() || !descripcionComida.trim() || !precioComida || !categoriaId) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const comidaData = {
      nombre_comida: nombreComida,
      descripcion_comida: descripcionComida,
      precio_comida: parseFloat(precioComida),
      id_categoria: parseInt(categoriaId),
    };

    try {
      const createdComida = await createComida(comidaData);
      console.log('Comida creada exitosamente:', createdComida);
      alert('Comida creada exitosamente');
      navigate('/');
    } catch (err) {
      setError('Error al crear la comida.');
      console.error('Error:', err.message);
    }
  };

  return (
    <div className="crear-comida-container">
      <h1 className="crear-comida-title">Crear Nueva Comida</h1>

      <form onSubmit={handleSubmit} className="crear-comida-form">
        <div className="crear-comida-group">
          <label htmlFor="nombreComida" className="crear-comida-label">Nombre de la Comida:</label>
          <input
            type="text"
            id="nombreComida"
            value={nombreComida}
            onChange={(e) => setNombreComida(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el nombre de la comida"
          />
        </div>

        <div className="crear-comida-group">
          <label htmlFor="descripcionComida" className="crear-comida-label">Descripción:</label>
          <textarea
            id="descripcionComida"
            value={descripcionComida}
            onChange={(e) => setDescripcionComida(e.target.value)}
            className="crear-comida-textarea"
            placeholder="Describe la comida"
          />
        </div>

        <div className="crear-comida-group">
          <label htmlFor="precioComida" className="crear-comida-label">Precio:</label>
          <input
            type="number"
            id="precioComida"
            value={precioComida}
            onChange={(e) => setPrecioComida(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el precio"
            step="0.01"
          />
        </div>

        <div className="crear-comida-group">
          <label htmlFor="categoriaId" className="crear-comida-label">Categoría:</label>
          <input
            type="number"
            id="categoriaId"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el ID de la categoría"
          />
        </div>

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">Crear Comida</button>
      </form>
    </div>
  );
};

export default CrearComida;
