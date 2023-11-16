import { useState, useEffect } from "react";
import "../card.css";
import { Link } from "react-router-dom";
import useAuthorization from "../Admin/HooksAdmin/useAuthorization";
import { DeleteButton } from "./Buttons/DeleteButton";
import { EditButton } from "./Buttons/EditButton";

export const Card = ({ nombre, precio, descuento, imagen, verMas, botonEliminar, botonEditar }) => {
    const accesoPermitido = useAuthorization();
    const [precioDecimal, setPrecioDecimal] = useState(parseFloat(precio));
    const [descuentoDecimal, setDescuentoDecimal] = useState(parseFloat(descuento));
    const [precioConDescuento, setPrecioConDescuento] = useState(precioDecimal);

    useEffect(() => {
        setPrecioDecimal(parseFloat(precio));
        setDescuentoDecimal(parseFloat(descuento ?? 0));
    }, [precio, descuento]);

    useEffect(() => {
        if (descuentoDecimal > 0) {
            const descuentoAplicado = (descuentoDecimal / 100) * precioDecimal;
            setPrecioConDescuento(precioDecimal - descuentoAplicado);
        } else {
            setPrecioConDescuento(precioDecimal);
        }
    }, [precioDecimal, descuentoDecimal]);

    return (
        <div className="tarjeta">
        <div className="tarjeta-imagen-container">
            <img src={`http://localhost:3000/${imagen}`} alt={nombre} className="tarjeta-imagen" />
        </div>
        <div className="tarjeta-contenido">
            <h3 className="tarjeta-titulo">{nombre}</h3>
            {descuentoDecimal > 0 && (
                <p className="tarjeta-precio-descuento">{descuentoDecimal}% de descuento</p>
            )}
            {descuentoDecimal > 0 && (
                <p className="tarjeta-precio-original">${precio}</p>
            )}
            <p className="tarjeta-precio">
                {descuentoDecimal > 0 ? (
                    <span>
                        <del>${precio}</del> ${precioConDescuento.toFixed(2)}
                    </span>
                ) : (
                    `$${precioConDescuento.toFixed(2)}`
                )}
            </p>
            {accesoPermitido && <DeleteButton id={botonEliminar} />}
            {accesoPermitido && <EditButton id={botonEditar} />}
            <Link to={`/${verMas}/detalles-del-producto`}>
                <button type='button' className="boton-agregar boton-verMas">Ver Mas</button>
            </Link>
        </div>
    </div>
    );
};