/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuthorization from '../HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
export const FacturacionPage = () => {
    const accesoPermitido = useAuthorization();

    if (!accesoPermitido) {
        return 'No autorizado';
    }
    return (
        <>
            <Link to='/compradorAdd'>
                <button className="boton-agregar">Facturacion Manual</button>
            </Link>
        </>



    )
}
