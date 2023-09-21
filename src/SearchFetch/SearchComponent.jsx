/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

export const SearchComponent = ({ contenidoSearch }) => {
    const [search, setSearch] = useState([]);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        search: ''
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const queryParams = new URLSearchParams(formData).toString();

            const response = await fetch(`http://localhost:3000/filtrado/search?${queryParams}`, {
                method: "GET",
            });

            const responseData = await response.json();
            contenidoSearch(responseData)
            if (responseData) {
                navigate(`/busqueda?query=${formData.search}`, { state: { resultados: responseData } });
            }
            console.log(responseData);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    return (
        <div className="nav__search">
            <form onSubmit={handleSubmit}>
                <input type="text" value={formData.search} onChange={handleInputChange} name='search' />
                <button>Buscar</button>
            </form>
        </div>
    )
}
