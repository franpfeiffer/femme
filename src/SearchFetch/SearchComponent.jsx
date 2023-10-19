/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../index.css';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

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
      <form onSubmit={handleSubmit} className="form-busqueda">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Buscar..."
            aria-label="Buscar"
            aria-describedby="basic-addon2"
            type="text"
            name="search"
            value={formData.search}
            onChange={handleInputChange}
          />
          <Button variant="primary" id="button-addon2" type="submit">
            Buscar
          </Button>
        </InputGroup>
      </form>
    </div>
    )
}
