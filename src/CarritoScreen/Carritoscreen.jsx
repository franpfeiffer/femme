import { useContext } from 'react';
import { CarritoContext } from "../context/CarritoContext";

export const Carritoscreen = () => {
    const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } = useContext(CarritoContext)

    const calcularTotal = () => {
        return listaCompras.reduce((total, item) => total + item.precio * item.cantidad, 0 ).toFixed(2)
    }

    const handleImpresion = () => {
        print()
    }

    return (
        <>
            <table className="custom-table">
                <thead>
                    <tr>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Cantidad</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    {listaCompras.map(item => (
                        <tr key={item.id}>
                            <td>{item.nombre}</td>
                            <td>${item.precio}</td>
                            <td>
                                <button 
                                    className="btn btn-quantity"
                                    onClick={() => disminuirCantidad(item.id)}
                                >-</button>
                                <span className="quantity">{item.cantidad}</span>
                                <button 
                                    className="btn btn-quantity"
                                    onClick={() => aumentarCantidad(item.id)}
                                >+</button>
                            </td>
                            <td>
                                <button
                                    type="button"
                                    className="btn btn-delete"
                                    onClick={() => eliminarCompra(item.id)}
                                >Eliminar</button>
                            </td>
                        </tr>
                    ))}

                    <tr>
                        <th colSpan="3">TOTAL:</th>
                        <td className="total-amount">${calcularTotal()}</td>
                    </tr>
                </tbody>
            </table>

            <div className="d-grid gap-2">
                <button 
                    className={`btn btn-buy ${listaCompras.length < 1 ? 'disabled' : ''}`}
                    onClick={handleImpresion}
                    disabled={listaCompras.length < 1}
                >
                    COMPRAR
                </button>
            </div>
        </>
    );
};
