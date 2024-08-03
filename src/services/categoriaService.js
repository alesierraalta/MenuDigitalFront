import axios from 'axios';

// Obtain the API URL from global configurations
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";
const categoriasApiUrl = `${apiUrl}/categorias`;

console.log('Using API URL:', categoriasApiUrl); // Log the constructed URL

const api = axios.create({
  baseURL: categoriasApiUrl,
});

export const getCategorias = async () => {
  try {
    console.log('Making API request to:', categoriasApiUrl);
    const response = await api.get('');
    console.log('API Response:', response); // Log the full response
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
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
