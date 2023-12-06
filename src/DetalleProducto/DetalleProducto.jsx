/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { CarritoContext } from '../context/CarritoContext';
import { Color } from 'three';
import '../detalle-produ.css'
import { Container, Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import { WhatsAppButton } from '../WhatsAppLogo/WhatsAppLogo';
import { DeleteButton } from './buttons/DeleteImage';
import useAuthorization from '../Admin/HooksAdmin/useAuthorization';
import { DeleteProdButton } from '../Card/Buttons/DeleteButton';
import { EditButton } from '../Card/Buttons/EditButton';
export const DetalleProducto = () => {
    const accesoPermitido = useAuthorization();
    const [added, setAdded] = useState(false);
    const [producto, setProductos] = useState([]);
    const [imagene, setImagene] = useState([]);
    const [prod_colores_talle, setProd_colores_talle] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[1];
    const { agregarCompra, eliminarCompra, aumentarCantidad } = useContext(CarritoContext);
    const [amount, setAmount] = useState(1);
    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [talleSeleccionado, setTalleSeleccionado] = useState(null);
    const [imagenSeleccionada, setImagenSeleccionada] = useState(imagene.length > 0 ? imagene[0].url : null);
    const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false);
    const [precioDecimal, setPrecioDecimal] = useState(parseFloat(producto.precio));
    const [descuentoDecimal, setDescuentoDecimal] = useState(parseFloat(producto.descuento));
    const [precioConDescuento, setPrecioConDescuento] = useState(precioDecimal);
    const [mostrarAdvertenciaStock, setMostrarAdvertenciaStock] = useState(false);

    useEffect(() => {
        setPrecioDecimal(parseFloat(producto.precio));
        setDescuentoDecimal(parseFloat(producto.descuento ?? 0));
    }, [producto]);

    useEffect(() => {
        if (descuentoDecimal > 0) {
            const descuentoAplicado = (descuentoDecimal / 100) * precioDecimal;
            setPrecioConDescuento(precioDecimal - descuentoAplicado);
        } else {
            setPrecioConDescuento(precioDecimal);
        }
    }, [precioDecimal, descuentoDecimal]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch(`https://api-femme.onrender.com/productos/${id}`, { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                const filteredProdColoresTalle = data.prod_colores_talle.filter(
                    (item) => item.adminUserId === 3
                );
                setProd_colores_talle(filteredProdColoresTalle);
                setProductos(data);
                setImagene(data.imagene);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };
        fetchProductos();
    }, [id]);

    const handleAgregar = (compra) => {
        agregarCompra(compra);
        setAdded(true);
    }

    const handleQuitar = (id) => {
        eliminarCompra(id)
        setAdded(false);
    }
    const handleThumbnailClick = (url) => {
        setImagenSeleccionada(url);
    };
    const handleColorSeleccionado = (colorId) => {
        console.log('Color seleccionado:', colorId);
        setColorSeleccionado(colorId);
    };

    // En el evento de selección de talle
    const handleTalleSeleccionado = (talleId) => {
        setTalleSeleccionado(talleId);
    };

    const coloresUnicos = prod_colores_talle.filter((colorTalle, index, self) =>
        index === self.findIndex((t) => t.colore.id === colorTalle.colore.id)
    );
    const tallesUnicos = prod_colores_talle.filter((colorTalle, index, self) =>
        index === self.findIndex((t) => t.talle.id === colorTalle.talle.id)
    );
    return (
        <Container className="mt-5">
            <Row className="details">
                <Col lg={5} md={6}>
                    <div className="big-img">
                        {imagenSeleccionada ? (
                            <img src={`https://api-femme.onrender.com/${imagenSeleccionada}`} alt={producto.nombre} />
                        ) : imagene.length > 0 ? (
                            <img src={`https://api-femme.onrender.com/${imagene[0].url}`} alt={producto.nombre} />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                    </div>
                    <div className="thumb d-flex">
                        {imagene.map((img) => (
                            <React.Fragment key={img.id}>
                                <img
                                    src={`https://api-femme.onrender.com/${img.url}`}
                                    alt=""
                                    className={img.url === imagenSeleccionada ? 'active' : ''}
                                    onClick={() => handleThumbnailClick(img.url)}
                                />
                                <DeleteButton id={img.id} />
                            </React.Fragment>
                        ))}
                    </div>
                </Col>
                <Col lg={7} md={6}>
                    <div className="box">
                        <Row>
                            <h2 className="text-uppercase">{producto.nombre}</h2>
                            {descuentoDecimal > 0 ? (<span className="text-success">${precioConDescuento.toFixed(2)}</span>) :
                                (<span className="text-success">${producto.precio}</span>)}

                            {descuentoDecimal > 0 && (
                                <span className="text-success ml-2">
                                    {descuentoDecimal}% OFF
                                </span>
                            )}
                            {descuentoDecimal > 0 && (
                                <span className="text-danger mr-2">
                                    Precio Original: ${producto.precio}
                                </span>
                            )}
                        </Row>
                        <div className="colors">
                            <ButtonGroup>

                                {coloresUnicos.map((colorTalle) => (
                                    <Button
                                        className={colorTalle.colore.id === colorSeleccionado ? 'selected-color' : ''}
                                        key={colorTalle.id}
                                        style={{ background: colorTalle.colore.nombre }}
                                        onClick={() => {
                                            handleColorSeleccionado(colorTalle.colore.id);
                                            handleTalleSeleccionado(null);
                                            setMostrarAdvertencia(false);
                                        }}
                                    >{colorTalle.colore.id === colorSeleccionado ? (<i className="fa-solid fa-check"></i>) : ''}</Button >
                                ))}
                            </ButtonGroup>
                        </div>
                        <div className='talles'>
                            <ButtonGroup>
                                {tallesUnicos.map(talle => (
                                    <Button
                                        className={
                                            talle.talle.id === talleSeleccionado && talle.stock > 0 ? 'button-talle selected' : 'button-talle'
                                        }
                                        key={talle.id}
                                        onClick={() => {
                                            handleTalleSeleccionado(talle.talle.id);
                                            const selectedColorTalle = prod_colores_talle.find(
                                                ct => ct.coloreId == colorSeleccionado && ct.talleId == talle.talle.id
                                            );

                                            if (selectedColorTalle && selectedColorTalle.stock > 0) {
                                                setMostrarAdvertenciaStock(false);
                                            } else {
                                                setMostrarAdvertenciaStock(true);
                                            }
                                        }}
                                        aria-disabled={
                                            (
                                                colorSeleccionado &&
                                                talle.talle.id == talleSeleccionado &&
                                                talle.stock > 0
                                            )
                                        }
                                    >
                                        {talle.talle.nombre}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>



                        <p>{producto.descripcion}</p>
                        {mostrarAdvertencia && <p className='seleccione-color'>Por favor, seleccione un color y un talle antes de agregar al carrito.</p>}
                        {mostrarAdvertenciaStock && <p className='nostock'><i className="fa-solid fa-triangle-exclamation"></i>NO HAY STOCK DE ESTE TALLE O COLOR QUE SELECCIONASTE<i className="fa-solid fa-triangle-exclamation"></i></p>}
                        {prod_colores_talle.length > 0 ? (
                            <button
                                type="button"
                                className="boton-agregar cart"
                                onClick={() => {
                                    if (colorSeleccionado && talleSeleccionado) {
                                        const selectedColorTalle = prod_colores_talle.find(
                                            ct => ct.colore.id == colorSeleccionado && ct.talle.id == talleSeleccionado
                                        );

                                        if (selectedColorTalle && selectedColorTalle.stock > 0) {
                                            setMostrarAdvertencia(false);
                                            agregarCompra(producto, colorSeleccionado, talleSeleccionado);
                                        } else {
                                            setMostrarAdvertencia(true);
                                        }
                                    } else {
                                        setMostrarAdvertencia(true);
                                    }
                                }}
                                disabled={mostrarAdvertencia || (added && !(colorSeleccionado && talleSeleccionado))}
                            >
                                {added ? 'Quitar del Carrito' : 'Agregar Carrito'}
                            </button>) : (
                            <button type="button" className="boton-agregar cart" disabled>
                                Sin Stock
                            </button>
                        )}
                        <br />
                        {accesoPermitido && <DeleteProdButton id={producto.id} />} <br />
                        {accesoPermitido && <EditButton id={producto.id} />}
                    </div>
                </Col>
            </Row>
            <WhatsAppButton />
        </Container>

    );
};
