import { useEffect, useState } from 'react';
import { ProductosContext } from './ProductoContext';

export const ProductosProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await fetch('http://localhost:3000/productos', { method: 'GET' });
                if (!response.ok) {
                    throw new Error(`Fetch failed with status ${response.status}`);
                }
                const data = await response.json();
                setProductos(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching productos:', error);
            }
        };

        fetchProductos();
    }, []);

    return (
        <ProductosContext.Provider value={{ productos }}>
            {children}
        </ProductosContext.Provider>
    );
};
