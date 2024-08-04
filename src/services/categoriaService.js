import axios from 'axios';
import { handleApiError } from '../utils/errorHandler';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
console.log('Using API URL:', apiUrl); // Log the base URL

const api = axios.create({
  baseURL: apiUrl,
});

export const getCategorias = async () => {
  const endpoint = 'api/categorias'; 
  const requestUrl = `${apiUrl}${endpoint}`;
  console.log('Making API request to:', requestUrl);

  try {
    const response = await api.get(endpoint);
    console.log('API Response Status:', response.status); // Log the response status
    console.log('API Response Headers:', response.headers); // Log the response headers
    console.log('API Response Data:', response.data); // Log the response data

    if (Array.isArray(response.data)) {
      console.log('Response is an array');
      return response.data;
    } else {
      console.error('API response is not an array');
      console.error('Received HTML:', response.data); // Log the received HTML
      throw new Error('API response is not an array');
    }
  } catch (error) {
    const errorDetails = handleApiError(error);
    throw new Error(errorDetails.message);
  }
};
