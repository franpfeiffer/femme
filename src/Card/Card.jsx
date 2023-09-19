import { useState } from "react"
import '../card.css';
import { Link } from "react-router-dom";
export const Card = ({ imagen, nombre, precio, handleAgregar, handleQuitar, handleAumentar, handleDisminuir,verMas}) => {

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
                <img src={imagen} alt={nombre} className="tarjeta-imagen" />
            </div>
            <div className="tarjeta-contenido">
                <h3 className="tarjeta-titulo">{nombre}</h3>
                <p className="tarjeta-precio">{precio}</p>
                {added ? (
                    <button type="button" className="boton-quitar" onClick={clickQuitar}>
                        Quitar del Carrito
                    </button>
                ) : (
                    <button type="button" className="boton-agregar" onClick={clickAgregar}>
                        Agregar Carrito
                    </button>
                )}
                <Link to={verMas}><button type='button' className="boton-agregar boton-verMas">Ver Mas</button></Link>
            </div>
        </div>

    )
}