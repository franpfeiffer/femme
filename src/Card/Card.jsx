import { useState } from "react"
import '../card.css';

export const Card = ({ imagen, titulo, descripcion, precio, handleAgregar, handleQuitar, handleAumentar, handleDisminuir }) => {

    const [added, setAdded] = useState(false)

    const clickAgregar = () => {
        handleAgregar()
        setAdded(true)
    }
    const clickQuitar = () => {
        handleQuitar()
        setAdded(false)
    }

    return (
        <div className="tarjeta">
            <div className="tarjeta-imagen-container">
            <img src={imagen} alt={titulo} className="tarjeta-imagen" />
            </div>
            <div className="tarjeta-contenido">
                <div className="tarjeta-grid">
                <h3 className="tarjeta-titulo">{titulo}</h3>
                <p className="tarjeta-descripcion">{descripcion}</p>
                <p className="tarjeta-precio">{precio}</p>
                </div>

                {added
                    ? <button
                        type="button"
                        className="boton-quitar"
                        onClick={clickQuitar}

                    >
                        Quitar del Carrito
                    </button>
                    : <button
                        type="button"
                        className="boton-agregar"
                        onClick={clickAgregar}
                    >
                        Agregar Carrito
                    </button>
                }

            </div>
        </div>
    )
}