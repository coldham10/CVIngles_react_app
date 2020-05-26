import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

function NoImgModal(props) {
  return (
    <Modal
      centered
      show={props.show}
      onHide={() => props.setShow(false)}
      dialogClassName="standard-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>No hay foto personal</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-2 p-md-3">
        <p>
          Se puede incluir un retrato con este estilo de CV, pero no es
          necesario.
        </p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="dark" onClick={() => props.setShow(false)}>
          Atrás
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            props.handleSubmit();
            props.toCheckout();
          }}
        >
          Enviar sin foto
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NoImgModal;
