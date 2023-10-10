import React, { useContext } from 'react';
import { CarritoContext } from "../context/CarritoContext";

export const Carritoscreen = () => {
    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, sesionesActivas } = useContext(CarritoContext);

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2)
    };

    const handleImpresion = () => {
        const total = calcularTotal()
        const productos = listaCompras.map(item => {
            return {
                id: item.idProducto,
                nombre: item.nombre,
                precio: item.precio,
                cantidad: item.cantidad,
                color: item.color,
                talle: item.talle
            };
        });
        fetch(`http://localhost:3000/mercadoPago/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productos }),
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
    };

    return (
        <>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Color</th> {/* Añadir esta columna para mostrar el color */}
                        <th scope="col">Talle</th> {/* Añadir esta columna para mostrar el talle */}
                        <th scope="col">Cantidad</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCompras.map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>${item.precio}</td>
                            <td>{item.color}</td> {/* Mostrar el color */}
                            <td>{item.talle}</td> {/* Mostrar el talle */}
                            <td>
                                <button
                                    className="btn btn-quantity"
                                    onClick={() => disminuirCantidad(item.id)}
                                >-</button>
                                <span className="quantity">{item.cantidad}</span>
                                <button
                                    className="btn btn-quantity"
                                    onClick={() => aumentarCantidad(item.id)}
                                >+</button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-delete"
                                    onClick={() => {
                                        eliminarCompra(item.id);
                                    }}
                                >Eliminar</button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <th colSpan="4">TOTAL:</th>
                        <td className="total-amount">${calcularTotal()}</td>
                    </tr>
                </tbody>
                <div className="d-grid gap-2">
                    <button
                        className={`btn btn-buy ${listaCompras.length < 1 ? 'disabled' : ''}`}
                        onClick={handleImpresion}
                        disabled={listaCompras.length < 1}
                    >
                        COMPRAR
                    </button>
                </div>
            </table>
        </>
    );
};
