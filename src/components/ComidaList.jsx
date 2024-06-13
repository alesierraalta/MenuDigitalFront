import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComidasPorCategoria } from '../services/comidaService';
import FoodCard from './FoodCard';
import './ComidaList.css';

function ComidaList() {
  const { id } = useParams();
  const [comidas, setComidas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComidasPorCategoria(id);
        setComidas(result);
      } catch (error) {
        console.error('Error fetching comidas:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="comidas-container">
      <Link to="/" className="back-button">← Volver</Link>
      <div className="header">
        <div className="logo-container">Logo</div>
      </div>
      <h2 className="plato-titulo">Platos</h2>
      <div className="comidas-lista">
        {comidas.map(comida => (
          <Link to={`/categoria/${id}/comida/${comida.id_comida}`} key={comida.id_comida}>
            <FoodCard comida={comida} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ComidaList;
