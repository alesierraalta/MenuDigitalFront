// src/services/comidaService.js
import axios from 'axios';

// Obtain the full API URL from global configurations or environment variables
const baseApiUrl = window?.configs?.ApiUrl || process.env.REACT_APP_COMIDAS_API_URL || "/";

// Log the base URL to verify
console.log('Using API URL:', baseApiUrl);

// Initialize axios with the base URL
const api = axios.create({
  baseURL: baseApiUrl,
});

export const getComidasPorCategoria = async (idCategoria) => {
  try {
    // Construct the endpoint path
    const endpoint = `/api/comidas/categoria/${idCategoria}`;
    console.log('Requesting URL:', `${baseApiUrl}${endpoint}`);

    // Use the constructed endpoint with the base URL
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error(`Error fetching comidas for category ${idCategoria}:`, error.message);
    console.log('Error details:', error.response?.data || error);
    throw new Error(`No se pudo conectar al backend: ${error.message}`);
  }
};
