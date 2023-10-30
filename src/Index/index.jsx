/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { CarritoContext } from "../context/CarritoContext";
import Features from './feature/Feature';
export const Index = () => {
  const { productos: productosOriginales } = useContext(ProductosContext);
  const { agregarCompra, eliminarCompra } = useContext(CarritoContext)
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosOferta, setProductosOferta] = useState([]);
  const [productosUltimos, setProductosUltimos] = useState([]);

  useEffect(() => {
    const ultimosProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/productos', { method: 'GET' });
        if (!response.ok) {
          throw new Error(`Fetch failed with status ${response.status}`);
        }
        const data = await response.json();
        const ultimos3Productos = data
          .sort((a, b) => b.id - a.id)
          .slice(0, 3);
        const productosConDescuento = data.filter((producto) => producto.descuento > 0);
        const productosDestacados = data.filter((producto) => producto.destacado);

        setProductosOferta(productosConDescuento)
        setProductosUltimos(ultimos3Productos);
        setProductosDestacados(productosDestacados)
      } catch (error) {
        console.error('Error fetching componentes, categoria:', error);
      }
    }
    ultimosProductos()
  }, [])

  const handleAgregar = (compra) => {
    agregarCompra(compra)
  }

  const handleQuitar = (id) => {
    eliminarCompra(id)
  }

  return (
    <div>
      <Features
        productosDestacados={productosDestacados}
        productosOferta={productosOferta}
        productosUltimos={productosUltimos}
        handleAgregar={handleAgregar}
        handleQuitar={handleQuitar}
      />
    </div>
  );
}
