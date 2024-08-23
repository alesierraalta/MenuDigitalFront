import axios from 'axios';

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

export const uploadImage = async (idCategoria, idComida, file) => {
  if (!file) {
    throw new Error('No se ha seleccionado un archivo para subir.');
  }

  const formData = new FormData();
  formData.append('file', file);

  let endpoint;
  if (idComida) {
    endpoint = `/api/comidas/${idComida}/imagenes`;
  } else if (idCategoria) {
    endpoint = `/api/categorias/${idCategoria}/imagenes`;
  } else {
    throw new Error('Debes seleccionar una categoría o una comida.');
  }

  try {
    const response = await axios.post(`${apiUrl}${endpoint}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error al subir la imagen:', error);
    throw new Error('Error al subir la imagen.');
  }
};
