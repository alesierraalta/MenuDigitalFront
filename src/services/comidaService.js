// src/services/comidaService.js
import axios from 'axios';

// Obtain the base API URL from global configurations or environment variables
const apiUrl = window?.configs?.comidasApiUrl || process.env.REACT_APP_COMIDAS_API_URL || "/";

const api = axios.create({
  baseURL: apiUrl,
});

export const getComidasPorCategoria = async (idCategoria) => {
  try {
    // Construct the correct URL with category ID
    const url = `/${idCategoria}`;
    console.log('Requesting URL:', url);

    // Use the constructed URL directly
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comidas for category ${idCategoria}:`, error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
