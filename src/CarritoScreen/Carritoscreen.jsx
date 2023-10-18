/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { CarritoContext } from "../context/CarritoContext";
import { data } from 'autoprefixer';

export const Carritoscreen = () => {
    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, sesionesActivas } = useContext(CarritoContext);
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        direccion: "",
        telefono: "",
        dni: ""
    });
    const [idDelComprador, setidDelComprador] = useState('')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)
    };

    const handleImpresion = (e) => {
        e.preventDefault();

        const total = calcularTotal()
        const productos = listaCompras.map(item => {
            const nombreProducto = `${item.nombre}-Color:${item.color}-Talle:${item.talle}`
            return {
                id: item.idProducto,
                nombre: nombreProducto,
                precio: item.precio,
                cantidad: item.cantidad,
                color: item.color,
                talle: item.talle,
                total: total,
                idComprador: idDelComprador
            };
        });

        fetch(`http://localhost:3000/facturacion/comradorAddPayment`,{
            method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
        })
        .then(response => response.json())
        .then(dataComprador => {
            setidDelComprador(dataComprador)
            fetch(`http://localhost:3000/mercadoPago/payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productos, idComprador: dataComprador }),
            })
                .then(response => response.json())
                .then(data => {
                    window.location.href = data.response.body.init_point;
                    console.log(data);
                })
                .catch(error => {
                    // Manejar errores si ocurren durante la solicitud
                    console.error('Error al procesar el pago:', error);
                });
        })


       
        
    };

    return (
        <>
            <ul className="custom-list">
                {listaCompras.map(item => (
                    <li key={item.id}>
                        <div className="item-info">
                            <span className="item-name">{item.nombre}</span>
                            <span className="item-price">${item.precio}</span>
                            <span className="item-color">Color: {item.color}</span>
                            <span className="item-size">Talle: {item.talle}</span>
                        </div>
                        <div className="item-quantity">
                            <button className="btn btn-quantity" onClick={() => disminuirCantidad(item.id)}>-</button>
                            <span className="quantity">{item.cantidad}</span>
                            <button className="btn btn-quantity" onClick={() => aumentarCantidad(item.id)}>+</button>
                        </div>
                        <button className="btn btn-delete" onClick={() => eliminarCompra(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <div className="total-amount">TOTAL: ${calcularTotal()}</div>
            <div className="d-grid gap-2">

            </div>
            <div className="buyer-form">
                <h2>Detalles del Comprador</h2>
                <form
                    onSubmit={handleImpresion}
                >
                    <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}

                        placeholder="nombre"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}

                        placeholder="email"
                    />
                    <input
                        type="text"
                        name="direccion"
                        value={formData.direccion}
                        onChange={handleInputChange}

                        placeholder="direccion"
                    />
                    <input
                        type="number"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleInputChange}

                        placeholder="telefono"
                    />
                    <input
                        type="number"
                        name="dni"
                        value={formData.dni}
                        onChange={handleInputChange}

                        placeholder="dni"
                    />
                    <button
                        className={`btn btn-buy ${listaCompras.length < 1 ? 'disabled' : ''}`}
                        onClick={handleImpresion}
                        disabled={listaCompras.length < 1}
                    >
                        COMPRAR
                    </button>
                </form>


            </div>
        </>
    );
};
