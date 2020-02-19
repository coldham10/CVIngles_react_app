import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { IoIosArrowDown } from 'react-icons/io';

function Home() {
    return (
        <>
        <Container fluid className="m-0 p-0 ">
        <Carousel className="mb-0 pb-0" pauseOnHover={false} interval={6000} indicators={false} controls={false}>
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
                    <h3 className="carousel-subtitle">Deja que su próximo empleador vea lo mejor de usted</h3>
                    <br />
                    <IoIosArrowDown className="scroll-indicator"/>
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
                    <h3 className="carousel-subtitle">Su hoja de vida revisada por un profesional nativo agloparlante</h3>
                    <br />
                    <IoIosArrowDown className="scroll-indicator"/>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
        </Container>
        <Container className="my-3 p-3" id="servicios">
        <h1 className="my-3">Que hacemos?</h1>
        <p className="p-2">
        Incluso si usted ha trabajado en inglés durante años y habla muy bien, aún escribir como nativo angloparlante queda muy dificil.
        Perceptiblemente no nativo, y no acostumbrado a las costubres angloparlantes de escribir CVs o résumés, muchas veces empleadores <strong>no ven quien es usted, sino solo que es extranjero</strong>.
        </p>
        <p className="p-2">
        Nuestro <strong>equipo de editores nativos angloparlantes</strong> puede modificar su hoja de vida para decir lo que quiere como si fuera inglés su idioma primera.
        Si no esta comodo o tienes un sentido dificil traducir a inglés, también tenemos hispanohablantes bilingües que pueden trabajar mano a mano con nuestros editores para traducir y refinar exactamente que quiere decir.
        </p>
        <p className="p-2">
        Además con nuestro servicio Profesional, asignamos un editor personal a usted para revisar la estructra de su CV, enfocarlo en sus habilidades mas importantes, y hablamos con usted hasta que juntos hemos hecho <strong>una hoja de vida que muestra lo mejor que tiene a su proximo empleador</strong>.
        </p>
        </Container>

        <Container fluid className="m-0 main-c2">
        <Container className="mt-3 p-3 ">
        <h1 className="my-3">Nuestros opciones</h1>

        <Container className="py-3 px-1">
        <Card bg="light">
            <Card.Header>
                <h4 className="p-1">Profesional</h4>
            </Card.Header>
            <Card.Body>
                <p className="p-2 pt-md-3">
                Un inversión en su carrera y en usted mismo, este opcion es nuestro servicio premium.
                </p>
                <p className="p-2">
                Subimos su hoja de vida a la primera de la pila con cambios que muestran <strong>no solo que ha hecho, sino también cuales habilidades especiales tiene</strong>.
                Epitomamos los detalles mas importantes a empleadores en su región elegida y conversamos con usted para muestrar al mundo todo lo que puede hacer.
                </p>
                <p className="p-2">
                <strong>Incluye también formato Impesionante y el servicio Nativo.</strong>
                </p>
                <Button variant="secondary" href="/empiece">Empiece</Button>
            </Card.Body>
        </Card>
        </Container>

        <Container className="py-3 px-1">
        <Card bg="light">
            <Card.Header>
                <h4 className="p-1">Nativo</h4>
            </Card.Header>
            <Card.Body>
                <p className="p-2 pt-md-3">
                Nuestro equipo de editores nativos angloparlantes modifica su hoja de vida hasta que el inglés está fluido y nativo.
                Con este servicio <strong>eliminamos toda la evidencia que no es angloparlante nativo</strong> sin cambiar que quieres decir.
                </p>
                <p className="p-2">
                Si eliges que traduzcamos su CV, necesita este servicio o el servicio Profesional.
                </p>
                <p className="p-2">
                <strong>Incluye también formato Impesionante.</strong>
                </p>
                <Button variant="secondary" href="/empiece">Empiece</Button>
            </Card.Body>
        </Card>
        </Container>

        <Container className="py-3 px-1">
        <Card bg="light">
            <Card.Header>
                <h4 className="p-1 pt-2">Impresionante</h4>
            </Card.Header>
            <Card.Body>
                <p className="p-2 pt-md-3">
                    Formato profesional y impresionante de su hoja de vida, con opciones de estilo y color. Resulta en un PDF de alta calidad.
                </p>
                <p className="p-2">
                    No areglamos problemas de gramatica y fluidez.
                </p>
                <p className="p-2">
                    <Button variant="secondary" href="/empiece">Empiece</Button>
                </p>
            </Card.Body>
        </Card>
        </Container>

        <Container className="py-3 px-1">
        <Card bg="light">
            <Card.Header>
                <h4 className="p-1 pt-2">Otros Servicios</h4>
            </Card.Header>
            <Card.Body>
                <p className="p-2 pt-md-3">
                    Si prefiere escrbir en español, podemos traducir su hoja de vida a inglés por un cargo adicional con los servcios Nativo y Profesional. 
                </p>
                <p className="p-2">
                    <Button variant="secondary" href="/empiece">Empiece</Button>
                </p>
                <p className="p-2">
                    Todos nuestros servicios puden ser aplicados a una carta de presentacion también, cargado por palabra.
                </p>
                <p className="p-2">
                    <Button variant="secondary" href="/empiece">Empiece</Button>
                </p>
            </Card.Body>
        </Card>
        </Container>

        </Container>
        </Container>
        </>
    );
    /*TODO: third card = Impresionante with sample CVs*/
}

        //
export default Home;
