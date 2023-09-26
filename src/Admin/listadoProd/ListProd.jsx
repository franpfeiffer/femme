import React from 'react';

export const ListProd = ({ productos, stockTotals }) => {
    return (
        <>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {productos.map((producto, index) => (
                        <tr key={index}>
                            <td>{producto.nombre}</td>
                            <td>${producto.precio}</td>
                            <td>{stockTotals[producto.id]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
