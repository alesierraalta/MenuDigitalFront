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
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchComidas() {
      if (selectedCategoria) {
        const comidasData = await getComidasPorCategoria(selectedCategoria);
        setComidas(comidasData);
      }
    }
    fetchComidas();
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
          <label htmlFor="categoria">Select Category:</label>
          <div className="dropdown-container">
            <select
              id="categoria"
              value={selectedCategoria}
              onChange={(e) => setSelectedCategoria(e.target.value)}
              className="dropdown"
            >
              <option value="">-- Select Category --</option>
              {categorias.map((categoria) => (
                <option key={categoria.id_categoria} value={categoria.id_categoria}>
                  {categoria.nombre_categoria}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleCreateCategoria} className="create-button">
            + New Category
          </button>
        </div>

        {selectedCategoria && (
          <div className="info">
            <div className="info__icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
                <path fill="#393a37" d="M12 1.5c-5.79844 0-10.5 4.70156-10.5 10.5 0 5.7984 4.70156 10.5 10.5 10.5 5.7984 0 10.5-4.7016 10.5-10.5 0-5.79844-4.7016-10.5-10.5-10.5zm.75 15.5625c0 .1031-.0844.1875-.1875.1875h-1.125c-.1031 0-.1875-.0844-.1875-.1875v-6.375c0-.1031.0844-.1875.1875-.1875h1.125c.1031 0 .1875.0844.1875.1875zm-.75-8.0625c-.2944-.00601-.5747-.12718-.7808-.3375-.206-.21032-.3215-.49305-.3215-.7875s.1155-.57718.3215-.7875c.2061-.21032.4864-.33149.7808-.3375.2944.00601.5747.12718.7808.3375.206.21032.3215.49305.3215.7875s-.1155.57718-.3215.7875c-.2061.21032-.4864.33149-.7808.3375z" />
              </svg>
            </div>
            <div className="info__title">Para seleccionar Una comida Seleccione una Categoria</div>
            <div className="info__close" onClick={() => setSelectedCategoria('')}>
              <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg">
                <path d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z" fill="#393a37" />
              </svg>
            </div>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="comida">Select Food Item:</label>
          <div className="dropdown-container">
            <select
              id="comida"
              value={selectedComida}
              onChange={(e) => setSelectedComida(e.target.value)}
              disabled={!selectedCategoria}
              className="dropdown"
            >
              <option value="">-- Select Food Item --</option>
              {comidas.map((comida) => (
                <option key={comida.id_comida} value={comida.id_comida}>
                  {comida.nombre_comida}
                </option>
              ))}
            </select>
          </div>
          <button type="button" onClick={handleCreateComida} className="create-button" disabled={!selectedCategoria}>
            + New Food Item
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="file">Upload Image or Video:</label>
          <input type="file" id="file" accept="image/*,video/*" onChange={handleFileChange} />
        </div>

        {error && <p className="upload-form-error">{error}</p>}

        <button type="submit" className="upload-form-button">+</button>
      </form>
    </div>
  );
};

export default UploadForm;
