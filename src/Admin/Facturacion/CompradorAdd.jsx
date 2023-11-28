/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuthorization from '../HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const CompradorAdd = () => {
    const accesoPermitido = useAuthorization();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        direccion: "",
        telefono: "",
        dni: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://api-femme.onrender.com/facturacion/compradorAdd`, {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }

            const responseData = await response.json();
            if (responseData) {
                const facturacionAuto = await fetch(`https://api-femme.onrender.com/facturacion/createFactura/${responseData}`, {
                    method: "POST",
                    body: JSON.stringify(formData),
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseFacturacion = await facturacionAuto.json();
                if (responseFacturacion) {
                    navigate(`/createFactura/${responseFacturacion}`)
                }
            }
            setFormData({
                nombre: "",
                email: "",
                direccion: "",
                telefono: "",
                dni: ""
            });

        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };


    if (!accesoPermitido) {
        return 'No autorizado';
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className="minimal-form">
                <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="nombre"
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="email"
                />
                <input
                    type="text"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="direccion"
                />
                <input
                    type="number"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="telefono"
                />
                <input
                    type="number"
                    name="dni"
                    value={formData.dni}
                    onChange={handleInputChange}
                    className="minimal-input"
                    placeholder="dni"
                />
                <button className="minimal-button">Submit</button>
            </form>


        </>
    )
}
