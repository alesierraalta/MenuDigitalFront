// src/services/comidaService.js
import axios from 'axios';

const apiUrl = window?.configs?.comidasApiUrl ? window.configs.comidasApiUrl : "/";

const api = axios.create({
  baseURL: apiUrl, // Asegúrate de que baseURL termine sin slash
});

export const getComidasPorCategoria = async (id_categoria) => {
  try {
    const response = await api.get(`/${id_categoria}`); // Usar template literal para agregar el id_categoria correctamente
    console.log(`Comidas fetched successfully for category ${id_categoria}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comidas for category ${id_categoria}:`, error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
