/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import CategoriaComponent from "../Fetchs/Categoria";
import TalleComponent from "../Fetchs/Talles";
import ColoresComponent from "../Fetchs/Colores";
import { Form, Button, Row, Col } from 'react-bootstrap';
const FiltrosComponent = ({ onFilterChange }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);
    const [colorSeleccionado, setColorSeleccionado] = useState('');
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
    const [talleSeleccionado, setTalleSeleccionado] = useState('');

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
            <h2>Filtros</h2>
            <Form onSubmit={handleForm}>
                <h2>Categorias</h2>
                <CategoriaComponent onCategoriaChange={handleCategoriaChange} />
                <h3>Talles</h3>
                <TalleComponent onTalleChange={handleTalleChange} />
                <h3>Colores</h3>
                <ColoresComponent onColorChange={handleColorChange} />
                <h3>Precios</h3>
                <Row className="align-items-center">
                    <Col xs="auto">
                        <Form.Control type="number" placeholder="Min" value={minPrice} onChange={handleMinPriceChange} />
                    </Col>
                    <Col xs="auto">
                        <Form.Control type="number" placeholder="Max" value={maxPrice} onChange={handleMaxPriceChange} />
                    </Col>
                    <Col xs="auto">
                        <Button type="submit" variant="primary" className="apply-button">Aplicar</Button>
                    </Col>
                </Row>
            </Form>
        </div>

    );
};

export default FiltrosComponent;
