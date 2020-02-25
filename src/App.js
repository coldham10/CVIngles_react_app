import React from 'react';
import './App.css';

import Home from './Home.js';
import CVForm from './CVForm.js';
import Choice from './Choice.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MainNavBar(props) {
    return (
        <Navbar fixed="top" expand="md" className="custom-nav mb-4">
            <Container className="p-0">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="/draft_logo_long.svg"
                    width="160"
                    className="d-inline-block"
                />{' '}
            </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
            <Nav className="mr-auto">
                <Nav.Link href="/">Servicios</Nav.Link>
                <Nav.Link href="/testimonios">Testimonios</Nav.Link>
                <Nav.Link href="/empiece">Empiece</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Container>
        </Navbar>
        );
}

function Footer() {
    return (
        <Container fluid className="m-0 p-0 footer">
        <Container className="py-5">
        <Row>
            <Col>
            <img
                alt=""
                src="/draft_logo_long.svg"
                width="160"
                className="d-inline-block py-4"
            />{' '}
            </Col>
            <Col>
            <Container className="py-md-4">
            <p className="my-md-3">¿Preguntas? Envienos un email a info@cvingles.net</p>
            </Container>
            </Col>
        </Row>
        </Container>
        </Container>
    );
}


class App extends React.Component {
    constructor(props) {
        super(props);
        let template = require('./model.json');
        this.state = {'formData': template.model, 'options': template.options};
    }

    render() {
        return (
            <div className="App">
                <MainNavBar />
                <Router>
                <div>
                <Switch>
                    <Route exact path="/">
                        <Home
                            options={this.state.options}
                            setOptions={opts => this.setState({'options': opts})}
                        />
                    </Route>
                    <Route path="/empiece">
                        <Choice
                            options={this.state.options}
                            setOptions={opts => this.setState({'options': opts})}
                        />
                    </Route>
                    <Route path="/enviar">
                        <CVForm
                            data={this.state.formData}
                            options={this.state.options}
                            setOptions={opts => this.setState({'options': opts})}
                            setData={data => this.setState({'formData': data})}
                        />
                    </Route>
                </Switch>
                </div>
                </Router>
                <Footer />
            </div>
        );
    }
}

export default App;
