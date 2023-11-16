/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import FiltrosComponent from "./FilterComponent";
import { Container, Row, Col } from "react-bootstrap";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";
export const Comprascreen = () => {

  const { productos: productosOriginales } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext)
  const [productosFiltrados, setProductosFiltrados] = useState([]);


  const handleAgregar = (compra) => {
    agregarCompra(compra)
  }
  const handleQuitar = (id) => {
    eliminarCompra(id)
  }

  const handleFilterChange = (filteredData) => {
    setProductosFiltrados(filteredData)
  };


  return (
    <Container fluid>
    <Row>
      <Col md={3}>
        <aside className="filters">
          <FiltrosComponent onFilterChange={handleFilterChange} />
        </aside>
      </Col>
      <Col md={9}>
        <div className="productos-container">
          {(productosFiltrados.length > 0 ? productosFiltrados : productosOriginales).map((producto) =>
            producto.activo ? (
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
                descuento={producto.descuento}
              />
            ) : null
          )}
        </div>
      </Col>
    </Row>
    <WhatsAppButton/>

  </Container>

  );
}