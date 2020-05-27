import React from "react";
import "../../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

import eg0_sample_img from "../../images/eg0-sample.jpg";
import eg1_sample_img from "../../images/eg1-sample.jpg";
import eg2_sample_img from "../../images/eg2-sample.jpg";

//Modal in CVForm to choose new format
function FormChoiceModal(props) {
  return (
    <Modal
      centered
      show={props.show}
      onHide={() => props.setShow(false)}
      size="xl"
    >
      <Modal.Header closeButton className="py-1" />
      <Modal.Body className="p-0">
        <Row>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "16rem",
                height: "16rem",
                backgroundColor:
                  props.options.format === 0 ? "#5ca4a9" : "white",
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 0 })
                )
              }
            >
              <Card.Img variant="top" src={eg0_sample_img} />
            </Card>
          </Col>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "16rem",
                height: "16rem",
                backgroundColor:
                  props.options.format === 1 ? "#5ca4a9" : "white",
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 1 })
                )
              }
            >
              <Card.Img variant="top" src={eg1_sample_img} />
            </Card>
          </Col>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "16rem",
                height: "16rem",
                backgroundColor:
                  props.options.format === 2 ? "#5ca4a9" : "white",
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 2 })
                )
              }
            >
              <Card.Img variant="top" src={eg2_sample_img} />
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

export default FormChoiceModal;
