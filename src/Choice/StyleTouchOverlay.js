import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function StyleTouchOverlay(props) {
  return (
    <Card.ImgOverlay className="m-0 p-0">
      <ButtonGroup
        vertical
        size="lg"
        className="h-100 m-0 p-0"
        as={Container}
        fluid
      >
        <Button
          block
          variant="light"
          className="h-50 w-100"
          style={{
            borderBottomWidth: "2px",
            borderBottomColor: "rgb(100,100,100)",
            borderBottomStyle: "solid",
          }}
          onMouseDown={() =>
            props.parent.setState({
              options: Object.assign({}, props.parent.state.options, {
                format: props.format,
              }),
            })
          }
          onMouseUp={() =>
            props.parent.setState({
              touchOverlayShow: null,
            })
          }
        >
          Seleccione
        </Button>
        <Button
          block
          variant="light"
          className="h-50 w-100"
          onClick={() => props.parent.setState({ showExample: props.format })}
        >
          Agrandalo
        </Button>
      </ButtonGroup>
    </Card.ImgOverlay>
  );
}
export default StyleTouchOverlay;
