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

    const [mostrarAdvertenciaStock, setMostrarAdvertenciaStock] = useState(false);


    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                const filteredProdColoresTalle = data.prod_colores_talle.filter(
                    (item) => item.adminUserId === 3
                );
                setProd_colores_talle(filteredProdColoresTalle);
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
        console.log('Color seleccionado:', colorId);
        setColorSeleccionado(colorId);
    };

    // En el evento de selección de talle
    const handleTalleSeleccionado = (talleId) => {
        setTalleSeleccionado(talleId);
    };

    const coloresUnicos = prod_colores_talle.filter((colorTalle, index, self) =>
        index === self.findIndex((t) => t.colore.id === colorTalle.colore.id)
    );
    const tallesUnicos = prod_colores_talle.filter((colorTalle, index, self) =>
    index === self.findIndex((t) => t.talle.id === colorTalle.talle.id)
);
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
                        {coloresUnicos.map((colorTalle) => (
                            <button
                                key={colorTalle.id}
                                style={{ background: colorTalle.colore.nombre }}
                                onClick={() => {
                                    handleColorSeleccionado(colorTalle.colore.id);
                                    handleTalleSeleccionado(null);
                                    setMostrarAdvertencia(false); 
                                }}
                            ></button>
                        ))}
                    </div>
                    <div className='talles'>
                        {tallesUnicos.map(talle => (
                            <button
                                key={talle.id}
                                onClick={() => {
                                    handleTalleSeleccionado(talle.talle.id);
                                    const selectedColorTalle = prod_colores_talle.find(
                                        ct => ct.coloreId == colorSeleccionado && ct.talleId == talle.talle.id
                                    );

                                    if (selectedColorTalle && selectedColorTalle.stock > 0) {
                                        setMostrarAdvertenciaStock(false);
                                    } else {
                                        setMostrarAdvertenciaStock(true);
                                    }
                                }}
                                aria-disabled={
                                    (
                                        colorSeleccionado &&
                                        talle.talle.id == talleSeleccionado &&
                                        talle.stock > 0
                                    )
                                }
                            >
                                {talle.talle.nombre}
                            </button>
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
                    {mostrarAdvertenciaStock && <p>NO HAY STOCK DE ESTE TALLE O COLOR QUE SELECCIONASTE</p>}
                    {prod_colores_talle.length > 0 ? (
                        <button
                            type="button"
                            className="boton-agregar cart"
                            onClick={() => {
                                if (colorSeleccionado && talleSeleccionado) {
                                    const selectedColorTalle = prod_colores_talle.find(
                                        ct => ct.colore.id == colorSeleccionado && ct.talle.id == talleSeleccionado
                                    );

                                    if (selectedColorTalle && selectedColorTalle.stock > 0) {
                                        setMostrarAdvertencia(false);
                                        agregarCompra(producto, colorSeleccionado, talleSeleccionado);
                                    } else {
                                        setMostrarAdvertencia(true);
                                    }
                                } else {
                                    setMostrarAdvertencia(true);
                                }
                            }}
                            disabled={mostrarAdvertencia || (added && !(colorSeleccionado && talleSeleccionado))}
                        >
                            {added ? 'Quitar del Carrito' : 'Agregar Carrito'}
                        </button>) : (
                        <button type="button" className="boton-agregar cart" disabled>
                            Sin Stock
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
