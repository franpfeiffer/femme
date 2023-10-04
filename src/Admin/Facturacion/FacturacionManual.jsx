/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuthorization from '../HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { useLocation } from 'react-router-dom';

export const FacturacionManual = () => {
    const accesoPermitido = useAuthorization();
    const usuarioCookie = Cookies.get('usuario');
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [formData, setFormData] = useState({
        productoId: "",
        coloreId: "",
        talleId: "",
        cantidad: "",
        precio_unitario: "",
        adminUserId: "",
        total: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "productoId") {
            handleProductChange(value);
        } else if (name === "cantidad") {
            handleQuantityChange(value);
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/facturacion/addManualFacturas/${id}`, {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${usuarioCookie}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }

            const responseData = await response.json();

            setFormData({
                productoId: "",
                coloreId: "",
                talleId: "",
                cantidad: "",
                precio_unitario: "",
                adminUserId: "",
                total: ""
            });

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };
    const [Producto, setProducto] = useState([])
    const [Colores, setColores] = useState([])
    const [Talle, setTalle] = useState([])
    const [admin, setAdmin] = useState([])

    useEffect(() => {
        const fetchAdmin = async () => {
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
                setAdmin(data)
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3000/productos/', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setProducto(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };

        const fetchTalle = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/talle', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setTalle(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        const fetchColor = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/colores', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setColores(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        }

        Promise.all([fetchColor(), fetchTalle(), fetchProductos(), fetchAdmin()])
            .then(() => {

            })


    }, [usuarioCookie])
    const handleProductChange = (productId) => {
        console.log("Producto seleccionado:", productId);
        const selectedProduct = Producto.find(item => item.id == productId);
        console.log("Producto encontrado:", selectedProduct);
        if (selectedProduct) {
            setFormData(prevData => ({
                ...prevData,
                productoId: productId,
                precio_unitario: selectedProduct.precio, // Utiliza el nombre correcto de la propiedad
            }));
        }
    };


    const handleQuantityChange = (quantity) => {
        // Asegurarse de que la cantidad sea un número válido
        const parsedQuantity = parseInt(quantity, 10);
        if (!isNaN(parsedQuantity)) {
            // Calcular el nuevo precio unitario basado en la cantidad
            const newPrecioUnitario = formData.precio_unitario * parsedQuantity;
            setFormData(prevData => ({
                ...prevData,
                cantidad: parsedQuantity,
                precio_unitario: newPrecioUnitario,
            }));
        }
        else {
            // Si la cantidad no es válida, puedes manejarlo como desees, por ejemplo, establecer el total a 0.
            setFormData(prevData => ({
                ...prevData,
                cantidad: 0,
                total: 0,
            }));
        }
    }


    if (!accesoPermitido) {
        return 'No autorizado';
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <select
                    name="coloreId"
                    value={formData.coloreId}
                    onChange={handleInputChange}

                >
                    <option value="" disabled>Selecciona un color</option>
                    {Colores.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <select
                    name="talleId"
                    value={formData.talleId}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Selecciona un Talle</option>
                    {Talle.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <select
                    name="adminUserId"
                    value={formData.adminUserId}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Selecciona una sucursal</option>
                    {admin.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.sucursal}
                        </option>
                    ))}
                </select>
                <select
                    name="productoId"
                    value={formData.productoId}
                    onChange={handleInputChange}
                >
                    <option value="" disabled>Selecciona un Producto</option>
                    {Producto.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="cantidad"
                    value={formData.cantidad}
                    onChange={handleInputChange}
                    className="input-create-stock"
                    placeholder="cantidad"
                />
                <input
                    type="text"
                    name="precio_unitario"
                    value={formData.precio_unitario}
                    onChange={handleInputChange}
                    className="input-create-stock"
                    placeholder="precio_unitario"
                />
                <input
                    type="text"
                    name="total"
                    value={formData.total}
                    onChange={handleInputChange}
                    className="input-create-stock"
                    placeholder="total"
                />
                <button>Submit</button>
            </form>


        </>
    )
}
