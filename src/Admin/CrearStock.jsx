/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import useAuthorization from "./HooksAdmin/useAuthorization";

export const CrearStock = () => {
    const usuarioCookie = Cookies.get('usuario');
    const location = useLocation();
    const [stockEntries, setStockEntries] = useState([]);
    const id = location.pathname.split('/')[2];
    const accesoPermitido = useAuthorization();
    const [formData, setFormData] = useState({
        coloreId: "",
        talleId: "",
        stock: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/createStock`, {
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

    useEffect(() => {
        const fetchTalle = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/talle', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setTalle(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };

        fetchTalle();
    }, []);
    useEffect(() => {
        const fetchColor = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/colores', { method: 'GET' });
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
        fetchColor();
    }, []);

    const [producto, setProducto] = useState([])
    useEffect(() => {
        const fetchProducto = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' });
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
                    {talle.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
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
                            <p>{item.coloreId}</p>
                            <p>{item.talleId}</p>
                            <p>{item.stock}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles actuales</p>
                )}
            </div>
        </div>
    )
}
