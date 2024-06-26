import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComidasPorCategoria } from '../services/comidaService';
import FoodCard from './FoodCard';
import './ComidaList.css';
import { FaSearch, FaFilter, FaRedoAlt, FaArrowLeft } from 'react-icons/fa'; // Importa el ícono de filtro y reiniciar

function ComidaList() {
  const { id } = useParams();
  const [comidas, setComidas] = useState([]);
  const [filteredComidas, setFilteredComidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ option: '', order: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComidasPorCategoria(id);
        setComidas(result);
        setFilteredComidas(result);
      } catch (error) {
        console.error('Error fetching comidas:', error);
      }
    };

    fetchData();
  }, [id]);

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredComidas(comidas.filter(comida => 
      comida.nombre_comida.toLowerCase().includes(term)
    ));
  };

  const toggleSearch = () => {
    if (searchVisible) {
      setAnimationClass('scale-down-horizontal-center');
      setTimeout(() => {
        setSearchVisible(false);
        setAnimationClass('');
      }, 500);
    } else {
      setSearchVisible(true);
      setAnimationClass('scale-up-horizontal-center');
    }
  };

  const toggleFilterMenu = () => {
    setFilterMenuVisible(!filterMenuVisible);
  };

  const handleFilterChange = (option, order) => {
    setActiveFilter({ option, order });
    const sortedComidas = [...filteredComidas].sort((a, b) => {
      if (option === 'name') {
        return order === 'asc' ? a.nombre_comida.localeCompare(b.nombre_comida) : b.nombre_comida.localeCompare(a.nombre_comida);
      } else if (option === 'price') {
        return order === 'asc' ? a.precio_comida - b.precio_comida : b.precio_comida - a.precio_comida;
      }
      return 0;
    });
    setFilteredComidas(sortedComidas);
  };

  const resetFilters = () => {
    setActiveFilter({ option: '', order: '' });
    setFilteredComidas(comidas);
  };

  return (
    <div className="comidas-container">
      <Link to="/" className="back-button">
        <FaArrowLeft />
      </Link>
      <div className="header">
        <div className="logo-container">
          <div className="logo-title">ísola</div>
          <div className="logo-subtitle">-RISTORANTE-</div>
          <div className="logo-caption">by Pastelería Carabobo</div>
        </div>
      </div>
      <h2 className="plato-titulo">Platos</h2>
      <div className="controls-container">
        <FaSearch className="search-icon" onClick={toggleSearch} />
        <FaFilter className="filter-icon" onClick={toggleFilterMenu} />
        {searchVisible && (
          <input
            type="text"
            placeholder="Type here..."
            value={searchTerm}
            onChange={handleSearch}
            className={`input ${animationClass}`}
          />
        )}
        {filterMenuVisible && (
          <div className="filter-menu slide-down">
            <div className="filter-item">
              <span className="filter-title">Nombre</span>
              <button
                className={activeFilter.option === 'name' && activeFilter.order === 'asc' ? 'active' : ''}
                onClick={() => handleFilterChange('name', 'asc')}
              >
                Asc
              </button>
              <button
                className={activeFilter.option === 'name' && activeFilter.order === 'desc' ? 'active' : ''}
                onClick={() => handleFilterChange('name', 'desc')}
              >
                Desc
              </button>
            </div>
            <div className="filter-item">
              <span className="filter-title">Precio</span>
              <button
                className={activeFilter.option === 'price' && activeFilter.order === 'asc' ? 'active' : ''}
                onClick={() => handleFilterChange('price', 'asc')}
              >
                Asc
              </button>
              <button
                className={activeFilter.option === 'price' && activeFilter.order === 'desc' ? 'active' : ''}
                onClick={() => handleFilterChange('price', 'desc')}
              >
                Desc
              </button>
            </div>
            <FaRedoAlt className="reset-icon" onClick={resetFilters} /> {/* Añadido botón de reiniciar */}
          </div>
        )}
      </div>
      <div className={`comidas-lista ${filterMenuVisible ? 'with-filter-menu' : ''}`}>
        {filteredComidas.map(comida => (
          <Link to={`/categoria/${id}/comida/${comida.id_comida}`} key={comida.id_comida}>
            <FoodCard comida={comida} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ComidaList;
