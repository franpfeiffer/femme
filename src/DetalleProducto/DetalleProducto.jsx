/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { Color } from 'three';
import '../detalle-produ.css'
export const DetalleProducto = () => {
    const [added, setAdded] = useState(false);
    const [producto, setProductos] = useState([]);
    const [imagene, setImagene] = useState([]);
    const [prod_colores_talle, setProd_colores_talle] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[1];
    const { agregarCompra, eliminarCompra, aumentarCantidad } = useContext(CarritoContext);
    const [amount, setAmount] = useState(1);
    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [talleSeleccionado, setTalleSeleccionado] = useState(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(imagene.length > 0 ? imagene[0].url : null);
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setProd_colores_talle(data.prod_colores_talle);
                setProductos(data);
                setImagene(data.imagene);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };
        fetchProductos();
    }, [id]);

    const handleAgregar = (compra) => {
        agregarCompra(compra);
        setAdded(true);
    }

    const handleQuitar = (id) => {
        eliminarCompra(id)
        setAdded(false);
    }
    const handleThumbnailClick = (url) => {
        setImagenSeleccionada(url);
    };
    const handleColorSeleccionado = (colorId) => {
        setColorSeleccionado(colorId);
    };
    
    // En el evento de selección de talle
    const handleTalleSeleccionado = (talleId) => {
        setTalleSeleccionado(talleId);
    };



    return (
        <div className="app">
            <div className="details">
                <div className="big-img">
                    {imagenSeleccionada ? (
                        <img src={`http://localhost:3000/${imagenSeleccionada}`} alt={producto.nombre} />
                    ) : (
                        imagene.length > 0 ? (
                            <img src={`http://localhost:3000/${imagene[0].url}`} alt={producto.nombre} />
                        ) : (
                            <p>No image available</p>
                        )
                    )}
                </div>

                <div className="info">
                    <div className='box'>
                        <div className='row'>
                            <h2>{producto.nombre}</h2>
                            <span>${producto.precio}</span>
                        </div>
                    </div>
                    <div className="colors">
                        {prod_colores_talle.map(color => (
                            <button key={color.id} style={{ background: color.colore.nombre }}
                            onClick={() => {
                                handleColorSeleccionado(color.colore.id);
                                if (talleSeleccionado) {
                                    setMostrarAdvertencia(false);
                                } else {
                                    setMostrarAdvertencia(true);
                                }
                            }}></button>
                        ))}
                    </div>
                    <div className='talles'>
                        {prod_colores_talle.map(talle => (
                            <button key={talle.id}
                            onClick={() => {
                                handleTalleSeleccionado(talle.talle.id);
                                if (colorSeleccionado) {
                                    setMostrarAdvertencia(false);
                                } else {
                                    setMostrarAdvertencia(true);
                                }
                            }}
                            >{talle.talle.nombre}</button>
                        ))}
                    </div>



                    <div className='thumb'>
                        {imagene.map(img => (
                            <img src={`http://localhost:3000/${img.url}`} alt="" key={img.id}
                                className={img.url === imagenSeleccionada ? 'active' : ''}
                                onClick={() => handleThumbnailClick(img.url)}

                            />
                        ))}
                    </div>
                    <p>{producto.descripcion}</p>
                    {mostrarAdvertencia && <p>Por favor, seleccione un color y un talle antes de agregar al carrito.</p>}
                    {prod_colores_talle.length > 0 ? (
                        added ? (
                            <button
                                type="button"
                                className="boton-quitar cart"
                                onClick={() => {
                                    if (colorSeleccionado && talleSeleccionado) {
                                        setMostrarAdvertencia(false);
                                        handleAgregar(producto);
                                    } else {
                                        setMostrarAdvertencia(true);
                                    }
                                }}
                                disabled={mostrarAdvertencia}
                            >
                                Quitar del Carrito
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="boton-agregar cart"
                                onClick={() => handleAgregar(producto)}
                                disabled={colorSeleccionado === null || talleSeleccionado === null}
                            >
                                Agregar Carrito
                            </button>
                        )
                    ) : (
                        <button type="button" className="boton-agregar cart" disabled>
                            Sin Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
