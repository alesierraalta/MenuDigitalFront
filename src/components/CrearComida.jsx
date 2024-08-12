import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CrearComida.css';

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Aquí iría la lógica para crear la comida.
  };

  return (
    <div className="crear-comida-container">
      <button className="back-button-comidalist" onClick={() => navigate(-1)}>
        &#8592;
      </button>
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
        {error && <p className="crear-comida-error">{error}</p>}
        <button type="submit" className="crear-comida-button">Crear Comida</button>
      </form>
    </div>
  );
};

export default CrearComida;
