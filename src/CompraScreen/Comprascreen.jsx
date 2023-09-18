import { useContext, useEffect, useState } from "react"
import { Card } from '../Card/Card';
import { ProductosContext } from "../context/ProductoContext";
import { ProductosProvider } from "../context/ProductosProvider";
import { CarritoContext } from "../context/CarritoContext";

export const Comprascreen = () => {

    const { productos } = useContext( ProductosContext )

    const { agregarCompra, eliminarCompra } = useContext(CarritoContext)

    const handleAgregar = (compra) =>{
      agregarCompra(compra)
    }
    const handleQuitar = (id) =>{
      eliminarCompra(id)
    }

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
  
    const handleMinPriceChange = (event) => {
      setMinPrice(event.target.value);
    };
  
    const handleMaxPriceChange = (event) => {
      setMaxPrice(event.target.value);
    };
  
    const handlePriceFilter = () => {
      console.log('Filter products between', minPrice, 'and', maxPrice);
    };


    return(

<div className="containerProductos">
      <aside className="filters">
        <h2>Categorias</h2>
        <ul>
          <li>Corsets</li>
          <li>Lenceria</li>
          <li>Linea MESH</li>
          <li>Sleepwear</li>
          <li>Basicos</li>
          <li>Bikinis</li>
          <button className="vermasBoton">Ver Mas</button>
        </ul>
        <h2>Filtros</h2>
        <h3>Talles</h3>
        <ul>
          <li><input type="checkbox" /> 85</li>
          <li><input type="checkbox" /> 90</li>
          <li><input type="checkbox" /> 95</li>
          <li><input type="checkbox" /> 100</li>
          <li><input type="checkbox" /> 110</li>
          <button className="vermasBoton">Ver Mas</button>
        </ul>
        <h3>Colores</h3>
        <ul>
          <li><input type="checkbox" /> Azul</li>
          <li><input type="checkbox" /> Blanco</li>
          <li><input type="checkbox" /> Celeste</li>
          <li><input type="checkbox" /> Crudo</li>
          <li><input type="checkbox" /> Gris</li>
          <li><input type="checkbox" /> Hueso</li>
          <li><input type="checkbox" /> Negro</li>
          <li><input type="checkbox" /> Rojo</li>
          <button className="vermasBoton">Ver Mas</button>
        </ul>
        <h3>Precios</h3>
        <ul>
          <li><input type="checkbox" /> 1000</li>
          <li><input type="checkbox" /> 1500</li>
          <li><input type="checkbox" /> 2000</li>
          <li><input type="checkbox" /> 2500</li>
          <li><input type="checkbox" /> 3000</li>
          <li><input type="checkbox" /> 4000</li>
          <li><input type="checkbox" /> 5000</li>
          <li><input type="checkbox" /> 6000</li>
        </ul>
        <div className="price-filter">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <br />
          <button className='apply-button' onClick={handlePriceFilter}>Aplicar</button>
        </div>
      </aside>
      <div className="productos-container">
      {productos.map(producto => (
        <Card 
        key={producto.id}
        imagen={producto.image}
        titulo={producto.title}
        descripcion={producto.description}
        precio={producto.price}
        handleAgregar={() => handleAgregar(producto)}
        handleQuitar={() => handleQuitar(producto.id)}
        >

        </Card>
    ))}
    </div>
</div>

    )
}