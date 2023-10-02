/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { CarritoContext } from "../context/CarritoContext";

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
      <div className="banner">
        <p>Banner</p>
      </div>
      
      <h3 className="tituloProductos">Productos Destacados</h3>
      <div className="productos">
        {productosDestacados.slice(0, 3).map((producto, index) => (
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
        ))}
      </div>
      
      <h3 className="tituloProductos">OFERTAS</h3>
      <div className="productos">
        {productosOferta.slice(0, 3).map((producto, index) => (
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
        ))}
      </div>
      
      <h3 className="tituloProductos">NUEVOS INGRESOS</h3>
      <div className="productos">
        {productosUltimos.slice(0, 3).map((producto, index) => (
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
        ))}
      </div>
      
      <div className="line"></div>
      
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
    </div>
  );
}
