import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import CVSection from "./CVSection.js";

function CVForm(props) {
  /*Map section data to section objects*/
  let inner = props.data.map(section => {
    if (section.CVtype === "section") {
      return (
        <CVSection
          key={section.name}
          displayName={section.displayName}
          data={section.data}
          default={section.default}
          formCRUD={props.formCRUD.bind(null, section.name)}
        />
      );
    } else {
      console.error("CVForm recieved non-section item at top level");
      return null;
    }
  });
  return (
    <Container className="mb-5 px-0 px-md-3">
      <Form
        className="cv-form border rounded px-2 px-md-4 py-3"
        onSubmit={e => this.handleSubmit(e)}
        onKeyPress={event => {
          if (
            event.which === 13 &&
            event.target.type !== "textarea" /* Enter key*/
          )
            event.preventDefault();
        }}
      >
        <Container className="pt-3 pb-0">
          <h1>Crea Tu Hoja de Vida</h1>
        </Container>
        <Container className="mx-0 px-1 my-1 py-2 mx-md-auto px-md-auto">
          {inner}
        </Container>
        <Button variant="primary" type="submit">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}

export default withRouter(CVForm);
