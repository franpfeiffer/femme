/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import useAuthorization from '../HooksAdmin/useAuthorization';
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import TablaProductosNoEntregados from "./TablaFacturacion/TablaProductosNoEntregados";
export const FacturacionPage = () => {
    const accesoPermitido = useAuthorization();
    const [facturas, setFacturas] = useState([]);
    const token = localStorage.getItem('token');

    const handleDataFetched = data => {
        setFacturas(data);
    };
    useEffect(() => {
        const fetchEntregas = async () => {
            try {
                const response = await fetch('http://localhost:3000/facturacion/list', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const responseData = await response.json();
                const facturasNoEntregadas = responseData.filter(factura => !factura.entregado);
                setFacturas(facturasNoEntregadas);

            } catch (error) {
                console.error('Error de red:', error);
            }
        };
        fetchEntregas();
    }, [token]);
    const onEntregaClick = async (idFactura) => {
        const confirmacion = window.confirm("¿Estás seguro de marcar como entregado?");
    
        if (confirmacion) {
            try {
                const response = await fetch(`http://localhost:3000/facturacion/entregado/${idFactura}`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
    
                if (response.ok) {
                    setFacturas((prevFacturas) => prevFacturas.filter(factura => factura.id !== idFactura));
                } else {
                    console.error('Error al marcar como entregado');
                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        }
    };

    if (!accesoPermitido) {
        return 'No autorizado';
    }
    return (
        <>
            <Link to='/compradorAdd'>
                <button className="boton-agregar">Facturacion Manual</button>
            </Link>
            <div className="envios-page">
                <TablaProductosNoEntregados facturasNoEntregadas={facturas} onEntregaClick={onEntregaClick}/>
            </div>

        </>



    )
}
