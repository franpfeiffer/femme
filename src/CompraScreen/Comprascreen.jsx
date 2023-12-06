/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import { WhatsAppButton } from "../WhatsAppLogo/WhatsAppLogo";
import FilterCanvas from "./CanvasFilter/FilterCanvas";
export const Comprascreen = () => {
  const { productos: productosOriginales } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  return (
    <>
      <section className="shop container">
        <FilterCanvas
          productosOriginales={productosOriginales}
          setProductosFiltrados={setProductosFiltrados}
        />
        <div className="shop-content">
          {(productosFiltrados.length > 0 ? productosFiltrados : productosOriginales).map((producto) =>
            producto.activo ? (
              <>
                <Card
                  verMas={producto.id}
                  imagen={producto.imagene[0]?.url}
                  nombre={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  descuento={producto.descuento}
                />
              </>
            ) : null
          )}
        </div>
        <WhatsAppButton />
      </section>
    </>
  );
};

