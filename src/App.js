import React from "react";
import "./App.css";

import Home from "./Home.js";
import CVForm from "./CVForm.js";
import Choice from "./Choice.js";
import Checkout from "./Checkout.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Switch, Route, Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MainNavBar(props) {
  return (
    <Navbar fixed="top" expand="md" className="custom-nav mb-4">
      <Container className="p-0">
        <Navbar.Brand as={Link} to="/">
          <img
            alt=""
            src="/draft_logo_long.svg"
            width="160"
            className="d-inline-block"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/">Servicios</Nav.Link>
            <Nav.Link as={NavLink} to="/testimonios">Testimonios</Nav.Link>
            <Nav.Link as={NavLink} to="/empiece">Empiece</Nav.Link>
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
            />{" "}
          </Col>
          <Col>
            <Container className="py-md-4">
              <p className="my-md-3">
                ¿Preguntas? Envienos un email a info@cvingles.net
              </p>
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
    /*TODO load from local save*/
    // FIXME: reloads from file on route
    let template = require("./example3.json");
    this.state = { formData: template.model, options: template.options };
    console.log("Top constructor called")
  }

  render() {
    return (
      <div className="App">
      <Router>
        <MainNavBar />
          <div>
            <Switch>
              <Route exact path="/">
                <Home
                  options={this.state.options}
                  setOptions={opts => this.setState({ options: opts })}
                />
              </Route>
              <Route path="/empiece">
                <Choice
                  options={this.state.options}
                  setOptions={opts => this.setState({ options: opts })}
                />
              </Route>
              <Route path="/enviar">
                <CVForm
                  data={this.state.formData}
                  options={this.state.options}
                  setOptions={opts => this.setState({ options: opts })}
                  formCRUD={this.formCRUD.bind(this)}
                />
              </Route>
              <Route path="/caja">
                <Checkout />
              </Route>
            </Switch>
          </div>
        <Footer />
        </Router>
      </div>
    );
  }

  formCRUD() {
    /*arguments: first n-3 guide to relevant section
    third to last is CREATE, UPDATE or DELETE
    last two are arguments (prop, val) or null*/
    const n = arguments.length;
    const modelCopy = JSON.parse(JSON.stringify(this.state.formData)); //Deep Copy
    let modelObj = { data: modelCopy };
    let parent = null;
    for (let i = 0; i < n - 3; i++) {
      parent = modelObj;
      modelObj = parent.data.find(element => element.name === arguments[i]);
    }
    switch (arguments[n - 3]) {
      case "CREATE":
        //TODO change name for adjustables
        modelObj.data.push(JSON.parse(JSON.stringify(modelObj.default)));
        break;
      case "UPDATE":
        //TODO change name for adjustables
        modelObj[arguments[n - 2]] = arguments[n - 1];
        break;
      case "DELETE":
        parent.data = parent.data.filter(obj => obj !== modelObj);
        break;
      default:
        console.log("Error unkown CRUD argument");
    }
    let idx = 0; //Renaming variable entries
    parent.data.forEach(elem => {
      if (elem.type === "contact") {
        elem.name = "contact" + idx++;
        elem.displayName = "Modo de Contacto " + idx;
      } else if (elem.type === "achievement") {
        elem.name = "achievement" + idx++;
        elem.displayName = "Logro " + idx;
      }
    });
    this.setState({ formData: modelCopy });
  }
}

export default App;
