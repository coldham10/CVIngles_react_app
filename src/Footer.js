import React from "react";
import "./App.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

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

export default Footer;
