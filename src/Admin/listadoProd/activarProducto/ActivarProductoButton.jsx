/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'react-bootstrap';

export const ActivarProductoButton = ({id}) => {
    const token = localStorage.getItem('token');
    const handleButton = async () => {
        const confirmDelete = window.confirm("¿Estás seguro de que quieres activar este producto?");
        if (confirmDelete) {


            try {

                const response = await fetch(`https://api-femme.onrender.com/productos/${id}/activar`, {
                    method: "POST",
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error al enviar el formulario: ${response.status}`);
                }

                const responseData = await response.json();

            } catch (error) {
                console.error("Error al enviar el formulario:", error);
            }
        }
    }
    return (
        <Button onClick={handleButton}>Activar</Button>
    )
}
