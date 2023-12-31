/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import useAuthorization from "./HooksAdmin/useAuthorization";

export const CrearStock = () => {
    const token = localStorage.getItem('token');
    const location = useLocation();
    const [stockEntries, setStockEntries] = useState([]);
    const id = location.pathname.split('/')[2];
    const accesoPermitido = useAuthorization();
    const [formData, setFormData] = useState({
        coloreId: "",
        talleId: "",
        stock: "",
        adminUserId: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api-femme.onrender.com/productos/${id}/createStock`, {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }

            const responseData = await response.json();
            setStockEntries((prevEntries) => [...prevEntries, responseData]);

            setFormData({
                coloreId: "",
                talleId: "",
                stock: "",
            });

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };






    const [talle, setTalle] = useState([])
    const [color, setColor] = useState([])
    const [admin, setAdmin] = useState([])
    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const response = await fetch('https://api-femme.onrender.com/admin/listAdmin', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setAdmin(data)
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        const fetchTalle = async () => {
            try {
                const response = await fetch('https://api-femme.onrender.com/componentes/talle', { method: 'GET' });
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
                const response = await fetch('https://api-femme.onrender.com/componentes/colores', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setColor(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        Promise.all([fetchColor(), fetchTalle(), fetchAdmin()])
            .then(() => {
                
            })
    }, []);



    const [producto, setProducto] = useState([])
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`https://api-femme.onrender.com/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setProducto(data);

            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        fetchProducto();
    }, [id]);


    if (!accesoPermitido) {
        return 'acceso denegado';
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <select
                    name="coloreId"
                    value={formData.coloreId}
                    onChange={handleInputChange}

                >
                    <option value="" disabled>Selecciona un color</option>
                    {color.map((item) => (
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
                    <option value="" disabled>Selecciona un color</option>
                    {talle.map((item) => (
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
                <input
                    type="text"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    className="input-create-stock"
                    placeholder="Stock"
                />
                <button>Enviar</button>
            </form>

            <div>
                {stockEntries.length > 0 ? (
                    stockEntries.map((item) => (
                        <div key={item.id}>
                            <p>Color: {color.find(color => color.id == item.coloreId)?.nombre}</p>
                            <p>Talle: {talle.find(talle => talle.id == item.talleId)?.nombre}</p>
                            <p>Stock: {item.stock}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles actuales</p>
                )}
            </div>
        </div>
    )
}
