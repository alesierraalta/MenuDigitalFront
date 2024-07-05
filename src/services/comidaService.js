// src/services/comidaService.js
import axios from 'axios';

// Obtiene la URL del API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

export const getComidasPorCategoria = async (id_categoria) => {
  try {
    const response = await axios.get(`${apiUrl}/api/comidas/categoria/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comidas:', error);
    throw error;
  }
};