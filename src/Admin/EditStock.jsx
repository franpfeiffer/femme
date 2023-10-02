import React, { useState, useEffect } from "react";
import useAuthorization from './HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';

export const EditStock = () => {
    const accesoPermitido = useAuthorization();
    const [productos, setProductos] = useState([]);
    const [manageStock, setManageStock] = useState([]);
    const usuarioCookie = Cookies.get('usuario');
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchProds = async () => {
            try {
                const responseProductos = await fetch('http://localhost:3000/productos/', { method: 'GET' });
                if (!responseProductos.ok) {
                    throw new Error(`Fetch productos failed with status ${responseProductos.status}`);
                }
                const dataProductos = await responseProductos.json();
                console.log(dataProductos);
                dataProductos.forEach(item => {
                    console.log(item.prod_colores_talle);
                    setManageStock(item.prod_colores_talle);
                });
                setProductos(dataProductos);
            } catch (error) {
                console.log(error);
            }
        };
        fetchProds();
    }, []);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const response = await fetch('http://localhost:3000/admin/listAdmin', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${usuarioCookie}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setAdmins(data);
            } catch (error) {
                console.error('Error fetching admins:', error);
            }
        };

        fetchAdmins();
    }, [usuarioCookie]);

    if (!accesoPermitido) {
        return 'No autorizado';
    }

    // Crear un objeto para almacenar el stock por producto y sucursal
    const stockPorProductoYSucursal = {};

    // Inicializar las columnas de sucursal
    const columnasSucursal = [...new Set(admins.map(admin => admin.sucursal))];

    // Inicializar el objeto con ceros
    productos.forEach(producto => {
        stockPorProductoYSucursal[producto.id] = {};
        columnasSucursal.forEach(sucursal => {
            stockPorProductoYSucursal[producto.id][sucursal] = 0;
        });
    });

    // Llenar el objeto con el stock real
    manageStock.forEach(item => {
        const { adminUserId, productoId, stock } = item;
        const admin = admins.find(admin => admin.id === adminUserId);
        if (admin) {
            const sucursalNombre = admin.sucursal;
            stockPorProductoYSucursal[productoId][sucursalNombre] += stock;
        }
    });

    return (
        <div>
            <h2>Stock de Productos por Sucursal</h2>
            <table>
                <thead>
                    <tr>
                        <th>Producto</th>
                        {columnasSucursal.map(sucursal => (
                            <th key={sucursal}>{sucursal}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {productos.map(producto => (
                        <tr key={producto.id}>
                            <td>{producto.nombre}</td>
                            {columnasSucursal.map(sucursal => (
                                <td key={sucursal}>
                                    {stockPorProductoYSucursal[producto.id][sucursal]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
