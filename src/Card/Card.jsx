import { useState, useEffect } from "react";
import "../card.css";
import { Link } from "react-router-dom";
export const Card = ({ nombre, precio, descuento, imagen, verMas, botonEliminar, botonEditar }) => {
    const [precioDecimal, setPrecioDecimal] = useState(parseFloat(precio));
    const [descuentoDecimal, setDescuentoDecimal] = useState(parseFloat(descuento));
    const [precioConDescuento, setPrecioConDescuento] = useState(precioDecimal);
    const [nombreAcortado, setNombreAcortado] = useState(nombre);

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
    useEffect(() => {
        const maxLength = 14; // Define la longitud máxima del nombre
        if (nombre.length > maxLength) {
            setNombreAcortado(`${nombre.substring(0, maxLength)}...`);
        }
    }, [nombre]);

    return (

        <div className="product-box">
            <Link to={`/${verMas}/detalles-del-producto`} className="link-product-box">
                <img src={`https://api-femme.onrender.com/${imagen}`} alt={nombre} className="product-img" />
                <h2 className="product-title">{nombreAcortado}</h2>
                {descuentoDecimal > 0 ? (
                    <>
                        <span className="tarjeta-precio-original price">${precio}</span>
                        <span className="price price-con-descuento">${precioConDescuento.toFixed(2)}</span>
                    </>
                ) : (
                    <span className="price">${precioConDescuento.toFixed(2)}</span>
                )}
                <br />

            </Link>
        </div >

    );
};