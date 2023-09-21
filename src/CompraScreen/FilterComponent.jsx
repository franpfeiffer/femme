/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import CategoriaComponent from "../Fetchs/Categoria";
import TalleComponent from "../Fetchs/Talles";
import ColoresComponent from "../Fetchs/Colores";

const FiltrosComponent = ({ onFilterChange }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [colorSeleccionado, setColorSeleccionado] = useState(null);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(null);
    const [talleSeleccionado, setTalleSeleccionado] = useState(null);

    const handleTalleChange = (selectedTalle) => {
        setTalleSeleccionado(selectedTalle);
    };
    const handleColorChange = (selectedColor) => {
        setColorSeleccionado(selectedColor);
        console.log(selectedColor);
    };
    const handleCategoriaChange = (selectedCategoria) => {
        setCategoriaSeleccionada(selectedCategoria);
    };

    const handleMinPriceChange = (event) => {
        if (event.target.value < 0) return;
        setMinPrice(event.target.value);
    };

    const handleMaxPriceChange = (event) => {
        if (event.target.value < 0) return;
        setMaxPrice(event.target.value);
    };

    const handlePriceFilter = () => {
        console.log('Filter products between', minPrice, 'and', maxPrice);
    };

    const handleForm = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/filtrado/filtros?categoria=${categoriaSeleccionada}&precio=${minPrice}-${maxPrice}&talles=${talleSeleccionado}&colores=${colorSeleccionado}`, { method: 'GET' });
            const data = await response.json();
            console.log(data);
            onFilterChange(data);
        } catch (err) {
            console.log(err);
        }
    }



    return (
        <div className="filters">
            <form onSubmit={handleForm}>

                <h2>Filtros</h2>
                <h2>Categorias</h2>
                <CategoriaComponent onCategoriaChange={handleCategoriaChange} />
                <h3>Talles</h3>
                <TalleComponent onTalleChange={handleTalleChange} />
                <h3>Colores</h3>
                <ColoresComponent onColorChange={handleColorChange} />
                <h3>Precios</h3>
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
            </form>
        </div>

    );
};

export default FiltrosComponent;
