/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


export const CrearStock = () => {
    const usuarioCookie = Cookies.get('usuario');
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        coloreId: "",
        talleId: "",
        stock: "",
    });
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
    
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            // Convierte el valor a número entero antes de asignarlo
            setFormData({ ...formData, [name]: Number(value) });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/createStock`, {
                method: "POST",
                body: new FormData(e.target),
                credentials: 'include',
                headers: {
                    Authorization: `Bearer ${usuarioCookie}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }
            console.log(formData);

            const responseData = await response.json();
            console.log(responseData);

            setProducto((prevProducto) => {
                const updatedProducto = { ...prevProducto };
                updatedProducto.prod_colores_talle.push(responseData);
                return updatedProducto;
            });

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
                console.log(data);
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
                console.log(producto);
                setProducto(data);

            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };
        fetchProducto();
    }, [id]);




    console.log(formData.coloreId)


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
                    className="input-create-productos"
                    placeholder="stock"
                />
                <button>Enviar</button>
            </form>

            <div>
                {producto.prod_colores_talle ? (
                    producto.prod_colores_talle.map((item) => (
                        <div key={item.id}>
                            <p>{item.coloreId}</p>
                            <p>{item.talleId}</p>
                            <p>{item.stock}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay datos disponibles</p>
                )}
            </div>
        </div>
    )
}
