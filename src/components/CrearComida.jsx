import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createComida } from '../services/comidaService';
import './CrearComida.css';

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();
  const location = useLocation();
  const selectedCategoria = location.state?.selectedCategoria || '';

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!nombreComida || !descripcion || !precio || !selectedCategoria) {
      setError('Todos los campos son obligatorios');
      return;
    }

    const nuevaComida = {
      nombre_comida: nombreComida,
      descripcion,
      precio,
      id_categoria: selectedCategoria,
    };

    try {
      await createComida(nuevaComida);
      alert('Comida creada exitosamente');
      navigate('/upload');
    } catch (error) {
      setError('Error al crear la comida');
    }
  };

  return (
    <div className="crear-comida-page">
      <button className="back-button-comidalist" onClick={() => navigate(-1)}>
        &larr;
      </button>
      <header className="crear-comida-header">
        <h1 className="crear-comida-title">Crear Nueva Comida</h1>
      </header>

      <form onSubmit={handleSubmit} className="crear-comida-form">
        <div className="form-group">
          <label className="crear-comida-label">Nombre de la Comida:</label>
          <input
            type="text"
            value={nombreComida}
            onChange={(e) => setNombreComida(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el nombre de la comida"
          />
        </div>

        <div className="form-group">
          <label className="crear-comida-label">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="crear-comida-textarea"
            placeholder="Introduce una descripción"
          />
        </div>

        <div className="form-group">
          <label className="crear-comida-label">Precio:</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el precio"
          />
        </div>

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">+</button>
      </form>
    </div>
  );
};

export default CrearComida;
