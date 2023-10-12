import React, { useState } from 'react';
import Modal from './Modal/Modal';

const TablaProductosNoEntregados = ({ facturasNoEntregadas, onEntregaClick }) => {
  const [selectedFactura, setSelectedFactura] = useState(null);


  const openModal = (factura) => {
    setSelectedFactura(factura);
  };

  const closeModal = () => {
    setSelectedFactura(null);
  };

  
  return (
    <div>
      <table className="table table-bordered table-striped">
        <thead className="thead-dark">
          <tr>
            <th>ID Factura</th>
            <th>Comprador</th>
            <th>Entregado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {facturasNoEntregadas.map((factura) => (
            <tr key={factura.id}>
              <td>{factura.id}</td>
              <td>{factura.compradore.nombre}</td>
              <td>
                {!factura.entregado ? (
                  <button
                    className="btn btn-primary"
                    onClick={() => onEntregaClick(factura.id)}
                  >
                    Marcar como Entregado
                  </button>
                ) : (
                  'Entregado'
                )}
              </td>
              <td>
                <button
                  className="btn btn-link"
                  onClick={() => openModal(factura)}
                >
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={selectedFactura !== null} onClose={closeModal} factura={selectedFactura} />
    </div>
  );
};

export default TablaProductosNoEntregados;
