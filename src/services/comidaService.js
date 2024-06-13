import axios from 'axios';

export const getComidasPorCategoria = async (id_categoria) => {
  try {
    const response = await axios.get(`http://localhost:3001/api/comidas/categoria/${id_categoria}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching comidas:', error);
    throw error;
  }
};
