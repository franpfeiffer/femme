import { useState } from "react"
import '../card.css';
import { Link } from "react-router-dom";
import useAuthorization from "../Admin/HooksAdmin/useAuthorization";
import { DeleteButton } from "./Buttons/DeleteButton";
import { EditButton } from "./Buttons/EditButton";
export const Card = ({ imagen, nombre, precio, handleAgregar, handleQuitar, handleAumentar, handleDisminuir, verMas, botonEliminar, botonEditar}) => {
    const accesoPermitido = useAuthorization();
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
                <img src={`http://localhost:3000/${imagen}`} alt={nombre} className="tarjeta-imagen" />
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
                {accesoPermitido ?
                    (
                        <DeleteButton id={botonEliminar}/>

                    ) : null
                }{accesoPermitido ?
                    ( <EditButton id={botonEditar}/>) : null
                }
                <Link to={`/${verMas}/detalles-del-producto`}><button type='button' className="boton-agregar boton-verMas">Ver Mas</button></Link>
            </div>
        </div>

    )
}