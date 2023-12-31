import React, { useEffect, useState } from 'react';

const CategoriaComponent = ({ onCategoriaChange }) => {
    const [categoria, setCategoria] = useState([]);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await fetch('https://api-femme.onrender.com/componentes/categoria', { method: 'GET' });
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

    const handleCategoriaChange = (event) => {
        const selectedCategoria = event.target.value;
        // Llama a la función de devolución de llamada para comunicar el valor seleccionado
        onCategoriaChange(selectedCategoria);
    };

    return (
        <ul>
            {categoria.length > 0 && categoria.map((item) => (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        name="categoria"
                        value={item.id}
                        onChange={handleCategoriaChange}
                    /> {item.nombre}
                </li>
            ))}
        </ul>
    );    
};

export default CategoriaComponent;
