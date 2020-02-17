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
        <Container fluid className="m-0 p-0 ">
        <Carousel className="mb-0 pb-0" pauseOnHover={false} number={4000}>
            <Carousel.Item className="mb-0 pb-0">
                <Card style={{border: 'none'}}>
                    <Card.Body className="py-0 overflow-hidden">
                        <Image as={Card.Image}
                           className="vh-100 carousel-image"
                           src="suit-pro.jpg"
                        />
                        <Card.ImgOverlay className="mb-0 pb-0">
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
            <Carousel.Item className="mb-0 pb-0">
                <Card style={{border: 'none'}}>
                    <Card.Body className="py-0 overflow-hidden">
                        <Image as={Card.Image}
                           className="vh-100 carousel-image"
                           src="dark-english.jpg"
                        />
                        <Card.ImgOverlay className="mb-0 pb-0">
                            <Card.Title className="text-center">
                            <h1 className="overlay-h1">Nativo</h1>
                            </Card.Title>
                        </Card.ImgOverlay>
                    </Card.Body>
                </Card>
                <Carousel.Caption>
                    <h3>Su hoja de vida revisada por un profesional nativo agloparlante</h3>
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
    /*TODO: third card = Impresionante with sample CVs*/
}

        //
export default Home;
