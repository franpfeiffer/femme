import { useState, useEffect } from "react";
import '../admin.css'
import { ListProd } from "./listadoProd/ListProd";
import useAuthorization from './HooksAdmin/useAuthorization';
import { Link } from "react-router-dom";
export const AdminPanel = () => {
    const accesoPermitido = useAuthorization();
    const [productos, setProductos] = useState([]);
    const [stock, setStockTotals] = useState([]);
    const [showOnlyWithStock, setShowOnlyWithStock] = useState(false);
    useEffect(() => {
        const fetchProds = async () => {
            try {
                const responseProductos = await fetch('http://localhost:3000/productos/', { method: 'GET' });
                if (!responseProductos.ok) {
                    throw new Error(`Fetch productos failed with status ${responseProductos.status}`);
                }
                const dataProductos = await responseProductos.json();
                setProductos(dataProductos);

                const responseStock = await fetch('http://localhost:3000/productos/stock', { method: 'GET' });
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


    if (!accesoPermitido) {
        return 'No autorizado';
    }

    return (
        <div>
            <h2>Admin Panel</h2>
            <Link to="/create">
                <button className="boton-agregar">CREAR PRODUCTO  </button>
            </Link>
            <Link to="/crearcategoria">
                <button className="boton-agregar">CREAR CATEGORIA</button>
            </Link>
            <Link to="/crearcolores">
                <button className="boton-agregar">CREAR COLORES</button>
            </Link>
            <Link to="/crearmarca">
                <button className="boton-agregar">CREAR MARCAS</button>
            </Link>
            <Link to="/creartalles">
                <button className="boton-agregar">CREAR TALLES</button>
            </Link>
            <Link to="/editStock">
                <button className="boton-agregar">Editar Stock</button>
            </Link>
            <Link to="/facturacionPage">
                <button className="boton-agregar">Facturacion Page</button>
            </Link>
            <button className="boton-agregar" onClick={handleButtonTrue}>
                {showOnlyWithStock ?
                    'todos los productos' :
                    'mostrar los prod con stock'
                }
            </button>
            <ListProd
                productos={filteredProductos}
                stockTotals={stock}
            />
        </div>
    );
};
