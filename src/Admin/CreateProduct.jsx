import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import useAuthorization from "./HooksAdmin/useAuthorization";

export const CreateProduct = () => {
    const token = localStorage.getItem('token');
    const [categoria, setCategoria] = useState([]);
    const [marca, setMarca] = useState([]);
    const accesoPermitido = useAuthorization();
    const navigate = useNavigate();
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

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        const fileNamesContainer = document.getElementById("file-names-container");
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
        if (name === "imagenes" && files.length > 0) {
            fileNamesContainer.innerHTML = "";
            Array.from(files).forEach((file) => {
                const fileNameElement = document.createElement("p");
                fileNameElement.className = "file-name";
                fileNameElement.textContent = file.name;
                fileNamesContainer.appendChild(fileNameElement);
            })}
    };

        const handleSubmit = async (e) => {
            e.preventDefault();

            try {
                const response = await fetch("http://localhost:3000/productos/create", {
                    method: "POST",
                    body: new FormData(e.target),
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al enviar el formulario: ${response.status}`);
                }

                const responseData = await response.json();
                if (responseData) {
                    navigate(`/create/${responseData}`);
                }
            } catch (error) {
                console.error("Error al enviar el formulario:", error);
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
            <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="minimal-form"
            >
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="nombre"
                />

                <input
                    type="text"
                    name="precio"
                    value={formData.precio}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="precio"
                />

                <input
                    type="text"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="descripcion"
                />

                <select
                    name="categoriaId"
                    value={formData.categoriaId}
                    onChange={handleInputChange}
                    className="minimal-select"
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
                    className="minimal-select"
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
                    className="minimal-input"
                />

                <select
                    name="destacado"
                    value={formData.destacado}
                    onChange={handleInputChange}
                    className="minimal-select"
                >
                    <option value="false">false</option>
                    <option value="true">true</option>
                </select>
                <label className="custom-file-upload">
                    <input
                        type="file"
                        name="imagenes"
                        onChange={handleInputChange}
                        multiple
                        className="input-file-hidden"
                    />
                    <span>Seleccionar archivos</span>
                    <div id="file-names-container" className="file-names-container"></div>
                </label>

                <button type="submit" className="minimal-button">
                    Enviar
                </button>
            </form>
        )

    }