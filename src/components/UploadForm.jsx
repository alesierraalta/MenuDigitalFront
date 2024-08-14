import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import { getComidasPorCategoria } from '../services/comidaService';
import './UploadForm.css';

const UploadForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedComida, setSelectedComida] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isCategoriaExpanded, setIsCategoriaExpanded] = useState(false);
  const [isComidaExpanded, setIsComidaExpanded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);

      if (selectedCategoria) {
        const comidasData = await getComidasPorCategoria(selectedCategoria);
        setComidas(comidasData);
      }
    }
    fetchData();
  }, [selectedCategoria]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      setError('Debes seleccionar un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    let apiUrl;
    if (file.type.startsWith('image/')) {
      apiUrl = `/api/categorias/${selectedCategoria}/imagenes`;
    } else if (file.type.startsWith('video/')) {
      apiUrl = `/api/comidas/${selectedComida}/videos`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Archivo subido exitosamente');
        navigate('/');
      } else {
        setError('Error al subir el archivo.');
      }
    } catch (err) {
      setError('Error al subir el archivo.');
    }
  };

  const handleCreateCategoria = () => {
    navigate('/crear-categoria');
  };

  const handleCreateComida = () => {
    navigate('/crear-comida');
  };

  const toggleCategoriaExpand = () => {
    setIsCategoriaExpanded(!isCategoriaExpanded);
  };

  const toggleComidaExpand = () => {
    setIsComidaExpanded(!isComidaExpanded);
  };

  return (
    <div className="upload-form-page">
      <button className="back-button-comidalist" onClick={() => navigate(-1)}>
        &larr;
      </button>

      <header className="upload-form-header">
        <h1 className="upload-form-title">Upload Media</h1>
      </header>

      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label htmlFor="categoria" onClick={toggleCategoriaExpand}>
            Select Category:
          </label>
          <div
            className={`dropdown ${isCategoriaExpanded ? 'expanded' : ''}`}
          >
            <select
              id="categoria"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              onClick={toggleCategoriaExpand}
            >
              <option value="">-- Select Category --</option>
              {categorias.map((categoria) => (
                <option
                  key={categoria.id_categoria}
                  value={categoria.id_categoria}
                >
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleCreateCategoria}
            className="create-button"
          >
            + New Category
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="comida" onClick={toggleComidaExpand}>
            Select Food Item:
          </label>
          <div className={`dropdown ${isComidaExpanded ? 'expanded' : ''}`}>
            <select
              id="comida"
              value={selectedComida}
              onChange={(e) => setSelectedComida(e.target.value)}
              disabled={!selectedCategoria}
              onClick={toggleComidaExpand}
            >
              <option value="">-- Select Food Item --</option>
              {comidas.map((comida) => (
                <option key={comida.id_comida} value={comida.id_comida}>
                  {comida.nombre_comida}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            onClick={handleCreateComida}
            className="create-button"
            disabled={!selectedCategoria}
          >
            + New Food Item
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Image or Video:</label>
          <input
            type="file"
            id="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
          />
        </div>

        {error && <p className="upload-form-error">{error}</p>}

        <button type="submit" className="upload-form-button">
          +
        </button>
      </form>
    </div>
  );
};

export default UploadForm;
