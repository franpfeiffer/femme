/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react"
import { useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import useAuthorization from "./HooksAdmin/useAuthorization";
import { useNavigate } from "react-router-dom";

export const EditProduct = () => {
    const usuarioCookie = Cookies.get('usuario');
    const location = useLocation();
    const navigate = useNavigate();

    const id = location.pathname.split('/')[1];
    const accesoPermitido = useAuthorization();
    const [categoria, setCategoria] = useState([]);
    const [marca, setMarca] = useState([]);
    const [oldProd, setOldProd] = useState([])
    const [formData, setFormData] = useState({
        nombre: "",
        precio: "",
        descripcion: "",
        categoriaId: "",
        marcaId: "",
        descuento: "",
        destacado: "false",
        imagen1: null,
    });
    useEffect(() => {
        const productos = async () => {
            try {
                const response = await fetch(`http://localhost:3000/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setOldProd(data);
            } catch (error) {
                console.error('Error fetching componentes, categoria:', error);
            }
        };

        productos();
    }, [id]);
    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/editar`, {
                method: "PUT",
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
 

        } catch (error) {
            console.error('Error al enviar el formulario:', error);

        }
    };

    useEffect(() => {
        const fetchMarca = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/marca', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setMarca(data);
            } catch (error) {
                console.error('Error fetching componentes, marca:', error);
            }
        };

        fetchMarca();
    }, []);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/categoria', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setCategoria(data);
            } catch (error) {
                console.error('Error fetching componentes, categoria:', error);
            }
        };

        fetchCategoria();
    }, []);





    if (!accesoPermitido) {
        return 'acceso denegado';
    }
    return (
        <>
            <h1>{oldProd.nombre}</h1>
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="input-create-productos"
                    placeholder="nombre"
                />

                <input
                    type="text"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    className="input-create-productos"
                    placeholder="precio"
                />

                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="input-create-productos"
                    placeholder="descripcion"
                />

                <select
                    name="categoriaId"
                    value={formData.categoriaId}
                    onChange={handleInputChange}
                >
                    {categoria.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
                        </option>
                    ))}
                </select>

                <select
                    name="marcaId"
                    value={formData.marcaId}
                    onChange={handleInputChange}
                >
                    {marca.map((item) => (
                        <option value={item.id} key={item.id}>
                            {item.nombre}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="descuento"
                    value={formData.descuento}
                    onChange={handleInputChange}
                    placeholder="descuento"
                />

                <select
                    name="destacado"
                    value={formData.destacado}
                    onChange={handleInputChange}
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>

                <input
                    type="file"
                    name="imagen1"
                    onChange={handleInputChange}
                />

                <button type="submit" className="boton-enviar-create">
                    Enviar
                </button>
            </form>
        </>
    )
}
