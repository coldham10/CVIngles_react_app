import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';

function Home() {
    return (
        <>
        <Container fluid className="mx-0 px-0 ">
        <Carousel className>
        <Carousel.Item>
        <Image
           className="vh-100 carousel-image"
           src="suit-pro.jpg"
           alt="First slide"
        />
        <h1>Test</h1>
        <Carousel.Caption>
        <h3>Deja que su próximo empleador vea lo mejor de usted</h3>
        </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
        </Container>
        <Container>
        <p>Lorem ipsum</p>
        <p>Lorem ipsum</p>
        </Container>
        </>
    );
    // hojas de vida revistas por angloparlantes nativos y profesionales
}

        //<h3>Su hoja de vida revista por un profesional editor nativo agloparlante</h3>
export default Home;
