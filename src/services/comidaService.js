import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
console.log('Using API URL:', apiUrl);

const api = axios.create({
  baseURL: apiUrl,
});

// Obtener comidas por categoría
export const getComidasPorCategoria = async (idCategoria) => {
  const endpoint = `/api/comidas/categoria/${idCategoria}`;
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
      console.error('API response is not an array');
      console.error('Received HTML:', response.data);
      throw new Error('API response is not an array');
    }
  } catch (error) {
    const errorDetails = handleApiError(error);
    throw new Error(errorDetails.message);
  }
};

// Crear una nueva comida
export const createComida = async (comidaData) => {
  const endpoint = '/api/comidas';
  const requestUrl = `${apiUrl}${endpoint}`;
  console.log('Making API request to:', requestUrl);

  try {
    const response = await api.post(endpoint, comidaData);
    console.log('API Response Status:', response.status);
    console.log('API Response Headers:', response.headers);
    console.log('API Response Data:', response.data);

    if (response.status === 201) {
      console.log('Comida created successfully');
      return response.data;
    } else {
      console.error('Failed to create comida');
      throw new Error('Failed to create comida');
    }
  } catch (error) {
    const errorDetails = handleApiError(error);
    console.error('Error creating comida:', errorDetails);
    throw new Error(errorDetails.message);
  }
};
