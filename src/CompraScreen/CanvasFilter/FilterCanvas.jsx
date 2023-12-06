import { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";

const FilterCanvas = ({ productosOriginales, setProductosFiltrados }) => {
    const [filtroPrecio, setFiltroPrecio] = useState(0);
    const [filtroColor, setFiltroColor] = useState(null);
    const [showCanvas, setShowCanvas] = useState(false);
    const [precioMaximoEncontrado, setPrecioMaximoEncontrado] = useState(0);

    // Obtiene el precio máximo entre los productos originales
    useEffect(() => {
        const preciosProductos = productosOriginales.map(producto => parseFloat(producto.precio));
        const precioMaximo = Math.max(...preciosProductos);
        setPrecioMaximoEncontrado(precioMaximo);
    }, [productosOriginales]);

    useEffect(() => {
        const productosFiltrados = productosOriginales.filter(producto => {
            const pasaFiltroPrecio = producto.precio >= filtroPrecio;
            const pasaFiltroColor = filtroColor ?
                producto.prod_colores_talle.some(item => item.colore.nombre === filtroColor) :
                true;

            return pasaFiltroPrecio && pasaFiltroColor;
        });

        setProductosFiltrados(productosFiltrados);
    }, [productosOriginales, filtroPrecio, filtroColor, setProductosFiltrados]);

    const coloresDisponibles = ["Red", "Blue", "Green", "Yellow"];

    const handleClose = () => setShowCanvas(false);
    const handleShow = () => setShowCanvas(true);
    const handleReset = () => {
        // Restablecer los valores de filtro a sus valores iniciales
        setFiltroPrecio(0);
        setFiltroColor(null);
    };

    return (
        <>
            <Button className="filter-button" onClick={handleShow}>
                <i className="fa-solid fa-filter"></i>
            </Button>

            <Offcanvas show={showCanvas} onHide={handleClose} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filtros</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Form>
                        {/* Controles para filtrar por precio */}
                        <Form.Group controlId="formPrecio">
                            <Form.Label>Precio minimo: ${filtroPrecio}</Form.Label>
                            <Form.Control
                                type="range"
                                min={0}
                                max={precioMaximoEncontrado}
                                value={filtroPrecio}
                                onChange={(e) => setFiltroPrecio(Number(e.target.value))}
                            />
                        </Form.Group>

                        {/* Botones para filtrar por color */}
                        <Form.Group controlId="formColor">
                            <Form.Label>Color</Form.Label>
                            {coloresDisponibles.map((color, index) => (
                                <Form.Check
                                    key={index}
                                    type="radio"
                                    label={color}
                                    name="colorRadios"
                                    checked={filtroColor === color}
                                    onChange={() => setFiltroColor(color)}
                                />
                            ))}
                            <Form.Check
                                type="radio"
                                label="Todos"
                                name="colorRadios"
                                checked={filtroColor === null}
                                onChange={() => setFiltroColor(null)}
                            />
                        </Form.Group>
                        <Button variant="secondary" onClick={handleReset}>
                            <i className="fa-solid fa-rotate-right"></i>
                        </Button>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};

export default FilterCanvas;
