import { useContext, useEffect, useState } from "react"

export const CreateProduct = () => {

    const [marca, setMarca] = useState([]);

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

    const [categoria, setCategoria] = useState([]);

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

    return(
        <form action="http://localhost:3000/productos/create" method="post" enctype="multipart/form-data">
            <input type="text" name="nombre" className="input-create-productos" placeholder="name"/>
            <input type="text" name="precio" className="input-create-productos" placeholder="price"/>
            <input type="text" name="descripcion" className="input-create-productos" placeholder="description"/>
            <select name="categoriaId">
            {categoria.map((item) => (
                <option value={item.id} key={item.id}>
                    {item.nombre}
                </option>
            ))}

            </select>
            <select name="marcaId">
            {marca.map((item) => (
                <option value={item.id} key={item.id}>
                    {item.nombre}
                </option>
            ))}
            </select>
            <input type="text" name="descuento" placeholder="descuento"/>
            <select name="destacado">
                <option value="false">false</option>
                <option value="true">true</option>
            </select>
            <input type="file" name="imagen1" />
            <button className="boton-enviar-create">Enviar</button>
        </form>
    )

}