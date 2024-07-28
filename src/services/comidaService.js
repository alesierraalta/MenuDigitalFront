// src/services/comidaService.js
import axios from 'axios';

// Obtain the full API URL with the placeholder from global configurations or environment variables
const apiUrl = window?.configs?.comidasApiUrl || process.env.REACT_APP_COMIDAS_API_URL || "/";

// Log the base URL to verify
console.log('Using API URL:', apiUrl);

const api = axios.create({
  baseURL: apiUrl.split('/api/comidas/categoria/:id_categoria')[0], // Ensure the baseURL is correctly set
});

export const getComidasPorCategoria = async (idCategoria) => {
  try {
    // Replace :id_categoria in the apiUrl with the actual idCategoria
    const url = apiUrl.replace(':id_categoria', idCategoria);
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
