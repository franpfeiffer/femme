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
    const [formData, setFormData] = useState({
        nombre: oldProd.nombre,
        precio: oldProd.precio,
        descripcion: oldProd.descripcion,
        categoriaId: oldProd.categoriaId,
        marcaId: oldProd.marcaId,
        descuento: oldProd.descuento,
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
            })
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/productos/${id}/editar`, {
                method: "PUT",
                body: new FormData(e.target),
                credentials: 'include',
                headers: {
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
        <div className="container mt-5">
            <h1>{oldProd.nombre}</h1>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="precio" className="form-label">Precio</label>
                    <input
                        type="text"
                        className="form-control"
                        id="precio"
                        name="precio"
                        value={formData.precio}
                        onChange={handleInputChange}
                        placeholder="Precio"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleInputChange}
                        placeholder="Descripción"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="categoria" className="form-label">Categoría</label>
                    <select
                        className="form-select"
                        id="categoria"
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
                </div>
                <div className="mb-3">
                    <label htmlFor="marca" className="form-label">Marca</label>
                    <select
                        className="form-select"
                        id="marca"
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
                </div>
                <div className="mb-3">
                    <label htmlFor="descuento" className="form-label">Descuento</label>
                    <input
                        type="text"
                        className="form-control"
                        id="descuento"
                        name="descuento"
                        value={formData.descuento}
                        onChange={handleInputChange}
                        placeholder="Descuento"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="destacado" className="form-label">Destacado</label>
                    <select
                        className="form-select"
                        id="destacado"
                        name="destacado"
                        value={formData.destacado}
                        onChange={handleInputChange}
                    >
                        <option value="false">false</option>
                        <option value="true">true</option>
                    </select>
                </div>
                <div className="mb-3">
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
                </div>
                <button type="submit" className="btn btn-primary">Enviar</button>
            </form>

        </div>
    )
}
