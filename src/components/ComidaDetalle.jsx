import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { getComidasPorCategoria } from '../services/comidaService'; 
import './ComidaDetalle.css';

function ComidaDetalle() {
    const { categoriaId, comidaId } = useParams();
    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [initialSlide, setInitialSlide] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const result = await getComidasPorCategoria(categoriaId);
            setComidas(result);
            const foundIndex = result.findIndex(comida => comida.id_comida.toString() === comidaId);
            if (foundIndex >= 0) {
                setInitialSlide(foundIndex);
            }
        }
        fetchData();
    }, [categoriaId, comidaId]);

    return (
        <Swiper
            key={initialSlide} 
            direction="vertical"
            slidesPerView={1}
            spaceBetween={30}
            initialSlide={initialSlide}
            pagination={{ clickable: true }}
            className="comida-detalle-swiper"
            onSlideChange={(swiper) => {
                const currentComida = comidas[swiper.activeIndex];
                if (currentComida) {
                    navigate(`/categoria/${categoriaId}/comida/${currentComida.id_comida}`, { replace: true });
                }
            }}
        >
            {comidas.map((comida) => (
                <SwiperSlide key={comida.id_comida} className="comida-detalle-slide">
                    <div className="comida-detalle-video-simulado">
                        <div className="comida-detalle-info">
                            <div className="comida-info">
                                <p className="comida-precio">${comida.precio_comida}</p>
                                <h2 className="comida-nombre">{comida.nombre_comida}</h2>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ComidaDetalle;
