// src/services/comidaService.js
import axios from 'axios';

// Using environment variables for configuration
const apiUrl = window?.configs?.comidasApiUrl || process.env.REACT_APP_COMIDAS_API_URL || "/";

// Create an Axios instance with the base URL
const api = axios.create({
  baseURL: apiUrl,
});

/**
 * Fetches comidas by category ID
 * @param {string} id_categoria - The category ID for which to fetch comidas
 * @returns {Promise<Object>} - A promise that resolves to the comidas data
 * @throws Will throw an error if the request fails
 */
export const getComidasPorCategoria = async (id_categoria) => {
  try {
    const apiUrl = `/api/comidas/categoria/${id_categoria}`;
    console.log(`Requesting: ${apiUrl}`);
    const response = await api.get(apiUrl);
    console.log(`Comidas fetched successfully for category ${id_categoria}:`, response.data);
    return response.data;
  } catch (error) {
    // Extract error details
    const status = error.response?.status;
    const data = error.response?.data;
    console.error(`Error fetching comidas for category ${id_categoria}:`, error.message);
    console.log('Error status:', status);
    console.log('Error details:', data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
