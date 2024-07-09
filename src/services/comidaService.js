import axios from 'axios';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

const api = axios.create({
  baseURL: apiUrl, // Asegúrate de que baseURL termine sin slash
});

export const getComidasPorCategoria = async (id_categoria) => {
  try {
    const response = await api.get(`/${id_categoria}`); // URL sin `/api/comidas/categoria`
    console.log(`Comidas fetched successfully for category ${id_categoria}:`, response.data); // Log para éxito
    return response.data;
  } catch (error) {
    console.error(`Error fetching comidas for category ${id_categoria}:`, error.message); // Log para errores
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
