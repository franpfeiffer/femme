import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';


export const DetalleProducto = () => {

    const [added, setAdded] = useState(false);  

    const [producto, setProductos] = useState([]);
    const [imagene, setImagene] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[1];
    const { agregarCompra, eliminarCompra, aumentarCantidad } = useContext(CarritoContext);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
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

    return (
        <div className="product">   
            <h2>{producto.nombre}</h2>
            {imagene.map((item) => (
                <img
                    key={item.id}
                    src={`http://localhost:3000/${item.url}`}
                    alt="imagene"
                    onError={() => {
                        console.log('Error al cargar la imagen');
                    }}
                />
            ))}
            <p>Price: ${producto.precio}</p>
            <div className="product-details">
                <p>Description: {producto.descripcion}</p>
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
