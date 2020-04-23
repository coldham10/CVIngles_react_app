import React from "react";
import "./App.css";

import Home from "./Home.js";
import CVForm from "./CVForm.js";
import Choice from "./Choice.js";
import Checkout from "./Checkout.js";

import "bootstrap/dist/css/bootstrap.min.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function MainNavBar(props) {
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="md"
      className="custom-nav mb-4"
    >
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
            <Nav.Link as={NavLink} exact eventKey="1" to="/">
              Servicios
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="2" to="/testimonios">
              Testimonios
            </Nav.Link>
            <Nav.Link as={NavLink} eventKey="3" to="/empiece">
              Empiece
            </Nav.Link>
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
    this.template = require("./example.json");
    this.state = {
      formData: this.template.model,
      options: this.template.options,
      toSend: null
    };
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
                  handleSubmit={e => {
                    this.setState({
                      toSend: this.getAppData()
                    });
                    console.log(JSON.stringify(this.getAppData()));
                    e.preventDefault();
                  }}
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
    /*arguments: first n-2 guide to relevant section
    second to last is CREATE, UPDATE or DELETE
    last argument = {prop: val} or {}*/
    const n = arguments.length;
    let modelCopy = JSON.parse(JSON.stringify(this.state.formData)); //Deep Copy
    let modelObj = { data: modelCopy };
    let parent = null;
    for (let i = 0; i < n - 2; i++) {
      parent = modelObj;
      modelObj = parent.data.find(element => element.name === arguments[i]);
    }
    switch (arguments[n - 2]) {
      case "CREATE":
        parent = modelObj;
        if (n > 2) {
          //Not adding new section
          modelObj =
            parent.data[
              parent.data.push(JSON.parse(JSON.stringify(parent.default))) - 1
            ];
        } else {
          modelObj =
            parent.data[
              parent.data.push(
                JSON.parse(
                  JSON.stringify(this.template.default[arguments[n - 1].name])
                )
              ) - 1
            ];
        }
        for (let key in arguments[n - 1]) {
          modelObj[key] = arguments[n - 1][key];
        }
        break;
      case "UPDATE":
        for (let key in arguments[n - 1]) {
          modelObj[key] = arguments[n - 1][key];
        }
        break;
      case "DELETE":
        parent.data = parent.data.filter(obj => obj !== modelObj);
        if (n === 3) {
          modelCopy = parent.data;
        }
        break;
      default:
        console.warn("Error unkown CRUD argument");
    }
    let idx = 0; //Renaming variable entries
    parent.data.forEach(elem => {
      switch (elem.type) {
        case "contact":
          elem.name = "contact" + idx++;
          elem.name = elem.displayName = "Modo de Contacto " + idx;
          break;
        case "achievement":
          elem.name = "achievement" + idx++;
          elem.displayName = "Logro " + idx;
          break;
        case "job":
          elem.name = "job" + idx++;
          elem.displayName = "Trabajo " + idx;
          break;
        case "degree":
          elem.name = "degree" + idx++;
          elem.displayName = "Estudio " + idx;
          break;
        case "other":
          elem.name = "other" + idx++;
          break;
        case "skill":
          elem.name = "skill" + idx++;
          elem.displayName = "Habilidad " + idx;
          break;
        default:
          break;
      }
    });
    this.setState({ formData: modelCopy });
  }

  getAppData() {
    let copyRelevant = function(original) {
      //Recursively extract only name and data from full model
      let newObj = {};
      let key =
        original.type === "other"
          ? original.name + "__" + original.displayName
          : original.name;
      if (typeof original.data !== "object") {
        newObj[key] = original.contactType
          ? original.contactType + "__" + original.data
          : original.data;
      } else {
        let children = original.data.map(item => copyRelevant(item));
        newObj[key] = Object.assign({}, ...children);
      }
      return newObj;
    };

    return Object.assign(
      copyRelevant({ name: "model", data: this.state.formData }),
      { options: this.state.options }
    );
  }
}

export default App;
