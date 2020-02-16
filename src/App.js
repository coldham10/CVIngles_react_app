import React from 'react';
import './App.css';

import Home from './Home.js';
import CVForm from './CVForm.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

function MainNavBar(props) {
    return (
        <Navbar fixed="top" expand="md" className="custom-nav mb-4">
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
                <Nav.Link href="/enviar">Empiece</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
        );
}


function App() {
    //TODO make a class so persists
    let formData = require('./model.json');
    return (
        <div className="App">
            <MainNavBar />
        <Router>
      <div>
        <Switch>
          <Route exact path="/">
             <Home />
          </Route>
          <Route path="/testimonio">
            put in tag
          </Route>
          <Route path="/enviar">
            <CVForm data={formData.model}/> 
          </Route>
        </Switch>
      </div>
    </Router>
        </div>
  );
}

export default App;
