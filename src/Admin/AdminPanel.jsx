import { useState, useEffect } from "react";


import { ListProd } from "./listadoProd/ListProd";
import useAuthorization from './HooksAdmin/useAuthorization';
import { Offcanvas, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { data } from "autoprefixer";

export const AdminPanel = () => {
    const accesoPermitido = useAuthorization();
    const [productos, setProductos] = useState([]);
    const [stock, setStockTotals] = useState([]);
    const [showOnlyWithStock, setShowOnlyWithStock] = useState(false);
    const [activo, setActivo] = useState([])
    useEffect(() => {
        const fetchProds = async () => {
            try {
                const responseProductos = await fetch('https://api-femme.onrender.com/productos/', { method: 'GET' });
                if (!responseProductos.ok) {
                    throw new Error(`Fetch productos failed with status ${responseProductos.status}`);
                }
                const dataProductos = await responseProductos.json();
                setProductos(dataProductos);

                const responseStock = await fetch('https://api-femme.onrender.com/productos/stock', { method: 'GET' });
                if (!responseStock.ok) {
                    throw new Error(`Fetch stock failed with status ${responseStock.status}`);
                }
                const dataStock = await responseStock.json();
                const stockTotals = {};

                dataProductos.forEach(producto => {
                    const { id: productoId } = producto;
                    const productoStock = dataStock.filter(item => item.productoId === productoId);
                    const totalStock = productoStock.reduce((total, item) => total + item.stock, 0);
                    stockTotals[productoId] = totalStock;
                });
                const nuevosActivos = dataProductos.map(producto => producto.activo);
                setActivo(nuevosActivos);

                setStockTotals(stockTotals);
            } catch (error) {
                console.error('Error fetching ', error);
            }
        }
        fetchProds()
    }, [])

    const handleButtonTrue = () => {
        if (showOnlyWithStock == false) {
            setShowOnlyWithStock(true);
        } else {
            setShowOnlyWithStock(false);
        }

    };

    const filteredProductos = showOnlyWithStock
        ? productos.filter(producto => stock[producto.id] > 0)
        : productos;

    const [showOffcanvas, setShowOffcanvas] = useState(false);

    const handleClose = () => setShowOffcanvas(false);
    const handleShow = () => setShowOffcanvas(true);
    if (!accesoPermitido) {
        return 'No autorizado';
    }
    return (
        <div>
            <h2>Admin Panel</h2>
            <Button variant="dark" className="text-white" onClick={handleShow}>
                Mostrar Menú
            </Button>
            <Offcanvas show={showOffcanvas} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menú</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ul>
                        <li><Link to="/create">
                            <Button variant="dark" className="text-white boton-agregar">CREAR PRODUCTO  </Button>
                        </Link></li>
                        <li><Link to="/crearcategoria">
                            <Button variant="dark" className="text-white boton-agregar">CREAR CATEGORIA</Button>
                        </Link></li>
                        <li><Link to="/crearcolores">
                            <Button variant="dark" className="text-white boton-agregar">CREAR COLORES</Button>
                        </Link></li>
                        <li> <Link to="/crearmarca">
                            <Button variant="dark" className="text-white boton-agregar">CREAR MARCAS</Button>
                        </Link></li>
                        <li> <Link to="/creartalles">
                            <Button variant="dark" className="text-white boton-agregar">CREAR TALLES</Button>
                        </Link></li>
                        <li>  <Link to="/editStock">
                            <Button variant="dark" className="text-white boton-agregar">Editar Stock</Button>
                        </Link></li>
                        <li><Link to="/facturacionPage">
                            <Button variant="dark" className="text-white boton-agregar">Envios</Button>
                        </Link></li>
                        <li><Link to="/estadisticas">
                            <Button variant="dark" className="text-white boton-agregar">Estadisticas</Button>
                        </Link></li>
                        <li><Link to="/registerAdmin">
                            <Button variant="dark" className="text-white boton-agregar">Registrar Nueva Sucursal</Button>
                        </Link></li>
                    </ul>
                </Offcanvas.Body>
            </Offcanvas>

            <button className="boton-agregar" onClick={handleButtonTrue}>
                {showOnlyWithStock ?
                    'todos los productos' :
                    'mostrar los prod con stock'
                }
            </button>
            <ListProd
                productos={filteredProductos}
                stockTotals={stock}
                activo={activo}
            />
        </div>
    );
};
