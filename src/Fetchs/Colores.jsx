import React, { useEffect, useState } from 'react';

const ColoresComponent = ({ onColorChange }) => {
    const [Colores, setColores] = useState([]);

    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const response = await fetch('http://localhost:3000/componentes/colores', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                console.log(data);
                setColores(data);
            } catch (error) {
                console.error('Error fetching componentes, categoria:', error);
            }
        };

        fetchCategoria();
    }, []);

    const handleColorChange = (event) => {
        const selectedColor = event.target.value;
        // Llama a la función de devolución de llamada para comunicar el valor seleccionado
        onColorChange(selectedColor);
    };

    return (
        <ul>
            {Colores.map((item) => (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        name="colores"
                        value={item.id}
                        onChange={handleColorChange} // Llama a la función de manejo de cambio cuando se selecciona un color
                    /> {item.nombre}
                </li>
            ))}
        </ul>
    );
};

export default ColoresComponent;
