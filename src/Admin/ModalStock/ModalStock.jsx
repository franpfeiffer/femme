/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { Button } from 'react-bootstrap';
import Cookies from 'js-cookie';
const usuarioCookie = Cookies.get('usuario');

export const ModalStock = ({ show, onHide, detallesProducto }) => {
  if (!detallesProducto) return null;

  const modalStyles = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.3)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const contentStyles = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
  };
  const handleButton = async (e) => {
    const confirmacion = window.confirm("¿Estás seguro de eliminar stock?");
    if (confirmacion) {
      try {
        const response = await fetch(`http://localhost:3000/productos/${e}/borrarStock`, {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            Authorization: `Bearer ${usuarioCookie}`,
          },
        });
        console.log(e);
      } catch (error) {
        console.log(error, 'eliminar stock');
      }
    }
  }
  return (
    <div style={{ ...modalStyles, display: show ? "flex" : "none" }}>
      <div style={contentStyles}>
        <button style={{ float: "right", border: "none", background: "none", fontSize: "20px", cursor: "pointer" }} onClick={onHide}>
          &times;
        </button>
        <h2>Detalles del Producto</h2>
        <p>Total de Stock: {detallesProducto.total}</p>
        {detallesProducto.detalles.map((detalle, index) => (
          <p key={index}>
            Color: {detalle.color}, Talle: {detalle.talle}, Cantidad: {detalle.cantidad}
            <Button onClick={() => handleButton(detalle.id)}>
              <i className="fa-solid fa-xmark"></i>
            </Button>
          </p>
        ))}

      </div>
    </div>
  );
}
