import axios from 'axios';

const apiUrl = "/choreo-apis/isolamenunest/backnest/v1";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL : apiUrl,
});

export const getCategorias = async () => {
  try {
    const response = await api.get('api/categorias');
    console.log('Categorias fetched successfully:', response.data); // Log para éxito
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error.message); // Log para errores
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
