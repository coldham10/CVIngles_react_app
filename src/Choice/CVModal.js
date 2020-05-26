import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

import eg0_0 from "../images/eg0-0.jpg";
import eg1_0 from "../images/eg1-0.jpg";
import eg2_0 from "../images/eg2-0.jpg";
import eg0_1 from "../images/eg0-1.jpg";
import eg1_1 from "../images/eg1-1.jpg";
import eg2_1 from "../images/eg2-1.jpg";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

/*---Modal for zooming in on CV examples---*/
function CVModal(props) {
  return (
    <Modal
      centered
      show={props.parent.state.showExample !== null}
      onHide={() =>
        props.parent.setState({ showExample: null, examplePage: 1 })
      }
      size="lg"
    >
      <Modal.Header closeButton className="py-1" />
      <Modal.Body className="p-0">
        <Carousel
          interval={null}
          indicators={false}
          wrap={false}
          slide={false}
          nextIcon={<MdNavigateNext color="black" size="2rem" />}
          prevIcon={<MdNavigateBefore color="black" size="2rem" />}
          activeIndex={props.parent.state.examplePage - 1}
          onSelect={(page) => props.parent.setState({ examplePage: page + 1 })}
        >
          <Carousel.Item>
            <Image
              fluid
              src={(function (that) {
                switch (that.state.showExample) {
                  case 0:
                    return eg0_0;
                  case 1:
                    return eg1_0;
                  case 2:
                    return eg2_0;
                  default:
                    return null;
                }
              })(props.parent)}
            />
          </Carousel.Item>
          <Carousel.Item>
            <Image
              fluid
              src={(function (that) {
                switch (that.state.showExample) {
                  case 0:
                    return eg0_1;
                  case 1:
                    return eg1_1;
                  case 2:
                    return eg2_1;
                  default:
                    return null;
                }
              })(props.parent)}
            />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <Modal.Footer className="py-1">
        <Row className="mx-auto">
          <Col
            className="py-1 px-2 mx-1"
            style={{
              border:
                props.parent.state.examplePage === 1
                  ? "1px solid black"
                  : "0px solid black",
            }}
            onClick={() => props.parent.setState({ examplePage: 1 })}
          >
            1
          </Col>
          <Col
            className="py-1 px-2 mx-1"
            style={{
              border:
                props.parent.state.examplePage === 2
                  ? "1px solid black"
                  : "0px solid black",
            }}
            onClick={() => props.parent.setState({ examplePage: 2 })}
          >
            2
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
}

export default CVModal;
