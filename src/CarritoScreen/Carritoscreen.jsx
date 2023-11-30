/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { CarritoContext } from "../context/CarritoContext";
import { data } from 'autoprefixer';
import { ListGroup, Button, Form, Col, Row, FormGroup, FormControl, Container } from 'react-bootstrap';
import { EnviosCalculador } from '../EnviosCalculador/EnviosCalculador';
export const Carritoscreen = () => {
    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra, sesionesActivas } = useContext(CarritoContext);
    const [precioEnvio, setPrecioEnvio] = useState(0);

    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        direccion: "",
        telefono: "",
        dni: "",
        codigo_postal: "",
    });
    const [idDelComprador, setidDelComprador] = useState('')
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleCodigoPostalChange = (codigoPostal) => {
        setFormData(prevData => ({
            ...prevData,
            codigo_postal: codigoPostal
        }));
    };
    const calcularTotal = () => {
        const totalSinEnvio = listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0);
        return (totalSinEnvio + precioEnvio).toFixed(2);
    };
  
    const handleImpresion = (e) => {
        e.preventDefault();
        console.log(precioEnvio);
        const total = calcularTotal()
        const totalConEnvio = parseFloat(total) + parseFloat(precioEnvio);
        console.log(totalConEnvio);
        const productos = listaCompras.map(item => {
            const nombreProducto = `${item.nombre}-Color:${item.color}-Talle:${item.talle}`
            return {
                id: item.idProducto,
                nombre: nombreProducto,
                precio: item.precio,
                cantidad: item.cantidad,
                color: item.color,
                talle: item.talle,
                total: totalConEnvio,
                idComprador: idDelComprador
            };
        });
        
        fetch(`https://api-femme.onrender.com/facturacion/comradorAddPayment`, {
            method: "POST",
            body: JSON.stringify(formData),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(dataComprador => {
                setidDelComprador(dataComprador)
                fetch(`https://api-femme.onrender.com/mercadoPago/payment`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ productos, idComprador: dataComprador,precioEnvio  }),
                })
                    .then(response => response.json())
                    .then(data => {
                        window.location.href = data.response.body.init_point;
                        console.log(data);
                    })
                    .catch(error => {
                        // Manejar errores si ocurren durante la solicitud
                        console.error('Error al procesar el pago:', error);
                    });
            })




    };

    return (
        <>
            <Container fluid className="overflow-x-hidden">
                <Row>
                    <Col lg={6}>
                        <ListGroup className="custom-list">
                            {listaCompras.map(item => (
                                <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center">
                                    <div className="item-info">
                                        <span className="item-name">{item.nombre}</span>
                                        <span className="item-price">${item.precio}</span>
                                        <span className="item-color">Color: {item.color}</span>
                                        <span className="item-size">Talle: {item.talle}</span>
                                    </div>
                                    <div className="item-quantity">
                                        <Button variant="outline-primary" className="btn-quantity" onClick={() => disminuirCantidad(item.id)}>-</Button>
                                        <span className="quantity">{item.cantidad}</span>
                                        <Button variant="outline-primary" className="btn-quantity" onClick={() => aumentarCantidad(item.id)}>+</Button>
                                    </div>
                                    <Button variant="danger" className="btn-delete" onClick={() => eliminarCompra(item.id)}>Eliminar</Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <div className="total-amount mt-3">TOTAL: ${calcularTotal()}</div>
                    </Col>
                    <Col lg={6} className="d-flex flex-column justify-content-center align-items-center bg-light rounded p-4">
                        <h2 className="mb-4">Detalles del Comprador</h2>
                        <Form onSubmit={handleImpresion}>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    name="nombre"
                                    value={formData.nombre}
                                    onChange={handleInputChange}
                                    placeholder="Nombre"
                                    className="w-100"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Email"
                                    className="w-100"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    name="direccion"
                                    value={formData.direccion}
                                    onChange={handleInputChange}
                                    placeholder="Dirección"
                                    className="w-100"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    name="telefono"
                                    value={formData.telefono}
                                    onChange={handleInputChange}
                                    placeholder="Teléfono"
                                    className="w-100"
                                />
                            </FormGroup>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    name="dni"
                                    value={formData.dni}
                                    onChange={handleInputChange}
                                    placeholder="DNI"
                                    className="w-100"
                                />
                            </FormGroup>
                            <EnviosCalculador onPrecioEnvioChange={setPrecioEnvio} onCodigoPostalChange={handleCodigoPostalChange}></EnviosCalculador>
                            <Button
                                type="submit"
                                variant="primary"
                                className={`btn-buy ${listaCompras.length < 1 ? 'disabled' : ''}`}
                                disabled={listaCompras.length < 1}
                            >
                                COMPRAR
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
