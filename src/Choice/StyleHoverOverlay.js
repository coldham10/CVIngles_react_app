import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function StyleHoverOverlay(props) {
  return (
    <Card.ImgOverlay className="mb-0 pb-0 choice-style-overlay">
      <Container className="choice-style-overlay-button-container">
        <Row>
          <Button
            variant="light"
            className="mx-auto"
            onClick={() =>
              props.parent.setState({
                options: Object.assign({}, props.parent.state.options, {
                  format: props.format,
                }),
              })
            }
          >
            Seleccione
          </Button>
        </Row>
        <hr />
        <Row>
          <Button
            variant="light"
            className="mx-auto"
            onClick={() => props.parent.setState({ showExample: props.format })}
          >
            Agrandalo
          </Button>
        </Row>
      </Container>
    </Card.ImgOverlay>
  );
}

export default StyleHoverOverlay;
