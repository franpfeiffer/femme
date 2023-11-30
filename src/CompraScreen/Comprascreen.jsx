import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col } from "react-bootstrap";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";

export const Comprascreen = () => {
  const { productos: productosOriginales } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  const handleAgregar = (compra) => {
    agregarCompra(compra);
  };

  const handleQuitar = (id) => {
    eliminarCompra(id);
  };


  return (
    <Container fluid>
      <Row className="justify-content-center">
        {/* Added "justify-content-center" to center the columns */}
        <div className="productos-container">
          {(productosFiltrados.length > 0 ? productosFiltrados : productosOriginales).map((producto) =>
            producto.activo ? (
              <Col key={producto.id} md={3} className="px-5 mb-3">
                {/* Added "px-2" class to reduce left and right padding */}
                <Card
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
              </Col>
            ) : null
          )}
        </div>
      </Row>
      <WhatsAppButton />
    </Container>
  );
};

