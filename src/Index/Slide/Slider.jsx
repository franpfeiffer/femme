import React from 'react';
import { Carousel } from 'react-bootstrap';
const Slider = () => {

    return (
        <Carousel controls={false} indicators={false}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="https://assets.dev-filo.dift.io/img/2019/04/15/neo_re.jpg"
                    alt="First slide"
                />
                <Carousel.Caption>
                    <h3>Slide 1</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="URL_DE_LA_IMAGEN_2"
                    alt="Second slide"
                />
                <Carousel.Caption>
                    <h3>Slide 2</h3>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src="URL_DE_LA_IMAGEN_3"
                    alt="Third slide"
                />
                <Carousel.Caption>
                    <h3>Slide 3</h3>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Slider;

