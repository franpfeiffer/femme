import React, { useState, useEffect } from 'react';

export const Index = () => {

  const [productosDestacados, setProductosDestacados] = useState([]);
  const [productosOferta, setProductosOferta] = useState([]);
  const [productosUltimos, setProductosUltimos] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:3000/productos?destacado=true').then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la API.');
        }
        return response.json();
      }),
      fetch('http://localhost:3000/productos?descuento=true').then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la API.');
        }
        return response.json();
      }),
      fetch('http://localhost:3000/ultimos').then(response => {
        if (!response.ok) {
          throw new Error('No se pudo obtener la respuesta de la API.');
        }
        return response.json();
      })
    ])
      .then(([destacadosData, ofertaData, ultimosData]) => {
        setProductosDestacados(destacadosData);
        setProductosOferta(ofertaData);
        setProductosUltimos(ultimosData);
      })
      .catch(error => {
        console.log('Error al fetchear la API:', error);
      });
  }, []);

  return (
    <div>
      <div className="banner">
        <p>Banner</p>
      </div>
      <h3 className="tituloProductos">Productos Destacados</h3>
      <div className="productos">
        {productosDestacados.map((producto, index) => (
          <div key={index}>
            <img src={producto.imagene} alt={producto.nombre} />
            <p>{producto.nombre}</p>
            <p>{producto.label}</p>
          </div>
        ))}
      </div>
      <h3 className="tituloProductos">Nuevos Productos</h3>
      <div className="productos">
        {productosOferta.map((producto, index) => (
          <div key={index}>
            <img src={producto.imageUrl} alt={producto.name} />
            <p>{producto.name}</p>
            <p>{producto.label}</p>
          </div>
        ))}
      </div>
      <h3 className="tituloProductos">OFERTAS</h3>
      <div className="productos">
        {productosUltimos.map((producto, index) => (
          <div key={index}>
            <img src={producto.imageUrl} alt={producto.name} />
            <p>{producto.name}</p>
            <p>{producto.label}</p>
          </div>
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