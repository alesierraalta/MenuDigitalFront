import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
console.log('Using API URL:', apiUrl); // Log the base URL

const api = axios.create({
  baseURL: apiUrl,
});

// Método para obtener todas las categorías
export const getCategorias = async () => {
  const endpoint = 'api/categorias'; 
  const requestUrl = `${apiUrl}${endpoint}`;
  console.log('Making API request to:', requestUrl);

  try {
    const response = await api.get(endpoint);
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    console.log('API Response Data:', response.data);

    if (Array.isArray(response.data)) {
      console.log('Response is an array');
      return response.data;
    } else {
      console.error('API response is not an array:', response.data);
      throw new Error('API response is not an array');
    }
  } catch (error) {
    const errorDetails = handleApiError(error);
    console.error('Error fetching categories:', errorDetails);
    throw new Error(errorDetails.message);
  }
};

// Método para crear una nueva categoría
export const createCategoria = async (nombreCategoria) => {
  const endpoint = 'api/categorias'; 
  const requestUrl = `${apiUrl}${endpoint}`;
  console.log('Sending API request to:', requestUrl);

  try {
    const response = await api.post(endpoint, { nombre_categoria: nombreCategoria });
    console.log('API Response Status:', response.status);
    console.log('API Response Data:', response.data);
    return response.data;
  } catch (error) {
    const errorDetails = handleApiError(error);
    console.error('Error creating category:', errorDetails);
    throw new Error(errorDetails.message);
  }
};

export default {
  getCategorias,
  createCategoria,
};
