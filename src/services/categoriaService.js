import axios from 'axios';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

// Asegurarse de que apiUrl termine con una barra
const formattedApiUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;

console.log('Using API URL:', formattedApiUrl); // Log the base URL

const api = axios.create({
  baseURL: formattedApiUrl,
});

export const getCategorias = async () => {
  const endpoint = 'categorias'; // Asegurarse de que el endpoint no comience con una barra
  const requestUrl = `${formattedApiUrl}${endpoint}`;
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
      throw new Error('API response is not an array');
    }
  } catch (error) {
    console.error('Error fetching categorias:', error.message);
    console.log('Error details:', error.response?.data || error);
    console.log('Error config:', error.config); // Log the config used for the request
    console.log('Error code:', error.code); // Log the error code
    console.log('Error request:', error.request); // Log the request details if available
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
