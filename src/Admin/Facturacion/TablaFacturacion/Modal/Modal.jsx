import React from 'react';

const Modal = ({ isOpen, onClose, factura }) => {
  if (!isOpen || !factura) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Detalles de la Factura</h2>
        <p>ID Factura: {factura.id}</p>
        <p>Comprador: {factura.compradore.nombre}</p>
        <p>Dirección: {factura.compradore.direccion}</p>
        <p>Total: {factura.total}</p>
        <h3>Productos Comprados:</h3>
        <ul>
          {factura.detalle_factura.map((detalle) => (
            <li key={detalle.id}>
              Producto: {detalle.producto.nombre} - Cantidad: {detalle.cantidad} - Color: {detalle.colore.nombre} - Talle: {detalle.talle.nombre}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
