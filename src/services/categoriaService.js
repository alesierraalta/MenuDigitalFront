// servicios/comidaService.js
import axios from 'axios';

// Obtener la URL de la API desde las configuraciones globales
const apiUrl = window?.configs?.comidasApiUrl ? window.configs.comidasApiUrl : "/";

const api = axios.create({
  baseURL: apiUrl,
});

export const getComidasPorCategoria = async (idCategoria) => {
  try {
    const response = await api.get(`${idCategoria}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comidas for category ${idCategoria}:`, error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
