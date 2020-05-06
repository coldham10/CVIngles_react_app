import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import StyleTouchOverlay from "./StyleTouchOverlay.js";
import StyleHoverOverlay from "./StyleHoverOverlay.js";

import eg0_sample_img from "../images/eg0-sample.jpg";
import eg1_sample_img from "../images/eg1-sample.jpg";
import eg2_sample_img from "../images/eg2-sample.jpg";

/*---Block on Choice page with cards for selecting the formatting style---*/
function StyleBlock(props) {
  return (
    <Container className="border rounded my-5 p-2 p-md-3 choice-group">
      <h3 className="pb-1 pt-3 px-2">Estilo</h3>
      <Row>
        <Col>
          <Card
            className={"mx-auto my-4 p-1 style-choice"}
            style={{
              width: "18rem",
              height: "18rem",
              backgroundColor:
                props.parent.state.options.format === 0 ? "#5ca4a9" : "white",
            }}
            onMouseEnter={() =>
              window.setTimeout(() => {
                if (props.parent.state.touchOverlayShow !== 0) {
                  props.parent.setState({ touchOverlayEnabled: false });
                }
              }, 200)
            }
            onMouseLeave={() =>
              props.parent.setState({
                touchOverlayEnabled: true,
                touchOverlayShow: null,
              })
            }
            onClick={() => props.parent.setState({ touchOverlayShow: 0 })}
          >
            <Card.Img variant="top" src={eg0_sample_img} />
            {(function (that) {
              if (
                that.state.touchOverlayEnabled &&
                that.state.touchOverlayShow === 0
              ) {
                return <StyleTouchOverlay parent={that} format={0} />;
              } else {
                return <StyleHoverOverlay parent={that} format={0} />;
              }
            })(props.parent)}
          </Card>
        </Col>

        <Col>
          <Card
            className={"mx-auto my-4 p-1 style-choice"}
            style={{
              width: "18rem",
              height: "18rem",
              backgroundColor:
                props.parent.state.options.format === 1 ? "#5ca4a9" : "white",
            }}
            onMouseEnter={() =>
              window.setTimeout(() => {
                if (props.parent.state.touchOverlayShow !== 1) {
                  props.parent.setState({ touchOverlayEnabled: false });
                }
              }, 200)
            }
            onMouseLeave={() =>
              props.parent.setState({
                touchOverlayEnabled: true,
                touchOverlayShow: null,
              })
            }
            onClick={() => props.parent.setState({ touchOverlayShow: 1 })}
          >
            <Card.Img variant="top" src={eg1_sample_img} />
            {(function (that) {
              if (
                that.state.touchOverlayEnabled &&
                that.state.touchOverlayShow === 1
              ) {
                return <StyleTouchOverlay parent={that} format={1} />;
              } else {
                return <StyleHoverOverlay parent={that} format={1} />;
              }
            })(props.parent)}
          </Card>
        </Col>

        <Col>
          <Card
            className={"mx-auto my-4 p-1 style-choice"}
            style={{
              width: "18rem",
              height: "18rem",
              backgroundColor:
                props.parent.state.options.format === 2 ? "#5ca4a9" : "white",
            }}
            onMouseEnter={() =>
              window.setTimeout(() => {
                if (props.parent.state.touchOverlayShow !== 2) {
                  props.parent.setState({ touchOverlayEnabled: false });
                }
              }, 200)
            }
            onMouseLeave={() =>
              props.parent.setState({
                touchOverlayEnabled: true,
                touchOverlayShow: null,
              })
            }
            onClick={() => props.parent.setState({ touchOverlayShow: 2 })}
          >
            <Card.Img variant="top" src={eg2_sample_img} />
            {(function (that) {
              if (
                that.state.touchOverlayEnabled &&
                that.state.touchOverlayShow === 2
              ) {
                return <StyleTouchOverlay parent={that} format={2} />;
              } else {
                return <StyleHoverOverlay parent={that} format={2} />;
              }
            })(props.parent)}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default StyleBlock;
