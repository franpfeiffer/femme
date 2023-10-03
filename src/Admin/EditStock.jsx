import React, { useState, useEffect } from "react";
import useAuthorization from './HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

export const EditStock = () => {
    const accesoPermitido = useAuthorization();
    const [stockData, setStockData] = useState([]);
    const [productosData, setProductosData] = useState([]);
    const usuarioCookie = Cookies.get('usuario');
    const [datosCargados, setDatosCargados] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseStock = await fetch('http://localhost:3000/filtrado/stocks', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${usuarioCookie}`,
                    },
                });
                if (!responseStock.ok) {
                    throw new Error(`Fetch stock failed with status ${responseStock.status}`);
                }
                const stock = await responseStock.json();
                setStockData(stock.stock);
                setProductosData(stock.producto);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData()
            .then(() => {
                // Todos los datos están cargados
                setDatosCargados(true);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [usuarioCookie]);

    if (!accesoPermitido) {
        return 'No autorizado';
    }

    // Crear un objeto para almacenar el stock por producto y sucursal
    const stockPorProductoYSucursal = {};

    // Inicializar las columnas de sucursal
    const columnasSucursal = [...new Set(stockData.map(item => item.admin_user.sucursal))];

    // Inicializar el objeto con ceros
    productosData.forEach(producto => {
        stockPorProductoYSucursal[producto.id] = {};
        columnasSucursal.forEach(sucursal => {
            stockPorProductoYSucursal[producto.id][sucursal] = 0;
        });
    });

    // Llenar el objeto con el stock real
    stockData.forEach(item => {
        const { producto, admin_user, stock } = item;
        const sucursalNombre = admin_user.sucursal;
        stockPorProductoYSucursal[producto.id][sucursalNombre] += stock;
    });

    return (
        <div>
            <h2>Stock de Productos por Sucursal</h2>
            <table className="product-table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        {columnasSucursal.map(sucursal => (
                            <th key={sucursal}>{sucursal}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {productosData.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            {columnasSucursal.map(sucursal => (
                                <td key={sucursal}>
                                    {stockPorProductoYSucursal[producto.id][sucursal]}
                                </td>
                            ))}
                            <td>
                                <Link to={`/create/${producto.id}/`}><p>+</p></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
