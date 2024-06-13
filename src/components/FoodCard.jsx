import React from 'react';
import './FoodCard.css';

function FoodCard({ comida }) {
  return (
    <div className="food-card">
      <div className="food-card-image"></div>
      <div className="food-card-content">
        <h3 className="food-card-title">{comida.nombre_comida}</h3>
        <p className="food-card-description">{comida.descripcion_comida}</p>
        <div className="food-card-footer">
          <div className="food-card-tags">
            <span className="food-card-tag">Almuerzo</span>
            <span className="food-card-tag">Cena</span>
          </div>
          <div className="food-card-time">
            <span>⏱️ 30 min</span>
          </div>
          <div className="food-card-price">
            <span>${comida.precio_comida}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
