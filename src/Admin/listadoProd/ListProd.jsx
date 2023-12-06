/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ActivarProductoButton } from './activarProducto/ActivarProductoButton';
import { DeleteProdButton } from '../../Card/Buttons/DeleteButton';

export const ListProd = ({ productos, stockTotals, activo }) => {
    const [botonActivo, setBotonActivo] = useState(false); // Estado para controlar qué botón se muestra
    const [busqueda, setBusqueda] = useState(''); // Estado para el término de búsqueda

    const handleBusqueda = (e) => {
        setBusqueda(e.target.value); // Actualizar el término de búsqueda al escribir en el input
    };

    // Filtrar productos según el término de búsqueda
    const productosFiltrados = productos.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const alternarBoton = () => {
        setBotonActivo(!botonActivo); // Alternar el estado del botón
    };

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                <input
                    type="text"
                    placeholder="Buscar producto"
                    value={busqueda}
                    onChange={handleBusqueda}
                    style={{ width: '200px', padding: '5px' }} // Establecer un ancho específico y rellenado
                />
            </div>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosFiltrados.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{stockTotals[producto.id]}</td>
                            <td>{activo[index] ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                {activo[index] ? (
                                    <DeleteProdButton id={producto.id} />
                                ) : (
                                    <ActivarProductoButton id={producto.id} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

