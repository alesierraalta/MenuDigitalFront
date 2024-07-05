// src/services/categoriaService.js
import axios from 'axios';

// Obtiene la URL del API desde las configuraciones globales
const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/categorias`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};
