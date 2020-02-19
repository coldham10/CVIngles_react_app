import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class Choice extends React.Component{
    constructor(props) {
        super(props);
        /*TODO: update settings from App for selected options such as package, languages*/
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
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '25rem'}}
                bg="light"
            >
                <Card.Img variant="top" src="./shrink-suit.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>Profesional</Col><Col xs={4}>$35</Col></Row></Card.Title>
                    <Card.Text>
                        Juntos... Lorem ipsum dolor amet organic vaporware next level iPhone cliche vinyl.
                        Readymade flannel aliqua ennui normcore adaptogen.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '25rem'}}
                bg="light"
            >
                <Card.Img variant="top" src="./shrink-english.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>Nativo</Col><Col xs={4}>$15</Col></Row></Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor amet organic vaporware next level iPhone cliche vinyl.
                        Gluten-free occaecat microdosing post-ironic cred hammock succulents kombucha.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '25rem'}}
                bg="light"
            >
                <Card.Img variant="top" src="./shrink-suit.jpg" />
                <Card.Body>
                    <Card.Title><Row><Col>Impresionante</Col><Col xs={4}>$8</Col></Row></Card.Title>
                    <Card.Text>
                        Quis selfies edison bulb scenester godard lorem.
                        Viral 8-bit four dollar toast, woke pariatur lomo raw denim labore. Bitters ugh 90's typewriter offal jianbing.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>
            </Container>

            <Container className="border rounded my-5 choice-group">
            <h3 className="pb-1 pt-3 px-2">Idiomas</h3>
            <Row>
            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' }}
                bg="light"
            >
                <Card.Body>
                    <Card.Title><Row><Col>Todo inglés</Col><Col xs={4}>$0</Col></Row></Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor amet organic vaporware next level iPhone cliche vinyl.
                        Readymade flannel aliqua ennui normcore adaptogen.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' }}
                bg="light"
            >
                <Card.Body>
                    <Card.Title><Row><Col>Traducido</Col><Col xs={4}>$5</Col></Row></Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor amet organic vaporware next level iPhone cliche vinyl.
                        Gluten-free occaecat microdosing post-ironic cred hammock succulents kombucha sriracha roof party ut forage est synth subway tile.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' }}
                bg="light"
            >
                <Card.Body>
                    <Card.Title><Row><Col>Todo Español</Col><Col xs={4}>$0</Col></Row></Card.Title>
                    <Card.Text>
                        Quis selfies edison bulb scenester godard lorem.
                        Viral 8-bit four dollar toast, woke pariatur lomo raw denim labore. Bitters ugh 90's typewriter offal jianbing, est iceland cold-pressed ad scenester heirloom.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>
            </Row>

            </Container>
            </Container>
        );
    }
}

export default Choice;
