import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Card } from '../../Card/Card';
import Slider from '../Slide/Slider';


const Features = ({ productosDestacados, productosOferta, productosUltimos, handleAgregar, handleQuitar }) => (
    <div>
            {/* <Slider /> */}

        <Container className="my-4">
            <h3 className="tituloProductos">Productos Destacados</h3>
            <div className="productos">
                {productosDestacados.slice(0, 3).map((producto) => (
                    <Col md={4} key={producto.id}>
                        <Card
                            key={producto.id}
                            verMas={producto.id}
                            imagen={producto.imagene[0]?.url}
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            handleAgregar={() => handleAgregar(producto)}
                            handleQuitar={() => handleQuitar(producto.id)}
                            botonEliminar={producto.id}
                            botonEditar={producto.id}
                        />
                    </Col>
                ))}
            </div>

            <h3 className="tituloProductos">OFERTAS</h3>
            <div className="productos">
                {productosOferta.slice(0, 3).map((producto) => (
                    <Col md={4} key={producto.id}>
                        <Card
                            key={producto.id}
                            verMas={producto.id}
                            imagen={producto.imagene[0]?.url}
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            handleAgregar={() => handleAgregar(producto)}
                            handleQuitar={() => handleQuitar(producto.id)}
                            botonEliminar={producto.id}
                            botonEditar={producto.id}
                        />
                    </Col>
                ))}
            </div>

            <h3 className="tituloProductos">NUEVOS INGRESOS</h3>
            <div className="productos">
                {productosUltimos.slice(0, 3).map((producto) => (
                    <Col md={4} key={producto.id}>
                        <Card
                            key={producto.id}
                            verMas={producto.id}
                            imagen={producto.imagene[0]?.url}
                            nombre={producto.nombre}
                            descripcion={producto.descripcion}
                            precio={producto.precio}
                            handleAgregar={() => handleAgregar(producto)}
                            handleQuitar={() => handleQuitar(producto.id)}
                            botonEliminar={producto.id}
                            botonEditar={producto.id}
                        />
                    </Col>
                ))}
            </div>

            <div className="line my-4"></div>
            <div className="dataContainer">
                <div className="data">
                    <i className="fa-solid fa-truck"></i>
                    <h3>ENVIAMOS TU COMPRA</h3>
                    <p>Entregas a todo el pais</p>
                </div>
                <div className="data">
                    <i className="fa-solid fa-credit-card"></i>
                    <h3>PAGA COMO QUIERAS</h3>
                    <p>Tarjeta de credito o efectivo</p>
                </div>
                <div className="data">
                    <i className="fa-solid fa-lock"></i>
                    <h3>COMPRA CON SEGURIDAD</h3>
                    <p>Tus datos siempre protegidos</p>
                </div>
            </div>
        </Container >
    </div >
);

export default Features;