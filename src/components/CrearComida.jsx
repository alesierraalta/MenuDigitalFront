import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import { createComida } from '../services/comidaService';
import './CrearComida.css';

const CrearComida = () => {
  const [nombreComida, setNombreComida] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategorias() {
      try {
        const categoriasData = await getCategorias();
        setCategorias(categoriasData);
      } catch (error) {
        setError('Error al cargar las categorías');
      }
    }
    fetchCategorias();
  }, []);

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

      <div className="info">
        <div className="info__icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
            <path fill="#393a37" d="M12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" />
          </svg>
        </div>
        <div className="info__title">
          Selecciona la categoría para esta comida.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="crear-comida-form">
        <div className="form-group">
          <label className="crear-comida-label">Categoría:</label>
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="crear-comida-select"
          >
            <option value="">-- Selecciona una Categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
        </div>

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
          <div className="price-input-group">
            <button
              type="button"
              className="price-button"
              onClick={() => setPrecio((prev) => (parseFloat(prev) > 0.1 ? (parseFloat(prev) - 0.1).toFixed(2) : '0.00'))}
            >
              -
            </button>
            <input
              type="number"
              step="0.01"
              min="0"
              value={precio}
              onChange={(e) => setPrecio(parseFloat(e.target.value).toFixed(2))}
              className="crear-comida-input"
              placeholder="Introduce el precio"
              inputMode="decimal" // Para que se active el teclado numérico en móviles
            />
            <button
              type="button"
              className="price-button"
              onClick={() => setPrecio((prev) => (parseFloat(prev) + 0.1).toFixed(2))}
            >
              +
            </button>
          </div>
        </div>

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">+</button>
      </form>
    </div>
  );
};

export default CrearComida;
