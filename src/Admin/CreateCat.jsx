/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import Cookies from 'js-cookie';
import useAuthorization from "./HooksAdmin/useAuthorization";
import { FormCreate } from "./Form/FormCreate";
export const CreateCat = () => {
    const usuarioCookie = Cookies.get('usuario');
    const accesoPermitido = useAuthorization();
    const [formData, setFormData] = useState({
        nombre: "",
    });


    const handleSubmit = async (formData) => {
        try {
            const response = await fetch(`http://localhost:3000/componentes/categoriaAdd`, {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${usuarioCookie}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Error al enviar el formulario: ${response.status}`);
            }

            const responseData = await response.json();


        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };

    if (!accesoPermitido) {
        return 'acceso denegado';
    }
    return (
        <>
                <h1>Crear Categoria</h1>

            <FormCreate
                onSubmit={handleSubmit}
                formData={formData}
                setFormData={setFormData}
                inputName="nombre"
                inputPlaceholder="Nombre"
                buttonText="Enviar"
            />


        </>
    )
}
