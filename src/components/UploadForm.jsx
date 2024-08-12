// src/components/UploadForm.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCategorias } from '../services/categoriaService';
import { getComidasPorCategoria } from '../services/comidaService'; // Actualiza la importación
import './UploadForm.css'; // Importa los estilos

const UploadForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedComida, setSelectedComida] = useState('');
  const [file, setFile] = useState(null);
  
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    async function fetchData() {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);
    }
    fetchData();
  }, []);

  // Actualizar el efecto cuando cambia la categoría seleccionada
  useEffect(() => {
    async function fetchComidas() {
      if (selectedCategoria) {
        const comidasData = await getComidasPorCategoria(selectedCategoria); // Usa la función correcta
        setComidas(comidasData);
      } else {
        setComidas([]); // Vacía la lista de comidas si no hay categoría seleccionada
      }
    }
    fetchComidas();
  }, [selectedCategoria]);

  useEffect(() => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    const themeSwitch = document.querySelector('.switch-container input');
    if (themeSwitch) {
      themeSwitch.checked = currentTheme === 'dark';
    }
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file) {
      alert('Por favor, selecciona un archivo para subir.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    let apiUrl;
    if (file.type.startsWith('image/')) {
      apiUrl = `/api/categorias/${selectedCategoria}/imagenes`; // Subida de imagen
    } else if (file.type.startsWith('video/')) {
      apiUrl = `/api/comidas/${selectedComida}/videos`; // Subida de video
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      alert('Archivo subido exitosamente');
    } else {
      alert('Error al subir el archivo');
    }
  };

  return (
    <div className="upload-form-container">
      <label className="switch-container">
        <input type="checkbox" onChange={toggleTheme} />
        <span className="slider"></span>
      </label>
      <h1 className="upload-form-title">Subir Imagen o Video</h1>
      
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="upload-form-group">
          <label className="upload-form-label">Seleccionar Categoría:</label>
          <select
            className="upload-form-select"
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
          >
            <option value="">-- Seleccionar Categoría --</option>
            {categorias.map((categoria) => (
              <option key={categoria.id_categoria} value={categoria.id_categoria}>
                {categoria.nombre_categoria}
              </option>
            ))}
          </select>
          <button 
            type="button" 
            className="upload-form-button"
            onClick={() => navigate('/crear-categoria')}
          >
            Crear Nueva Categoría
          </button>
        </div>
        
        <div className="upload-form-group">
          <label className="upload-form-label">Seleccionar Comida:</label>
          <select
            className="upload-form-select"
            value={selectedComida}
            onChange={(e) => setSelectedComida(e.target.value)}
          >
            <option value="">-- Seleccionar Comida --</option>
            {comidas.map((comida) => (
              <option key={comida.id_comida} value={comida.id_comida}>
                {comida.nombre_comida}
              </option>
            ))}
          </select>
          <button 
            type="button" 
            className="upload-form-button"
            onClick={() => navigate('/crear-comida')}
          >
            Crear Nueva Comida
          </button>
        </div>

        <div className="upload-form-group">
          <label className="upload-form-label">Subir Imagen o Video:</label>
          <input 
            type="file" 
            accept="image/*,video/*" 
            onChange={handleFileChange} 
            className="upload-form-input"
          />
        </div>

        <button type="submit" className="upload-form-button">Subir</button>
      </form>
      
      <p className="upload-form-note">
        Nota: Asegúrate de seleccionar la categoría y comida correcta antes de subir un archivo.
      </p>
    </div>
  );
};

export default UploadForm;
