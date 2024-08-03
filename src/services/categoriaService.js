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
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
