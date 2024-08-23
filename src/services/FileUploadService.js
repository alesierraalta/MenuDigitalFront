import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
console.log('Using API URL:', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
});

// Servicio para subir archivos de comida (imágenes o videos)
export const uploadComidaFile = async (file, idCategoria, fileType = 'image') => {
  const endpoint = fileType === 'video' 
    ? `/api/comidas/${idCategoria}/videos` 
    : `/api/comidas/${idCategoria}/imagenes`;

  const formData = new FormData();
  formData.append('file', file);

  console.log('Uploading file to:', `${apiUrl}${endpoint}`);

  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('File uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorDetails = handleApiError(error);
    console.error('Error uploading file:', errorDetails.message);
    throw new Error(errorDetails.message);
  }
};

// Servicio para subir archivos de categorías (solo imágenes)
export const uploadCategoriaFile = async (file) => {
  const endpoint = `/api/categorias/imagenes`;

  const formData = new FormData();
  formData.append('file', file);

  console.log('Uploading category image to:', `${apiUrl}${endpoint}`);

  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Category image uploaded successfully:', response.data);
    return response.data;
  } catch (error) {
    const errorDetails = handleApiError(error);
    console.error('Error uploading category image:', errorDetails.message);
    throw new Error(errorDetails.message);
  }
};
