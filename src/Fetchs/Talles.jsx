import React, { useEffect, useState } from 'react';

const TalleComponent = ({ onTalleChange }) => {
    const [talle, setTalle] = useState([]);

    useEffect(() => {
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
                console.error('Error fetching componentes, talle:', error);
            }
        };

        fetchTalle();
    }, []);

    const handleTalleChange = (event) => {
        const selectedTalle = event.target.value;
        // Llama a la función de devolución de llamada para comunicar el valor seleccionado
        onTalleChange(selectedTalle);
    };

    return (
        <ul>
            {talle.length > 0 && talle.map((item) => (
                <li key={item.id}>
                    <input
                        type="checkbox"
                        name="talles"
                        value={item.id}
                        onChange={handleTalleChange}
                    /> {item.nombre}
                </li>
            ))}
        </ul>
    );    
};

export default TalleComponent;
