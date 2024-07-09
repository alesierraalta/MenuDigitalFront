import axios from 'axios';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

const api = axios.create({
  baseURL: apiUrl, // Asegúrate de que baseURL termine sin slash
});

export const getCategorias = async () => {
  try {
    const response = await api.get(''); // Ruta vacía
    console.log('Categorias fetched successfully:', response.data); // Log para éxito
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error.message); // Log para errores
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
