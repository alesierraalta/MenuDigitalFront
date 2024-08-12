import React, { useState, useEffect } from 'react';
import { getCategorias } from '../services/categoriaService';
import { getComidasPorCategoria } from '../services/comidaService';

const UploadForm = () => {
  const [categorias, setCategorias] = useState([]);
  const [comidas, setComidas] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedComida, setSelectedComida] = useState('');
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const categoriasData = await getCategorias();
      setCategorias(categoriasData);

      const comidasData = await getComidasPorCategoria();
      setComidas(comidasData);
    }
    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <label>
        Seleccionar Categoría:
        <select
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
      </label>
      
      <label>
        Seleccionar Comida:
        <select
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
      </label>

      <label>
        Subir Imagen o Video:
        <input 
          type="file" 
          accept="image/*,video/*" 
          onChange={handleFileChange} 
        />
      </label>

      <button type="submit">Subir</button>
    </form>
  );
};

export default UploadForm;
