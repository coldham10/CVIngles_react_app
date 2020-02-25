import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

class Choice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {'options': props.options};
        this.sendOptions = props.setOptions;
    }
    /*TODO: update state in such a way that disables excluded combos;
    * highlight selected with bg="primary"
    * Standardise height once all written out*/

    render() {
        return (
            <Container className="choice">
            <h1 className="py-2">Seleccione sus opciones</h1>
            <Container className="border rounded my-3 choice-group">
            <h3 className="pb-1 pt-3 px-2">Tipo de servicio</h3>
            <Row>
            <Col>
            <Card
                className={'mx-auto my-4'}
                style={{ width: '18rem' , height: '32rem', backgroundColor: (this.state.options.service === 'p' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'p'})})}
            >
                <Card.Img variant="top" src="./shrink-suit.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>De Lujo</Col><Col xs={4}>$40</Col></Row></Card.Title>
                    <Card.Text>
                        <p>
                        Perfeccionamos el contenido a mostrar sus habilidades, quitamos lo que no es necesario y consultamos con usted hasta que está perfecto.
                        </p>
                        <p>
                        <strong>Incluye dos revisiones, formato impesionante, edición de copia y traducción si es necesario.</strong>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '32rem', backgroundColor: (this.state.options.service === 'n' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'n'})})}
            >
                <Card.Img variant="top" src="./shrink-english.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>Traducción Profesional</Col><Col xs={4}>$20</Col></Row></Card.Title>
                    <Card.Text>
                        <p>
                        Su hoja de vida es traducido de español por nuestro equipo de hispanohablantes bilingües y luego editado por nuestro equipo angloparlante.
                        </p>
                        <p>
                        <strong>Incluye también formato impesionante y edición de copia.</strong>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '32rem', backgroundColor: (this.state.options.service === 'i' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'i'})})}
            >
                <Card.Img variant="top" src="./shrink-splash.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>Inglés Nativo</Col><Col xs={4}>$15</Col></Row></Card.Title>
                    <Card.Text>
                        <p>
                        Nuestro equipo de editores nativos angloparlantes modifica su hoja de vida hasta que el inglés está fluido y nativo.
                        </p>
                        <p>
                        <strong>Incluye también formato impesionante.</strong>
                        </p>
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
            </Container>

            <Container className="pb-5">
            <Button variant="secondary" className="mx-auto">¡Cree su CV!</Button>
            </Container>
            </Container>
        );
    }
}

export default Choice;
