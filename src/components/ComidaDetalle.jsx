import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import Player from '@vimeo/player';
import { getComidasPorCategoria } from '../services/comidaService';
import './ComidaDetalle.css';
import { FaPlay, FaPause, FaArrowLeft } from 'react-icons/fa';

function ComidaDetalle() {
    const { categoriaId, comidaId } = useParams();
    const navigate = useNavigate();
    const [comidas, setComidas] = useState([]);
    const [initialSlide, setInitialSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [currentVideoId, setCurrentVideoId] = useState(null);
    const [player, setPlayer] = useState(null);
    const swiperRef = useRef(null);

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
    }, [categoriaId]);

    useEffect(() => {
        if (currentVideoId) {
            const iframe = document.getElementById(currentVideoId);
            if (iframe) {
                const newPlayer = new Player(iframe);
                setPlayer(newPlayer);

                newPlayer.on('play', () => setIsPaused(false));
                newPlayer.on('pause', () => setIsPaused(true));

                newPlayer.getPaused().then(paused => setIsPaused(paused));
            }
        }
    }, [currentVideoId]);

    const handlePlayPauseClick = () => {
        if (player) {
            player.getPaused().then((paused) => {
                if (paused) {
                    player.play();
                } else {
                    player.pause();
                }
            });
        }
    };

    const handleSlideChange = async (swiper) => {
        if (player) {
            await player.pause(); // Pausar el video actual
        }
        const currentComida = comidas[swiper.activeIndex];
        if (currentComida) {
            navigate(`/categoria/${categoriaId}/comida/${currentComida.id_comida}`, { replace: true });
            setCurrentVideoId(`video-${currentComida.id_comida}`);
        }
    };

    const handleSlideTransitionEnd = async (swiper) => {
        const currentComida = comidas[swiper.activeIndex];
        if (currentComida) {
            const iframe = document.getElementById(`video-${currentComida.id_comida}`);
            if (iframe) {
                const newPlayer = new Player(iframe);
                setPlayer(newPlayer);
                await newPlayer.play();
            }
        }
    };

    return (
        <div className="comida-detalle-container">
            <button className="back-button-comidadetalle" onClick={() => navigate(-1)}>
                <FaArrowLeft /> 
            </button>
            <Swiper
                key={initialSlide}
                direction="vertical"
                slidesPerView={1}
                spaceBetween={30}
                initialSlide={initialSlide}
                pagination={{ clickable: true }}
                className="comida-detalle-swiper"
                onSlideChange={handleSlideChange}
                onSlideChangeTransitionEnd={handleSlideTransitionEnd}
                ref={swiperRef}
            >
                {comidas.map((comida) => (
                    <SwiperSlide key={comida.id_comida} className="comida-detalle-slide">
                        <div className="comida-detalle-video-container">
                            {comida.video_url && (
                                <iframe
                                    id={`video-${comida.id_comida}`}
                                    src={`${comida.video_url}?muted=1&loop=1&background=1`} // No autoplay
                                    className="comida-detalle-video"
                                    allow="autoplay; fullscreen"
                                    allowFullScreen
                                ></iframe>
                            )}
                            <div className="comida-detalle-info">
                                <div className="comida-info">
                                    <p className="comida-precio">${comida.precio_comida}</p>
                                    <h2 className="comida-nombre">{comida.nombre_comida}</h2>
                                </div>
                            </div>
                            {currentVideoId === `video-${comida.id_comida}` && (
                                <button
                                    className="play-pause-button"
                                    onClick={handlePlayPauseClick}
                                >
                                    {isPaused ? <FaPlay /> : <FaPause />}
                                </button>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default ComidaDetalle;
