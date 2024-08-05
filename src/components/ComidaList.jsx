import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getComidasPorCategoria } from '../services/comidaService';
import FoodCard from './FoodCard';
import './ComidaList.css';
import { FaSearch, FaFilter, FaRedoAlt, FaArrowLeft } from 'react-icons/fa';

function ComidaList() {
  const { id } = useParams();
  const [comidas, setComidas] = useState([]);
  const [filteredComidas, setFilteredComidas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);
  const [animationClass, setAnimationClass] = useState('');
  const [filterMenuVisible, setFilterMenuVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState({ option: '', order: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getComidasPorCategoria(id);
        if (Array.isArray(result)) {
          setComidas(result);
          setFilteredComidas(result);
        } else {
          throw new Error('La respuesta de la API no es un array');
        }
      } catch (error) {
        console.error(`Error fetching comidas for category ${id}:`, error.message);
        console.log('Error details:', error.response?.data || error);
        setError({
          message: 'No se pudo conectar al backend',
          details: error.message,
          status: error.response?.status,
          data: error.response?.data,
          config: error.config,
        });
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
    setSearchVisible(!searchVisible);
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
      <h2 className="plato-titulo">Explore Food</h2>
      {error ? (
        <div>
          <p>{error.message}</p>
          <p>Detalles: {error.details}</p>
          {error.status && <p>Estado HTTP: {error.status}</p>}
          {error.data && <pre>{JSON.stringify(error.data, null, 2)}</pre>}
          <pre>Configuración: {JSON.stringify(error.config, null, 2)}</pre>
        </div>
      ) : (
        <>
          <div className="controls-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search DoorDash"
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
              />
            </div>
            <FaFilter className="filter-icon" onClick={toggleFilterMenu} />
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
                <FaRedoAlt className="reset-icon" onClick={resetFilters} />
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
        </>
      )}
    </div>
  );
}

export default ComidaList;
