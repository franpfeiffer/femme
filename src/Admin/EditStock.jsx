/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuthorization from './HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import { ModalStock } from "./ModalStock/ModalStock";
export const EditStock = () => {
    const accesoPermitido = useAuthorization();
    const [stockData, setStockData] = useState([]);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [detallesProducto, setDetallesProducto] = useState(null);
    const usuarioCookie = Cookies.get("usuario");
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
                const stockResponse = await responseStock.json();
                setStockData(stockResponse.stock);
                setDatosCargados(true);
            } catch (error) {
                console.error('Error fetching stock data:', error);
            }
        };

        fetchData();
    }, [usuarioCookie]);

    if (!accesoPermitido) {
        return 'No autorizado';
    }

    const columnasSucursal = [...new Set(stockData.map(item => item.admin_user.sucursal))];

    const stockPorProductoYSucursal = {};


    stockData.forEach(item => {
        const { producto, admin_user, stock } = item;
        const sucursalNombre = admin_user.sucursal;
        if (!stockPorProductoYSucursal[producto.id]) {
            stockPorProductoYSucursal[producto.id] = {
                producto: producto,
                sucursales: {},
            };
        }
        stockPorProductoYSucursal[producto.id].sucursales[sucursalNombre] = stock;
    });

    const stockPorSucursal = stockData.filter(item => item.admin_user.sucursal === sucursalSeleccionada);

    const productosUnicos = new Set();

    const mostrarDetalles = (productoId) => {
        const stockDelProducto = stockData
            .filter((item) => item.productoId === productoId && item.admin_user.sucursal === sucursalSeleccionada)
            .map((item) => {
                return {
                    id: item.id,
                    color: item.colore.nombre,
                    talle: item.talle.nombre,
                    cantidad: item.stock,
                };
            });
    
        const total = stockDelProducto.reduce((acc, curr) => acc + curr.cantidad, 0);
    
        setDetallesProducto({ total, detalles: stockDelProducto });
        setShowModal(true);
    };
    

    return (
        <div className="container mt-4">
            <h2>Stock de Productos por Sucursal</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Producto</th>
                        {columnasSucursal.map(sucursal => (
                            <th key={sucursal} onClick={() => setSucursalSeleccionada(sucursal)} className={sucursal === sucursalSeleccionada ? 'selected-sucursal' : ''}>
                            {sucursal}
                          </th>
                        ))}
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {stockPorSucursal.map(item => {
                        const { producto } = item;
                        if (!productosUnicos.has(producto.id)) {
                            productosUnicos.add(producto.id);
                            return (
                                <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    {columnasSucursal.map(sucursal => (
                                        <td key={sucursal}>
                                            {sucursal === sucursalSeleccionada && (
                                                <button className="btn btn-primary" onClick={() => mostrarDetalles(producto.id)}>Ver Detalles</button>
                                            )}
                                        </td>
                                    ))}
                                    <td>
                                        <Link to={`/create/${producto.id}/`} className="btn btn-primary">Agregar</Link>
                                    </td>
                                </tr>
                            );
                        }
                        return null; 
                    })}
                </tbody>
            </table>
            {detallesProducto && (
                <ModalStock show={showModal} onHide={() => setShowModal(false)} detallesProducto={detallesProducto} />
            )}

        </div>
    );
};
