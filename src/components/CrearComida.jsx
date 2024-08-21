import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createComida } from '../services/comidaService';
import './CrearComida.css';

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [error, setError] = useState('');
  const [isInfoVisible, setIsInfoVisible] = useState(true);
  
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
      precio: parseFloat(precio), // Asegúrate de que el precio sea un número
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

  const handlePriceChange = (event) => {
    const value = event.target.value;

    // Expresión regular para validar números con máximo 2 decimales
    const regex = /^\d+(\.\d{0,2})?$/;

    if (regex.test(value) || value === '') {
      setPrecio(value);
    }
  };

  const incrementPrice = () => {
    let newValue = (parseFloat(precio) || 0) + 0.01;
    newValue = newValue.toFixed(2); // Limitar a dos decimales
    setPrecio(newValue);
  };

  const decrementPrice = () => {
    let newValue = (parseFloat(precio) || 0) - 0.01;
    newValue = Math.max(0, newValue).toFixed(2); // No permitir valores negativos, limitar a dos decimales
    setPrecio(newValue);
  };

  return (
    <div className="crear-comida-page">
      <button className="back-button-comidalist" onClick={() => navigate(-1)}>
        &larr;
      </button>
      <header className="crear-comida-header">
        <h1 className="crear-comida-title">Crear Nueva Comida</h1>
      </header>

      {isInfoVisible && (
        <div className="info">
          <div className="info__icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
              <path fill="#393a37" d="M12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" />
            </svg>
          </div>
          <div className="info__title">
            La categoría fue elegida previamente.
          </div>
          <div className="info__close" onClick={() => setIsInfoVisible(false)}>
            <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37" />
            </svg>
          </div>
        </div>
      )}

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
          <div className="price-input-wrapper">
            <button type="button" className="price-button" onClick={decrementPrice}>-</button>
            <input
              type="number"
              value={precio}
              onChange={handlePriceChange}
              className="crear-comida-input price-input"
              placeholder="Introduce el precio"
              step="0.01"
              inputMode="decimal"
            />
            <button type="button" className="price-button" onClick={incrementPrice}>+</button>
          </div>
        </div>

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">+</button>
      </form>
    </div>
  );
};

export default CrearComida;
