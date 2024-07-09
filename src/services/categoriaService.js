// src/services/categoriaService.js
import axios from 'axios';

const apiUrl = window?.configs?.apiUrl ? window.configs.apiUrl : "/";

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${apiUrl}/api/categorias`);
    console.log('Categorias fetched successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error.message);
    console.log('Error details:', error.response?.data || error);
    throw error;
  }
};
