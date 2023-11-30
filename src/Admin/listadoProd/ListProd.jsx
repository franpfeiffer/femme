/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { ActivarProductoButton } from './activarProducto/ActivarProductoButton';
import { DeleteProdButton } from '../../Card/Buttons/DeleteButton';

export const ListProd = ({ productos, stockTotals, activo }) => {
    const [botonActivo, setBotonActivo] = useState(false); // Estado para controlar qué botón se muestra
    const alternarBoton = () => {
        setBotonActivo(!botonActivo); // Alternar el estado del botón
    };
    return (
        <>
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
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{stockTotals[producto.id]}</td>
                            <td>{activo[index] ? 'Activo' : 'Inactivo'}</td>
                            <td>{activo[index] ? <DeleteProdButton id={producto.id}/>: <ActivarProductoButton id={producto.id}/>}   </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
