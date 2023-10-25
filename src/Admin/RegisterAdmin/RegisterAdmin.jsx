/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"
import Cookies from 'js-cookie';
import useAuthorization from "../HooksAdmin/useAuthorization";
import { Form, Button, Container } from 'react-bootstrap';

export const RegisterAdmin = () => {
    const accesoPermitido = useAuthorization();
    const usuarioCookie = Cookies.get('usuario');
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        usuario: "",
        password: "",
        sucursal: ""
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:3000/admin/create`, {
                method: "POST",
                body: JSON.stringify(formData),
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${usuarioCookie}`,
                },
            });
            const responseData = await response.json();
            if (responseData == 'ok') {
                navigate(`/adminpanel`);
            }


        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        }
    };


    if (!accesoPermitido) {
        return 'acceso denegado';
    }


    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <Form onSubmit={handleSubmit} className="col-md-6">
                    <Form.Group controlId="formUsuario">
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control
                            type="text"
                            name='usuario'
                            value={formData.usuario}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name='password'
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formSucursal">
                        <Form.Label>Sucursal</Form.Label>
                        <Form.Control
                            type="text"
                            name='sucursal'
                            value={formData.sucursal}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <div className="text-center mt-3">
                        <Button variant="primary" type="submit">
                            Enviar
                        </Button>
                    </div>
                </Form>
            </Container>
        </>
    )
}
