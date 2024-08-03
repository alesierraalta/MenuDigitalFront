import axios from 'axios';

// Obtener la URL de la API desde las configuraciones globales y añadir '/api/categorias'
const apiUrl = window?.configs?.ApiUrl ? window.configs.ApiUrl : "/";
const categoriasApiUrl = `${apiUrl}api/categorias`;

const api = axios.create({
  baseURL: categoriasApiUrl,
});

export const getCategorias = async () => {
  try {
    const response = await api.get('/');
    console.log('API Response:', response.data); // Log the response
    if (Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('API response is not an array');
    }
  } catch (error) {
    console.error('Error fetching categorias:', error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
