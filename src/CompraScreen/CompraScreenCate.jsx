/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import { Container, Row, Col } from "react-bootstrap";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";
import { useLocation } from 'react-router-dom';
import FilterCanvas from "./CanvasFilter/FilterCanvas";

export const CompraScreenCate = () => {
  const location = useLocation();
  const categoriaEncoded = location.pathname.split('/')[2];
  const categoria = decodeURIComponent(categoriaEncoded);
  const { productos: productosOriginales } = useContext(ProductosContext);
  const [productosFiltrados, setProductosFiltrados] = useState([]);

  return (
    <section className="shop container">
      
      <div className="shop-content search-page">
        {productosOriginales.map((producto) =>
          producto.activo && producto.categoria.nombre == categoria ? (
            <>
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
            </>
          ) : null
        )}
      </div>
      <WhatsAppButton />
    </section >

  )
}
