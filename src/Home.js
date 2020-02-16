import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';

function Home() {
    return (
        <>
        <Container fluid className="mx-0 px-0 ">
        <Carousel className>
        <Carousel.Item>
        <Card>
        <Card.Body className="pt-0">
        <Image as={Card.Image}
           className="vh-100 carousel-image"
           src="suit-pro.jpg"
           alt="First slide"
        />
        <Card.ImgOverlay>
            <Card.Title className="text-center">
            <h1 className="overlay-h1">Profesional</h1>
            </Card.Title>
        </Card.ImgOverlay>
        </Card.Body>
        </Card>
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
