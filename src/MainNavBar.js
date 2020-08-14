import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

function MainNavBar(props) {
  return (
    <Navbar
      collapseOnSelect
      fixed="top"
      expand="md"
      className={props.transparent ? "nav-hidden" : "nav-shown"}
    >
      <Container fluid className="p-0">
        <Navbar.Brand
          as={Link}
          to="/"
          onClick={() => {
            window.scrollTo({
              left: 0,
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img
            alt=""
            src="/draft_logo_long.svg"
            width="160px"
            className="d-inline-block"
          />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Nav.Link
              as={NavLink}
              exact
              eventKey="1"
              to="/"
              onSelect={() => {
                window.scrollTo({
                  left: 0,
                  top: window.innerHeight - 10,
                  behavior: "smooth",
                });
              }}
            >
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

export default MainNavBar;
