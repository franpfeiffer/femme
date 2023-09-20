/* eslint-disable no-unused-vars */
import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";
import FiltrosComponent from "./FilterComponent";
export const Comprascreen = () => {

  const { productos } = useContext(ProductosContext)

  const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

  const handleAgregar = (compra) => {
    agregarCompra(compra)
  }
  const handleQuitar = (id) => {
    eliminarCompra(id)
  }

  const handlePriceFilter = () => {
    console.log('Filter products between');
  };


  return (

    <div className="containerProductos">

      <aside className="filters">
        
          <FiltrosComponent onFilterChange={handlePriceFilter} />
        
      </aside>

      <div className="productos-container">
        {productos.map(producto => (
          <Card
            key={producto.id}
            imagen={producto.image}
            titulo={producto.nombre}
            descripcion={producto.descripcion}
            precio={producto.precio}
            handleAgregar={() => handleAgregar(producto)}
            handleQuitar={() => handleQuitar(producto.id)}
          >

          </Card>
        ))}
      </div>
    </div>

  )
}