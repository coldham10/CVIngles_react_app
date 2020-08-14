import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";

function Confirmation(props) {
  return (
    <Container className="confirmation">
      <h1 className="px-3 pb-2 m-3 confirm-title">Pago confirmado</h1>
      <Container className="border rounded my-4 p-2 p-md-3 confirm-box">
        <Container className="my-3">
          Su código de referencia es:{" "}
          <strong>{props.history.location.search.split("=")[1]}</strong>
        </Container>
        <Container className="my-3">
          También se le ha enviado un correo electrónico de confirmación.
        </Container>
        <Container className="my-3">
          Si usted tiene preguntas, envianos un email a{" "}
          <a href="mailto:preguntas@cvingles.net">preguntas@cvingles.net</a>
        </Container>
      </Container>
    </Container>
  );
}

//
export default withRouter(Confirmation);
