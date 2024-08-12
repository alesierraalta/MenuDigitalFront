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
          <label className="crear-comida-label">Descripción:</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="crear-comida-textarea"
            placeholder="Introduce una descripción"
          />
        </div>

        <div className="crear-comida-group">
          <label className="crear-comida-label">Precio:</label>
          <input
            type="text"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="crear-comida-input"
            placeholder="Introduce el precio"
          />
        </div>

        <div className="crear-comida-group">
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

        {error && <p className="crear-comida-error">{error}</p>}

        <button type="submit" className="crear-comida-button">Crear Comida</button>
      </form>
    </div>
  );
};

export default CrearComida;
