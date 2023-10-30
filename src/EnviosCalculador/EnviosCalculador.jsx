/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ListGroup, Button, Form, Col, Row, FormGroup, FormControl, Container } from 'react-bootstrap';

export const EnviosCalculador = ({ onPrecioEnvioChange, onCodigoPostalChange }) => {
    const provincias = [
        { iso: "AR-A", provincia: "Salta" },
        { iso: "AR-B", provincia: "Provincia de Buenos Aires" },
        { iso: "AR-C", provincia: "Ciudad Autónoma de Buenos Aires" },
        { iso: "AR-D", provincia: "San Luis" },
        { iso: "AR-E", provincia: "Entre Ríos" },
        { iso: "AR-F", provincia: "La Rioja" },
        { iso: "AR-G", provincia: "Santiago del Estero" },
        { iso: "AR-H", provincia: "Chaco" },
        { iso: "AR-J", provincia: "San Juan" },
        { iso: "AR-K", provincia: "Catamarca" },
        { iso: "AR-L", provincia: "La Pampa" },
        { iso: "AR-M", provincia: "Mendoza" },
        { iso: "AR-N", provincia: "Misiones" },
        { iso: "AR-P", provincia: "Formosa" },
        { iso: "AR-Q", provincia: "Neuquén" },
        { iso: "AR-R", provincia: "Río Negro" },
        { iso: "AR-S", provincia: "Santa Fe" },
        { iso: "AR-T", provincia: "Tucumán" },
        { iso: "AR-U", provincia: "Chubut" },
        { iso: "AR-V", provincia: "Tierra del Fuego" },
        { iso: "AR-W", provincia: "Corrientes" },
        { iso: "AR-X", provincia: "Córdoba" },
        { iso: "AR-Y", provincia: "Jujuy" },
        { iso: "AR-Z", provincia: "Santa Cruz" }
    ];
    const [iso, setIso] = useState('');
    const [precios, setPecios] = useState([])
    const [codigoPostal, setCodigoPostal] = useState('')
    const [hayprecio, sethayprecio] = useState(false)

    const handleCodigoPostalChange = (event) => {
        setCodigoPostal(event.target.value);
    };

    const handleProvinciaChange = (event) => {
        setIso(event.target.value);
    };

    useEffect(() => {
        const fetchProvincias = async () => {
            try {
                const response = await fetch(`https://correo-argentino1.p.rapidapi.com/calcularPrecio?cpOrigen=3000&cpDestino=${codigoPostal}&provinciaOrigen=AR-S&provinciaDestino=${iso}&peso=1`,
                    {
                        method: 'GET',
                        headers: {
                            'X-RapidAPI-Key': '44d756538bmsh90ecb2cbff6716ap1553a0jsnf988510cdd30',
                            'X-RapidAPI-Host': 'correo-argentino1.p.rapidapi.com'
                        }
                    }
                )
                const data = await response.json();
                if (data.error) {
                    console.log(data);
                } else {
                    console.log(data);
                    sethayprecio(true)
                    setPecios(data)
                    onPrecioEnvioChange(data.paqarClasico.aDomicilio);
                    onCodigoPostalChange(codigoPostal);
                }
            } catch (error) {
                console.error('Error fetching provincias:', error);
            }
        }
        fetchProvincias()
    }, [codigoPostal, iso, onPrecioEnvioChange, onCodigoPostalChange])
    return (
        <>
            <FormGroup className="mb-3">
                <FormControl type="number" value={codigoPostal} onChange={handleCodigoPostalChange} name='codigo_postal' placeholder='Codigo Postal' />
                <Form.Control as="select" value={iso} onChange={handleProvinciaChange}>
                    <option value="">Selecciona una provincia</option>
                    {provincias.map(provincia => (
                        <option key={provincia.iso} value={provincia.iso}>
                            {provincia.provincia}
                        </option>
                    ))}
                </Form.Control>
                {precios && hayprecio ? (
                    <div>
                        <p>${precios.paqarClasico.aDomicilio}</p>
                    </div>
                ) : null
                }
            </FormGroup>
        </>
    )
}
