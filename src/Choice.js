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
                style={{ width: '18rem' , height: '25rem', backgroundColor: (this.state.options.service === 'p' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'p'})})}
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
                style={{ width: '18rem' , height: '25rem', backgroundColor: (this.state.options.service === 'n' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'n'})})}
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
                style={{ width: '18rem' , height: '25rem', backgroundColor: (this.state.options.service === 'i' ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperty({...this.state.options}, 'service', {'value': 'i'})})}
            >
                <Card.Img variant="top" src="./shrink-splash.jpg" />
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
                style={{ width: '18rem' , height: '14rem', backgroundColor: ((this.state.options.inLang === 'en' && this.state.options.outLang === 'en') ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperties({...this.state.options}, {'inLang': {'value': 'en'}, 'outLang': {'value':'en'}})})}
            >
                <Card.Body>
                    <Card.Title><Row><Col>Todo inglés</Col><Col xs={4}>$0</Col></Row></Card.Title>
                    <Card.Text className="py-3">
                        Escribe todo en inglés y el CV está en inglés.
                        Usted tiene control mas directo con el sentido del producto final.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '14rem', backgroundColor: ((this.state.options.inLang === 'es' && this.state.options.outLang === 'en') ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperties({...this.state.options}, {'inLang': {'value': 'es'}, 'outLang': {'value':'en'}})})}
            >
                <Card.Body>
                    <Card.Title><Row><Col>Traducido</Col><Col xs={4}>$8</Col></Row></Card.Title>
                    <Card.Text>
                        Usted puede escribir algunas o todas partes en español, y nosotros lo traduciremos a ingles nativo.{' '} 
                        <strong>Con traducion es necesario incluir el servicio Nativo o Profesional</strong>.
                    </Card.Text>
                </Card.Body>
            </Card>
            </Col>

            <Col>
            <Card
                className="mx-auto my-4"
                style={{ width: '18rem' , height: '14rem', backgroundColor: ((this.state.options.inLang === 'es' && this.state.options.outLang === 'es') ? "#5ca4a9" : "white")}}
                onClick={() => this.setState({'options': Object.defineProperties({...this.state.options}, {'inLang': {'value': 'es'}, 'outLang': {'value':'es'}})})}
            >
                <Card.Body>
                    <Card.Title><Row><Col>Todo español</Col><Col xs={4}>$0</Col></Row></Card.Title>
                    <Card.Text className="py-3">
                        Escribe todo en español y el CV está en español. Si el CV final está en español, <strong>no podemos hacer el servicio Nativo ni Profesional</strong>.
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
