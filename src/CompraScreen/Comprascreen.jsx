/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import FiltrosComponent from "./FilterComponent";
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
    <div className="containerProductos">
      <aside className="filters">
        <FiltrosComponent onFilterChange={handleFilterChange} />
      </aside>

      <div className="productos-container">
        {(productosFiltrados.length > 0 ? productosFiltrados : productosOriginales).map((producto) => (
          <Card
            key={producto.id}
            imagen={producto.imagene[0]?.url}
            nombre={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            handleAgregar={() => handleAgregar(producto)}
            handleQuitar={() => handleQuitar(producto.id)}
          />
        ))}
      </div>
    </div>
  );
}