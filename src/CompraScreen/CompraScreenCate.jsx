/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col } from "react-bootstrap";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";
import { useLocation } from 'react-router-dom';

export const CompraScreenCate = () => {
  const location = useLocation();
  const categoriaEncoded = location.pathname.split('/')[2];
  const categoria = decodeURIComponent(categoriaEncoded);
  const { productos: productosOriginales } = useContext(ProductosContext);
  console.log(productosOriginales[0].categoria);
  return (
    <div><Container fluid>
    <Row className="justify-content-center">
      <div className="productos-container">
        {productosOriginales.map((producto) =>
          producto.activo && producto.categoria.nombre == categoria ? (
            <Col key={producto.id} md={3} className="px-5 mb-3">
              <Card
                verMas={producto.id}
                imagen={producto.imagene[0]?.url}
                nombre={producto.nombre}
                descripcion={producto.descripcion}
                precio={producto.precio}
                botonEliminar={producto.id}
                botonEditar={producto.id}
                descuento={producto.descuento}
              />
            </Col>
          ) : null
        )}
      </div>
    </Row>
    <WhatsAppButton />
  </Container></div>
  )
}
