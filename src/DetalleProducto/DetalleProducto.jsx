import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';

export const DetalleProducto = () => {
    const [added, setAdded] = useState(false);
    const [producto, setProductos] = useState([]);
    const [imagene, setImagene] = useState([]);
    const [prod_colores_talle, setProd_colores_talle] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[1];
    const { agregarCompra, eliminarCompra, aumentarCantidad } = useContext(CarritoContext);
    const [amount, setAmount] = useState(1);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imagene.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === imagene.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="product-detail">
            <h2>{producto.nombre}</h2>
            <div className="carousel-container">
                <div className="carousel-images">
                    {imagene.map((item, index) => (
                        <img
                            key={item.id}
                            src={`http://localhost:3000/${item.url}`}
                            alt="imagene"
                            onError={() => {
                                console.log('Error al cargar la imagen');
                            }}
                            className={index === currentImageIndex ? 'carousel-image active' : 'carousel-image'}
                        />
                    ))}
                </div>
                <div className="carousel-buttons">
                    <button onClick={handlePrevImage}>Anterior</button>
                    <button onClick={handleNextImage}>Siguiente</button>
                </div>
                <p>Description: {producto.descripcion}</p>
                <div>
                    <button onClick={() => setAmount(amount > 1 ? amount - 1 : 1)}>-</button>
                    <span>{amount}</span>
                    <button onClick={() => setAmount(amount + 1)}>+</button>
                </div>
                {added
                    ? <button
                        type="button"
                        className="boton-quitar"
                        onClick={() => handleQuitar(producto.id)}
                    >
                        Quitar del Carrito
                    </button>
                    : <button
                        type="button"
                        className="boton-agregar"
                        onClick={() => handleAgregar(producto)}
                    >
                        Agregar Carrito
                    </button>
                }
            </div>
        </div>
    );
};
