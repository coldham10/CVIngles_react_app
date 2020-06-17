import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

/*---Block on Choice page with cards for selecting the accent color---*/
function ColorBlock(props) {
  let colors = [
    { name: "black", hex0: "#000000", hex1: "#000000" },
    { name: "grey", hex0: "#8C8C8C", hex1: "#8C8C8C" },
    { name: "blue", hex0: "#3872B3", hex1: "#737373" },
    { name: "burgundy", hex0: "#980000", hex1: "#737373" },
    { name: "green", hex0: "#59b24c", hex1: "#737373" },
    { name: "orange", hex0: "#F28C26", hex1: "#737373" },
  ];
  return (
    <Container className="border rounded my-5 p-2 p-md-3 color-group">
      <h3 className="pb-1 pt-3 px-2">Color</h3>
      <Row
        xs={2}
        sm={3}
        md={6}
        lg={12}
        className="justify-content-center"
        noGutters
      >
        {colors.map((color) => (
          <ColorCard
            name={color.name}
            hex0={color.hex0}
            hex1={color.hex1}
            parent={props.parent}
          />
        ))}
      </Row>
    </Container>
  );
}

function ColorCard(props) {
  return (
    <Col>
      <Card
        className={
          "mx-auto my-2 color-card " +
          (props.parent.state.options.color !== props.name ? "border-0" : "")
        }
        style={{
          width: "5rem",
          height: "5rem",
          backgroundColor: props.hex0,
        }}
        onClick={() =>
          props.parent.setState((prevState) => ({
            options: Object.assign({}, prevState.options, {
              color: props.name,
            }),
          }))
        }
      >
        <Card.Footer
          className="mt-auto"
          style={{ backgroundColor: props.hex1 }}
        />
      </Card>
    </Col>
  );
}

export default ColorBlock;
