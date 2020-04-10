import React, { useState } from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Carousel from "react-bootstrap/Carousel";
import Modal from "react-bootstrap/Modal";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

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

  const [showEgModal, setShowEgModal] = useState(false);
  const [modalPage, setPage] = useState(0);
  const [showChoiceModal, setShowChoiceModal] = useState(false);

  let options = (
    <Container className="mx-0 px-1 my-1 pt-1 pb-3 mx-md-auto px-md-auto">
      <Accordion>
        <Card>
          <Card.Header className="p-3">
            Tipo de servicio:{" "}
            <strong>
              {
                {
                  p: "De Lujo",
                  t: "Traducción Profesional",
                  i: "Inglés Nativo"
                }[props.options.service]
              }
            </strong>
            <Accordion.Toggle
              as={Button}
              className="float-right py-0"
              variant="link"
              eventKey="0"
            >
              Cambiar
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row>
                <Col>
                  <DropdownButton
                    title={
                      {
                        p: "De Lujo",
                        t: "Traducción",
                        i: "Inglés Nativo"
                      }[props.options.service]
                    }
                  >
                    <Dropdown.Item
                      className={
                        props.options.service === "p" ? "disabled" : ""
                      }
                      onClick={() =>
                        props.setOptions(
                          Object.assign({ ...props.options }, { service: "p" })
                        )
                      }
                    >
                      De Lujo
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={
                        props.options.service === "t" ? "disabled" : ""
                      }
                      onClick={() =>
                        props.setOptions(
                          Object.assign({ ...props.options }, { service: "t" })
                        )
                      }
                    >
                      Traducción Profesional
                    </Dropdown.Item>
                    <Dropdown.Item
                      className={
                        props.options.service === "i" ? "disabled" : ""
                      }
                      onClick={() =>
                        props.setOptions(
                          Object.assign({ ...props.options }, { service: "i" })
                        )
                      }
                    >
                      Inglés Nativo
                    </Dropdown.Item>
                  </DropdownButton>
                  <h3 className="p-4 my-3">
                    {
                      { p: "US $40", t: "US $20", i: "US $15" }[
                        props.options.service
                      ]
                    }
                  </h3>
                </Col>
                <Col>
                  <p>
                    {
                      {
                        p: (
                          <>
                            Perfeccionamos el contenido a mostrar sus
                            habilidades, quitamos lo que no es necesario y
                            consultamos con usted hasta que está perfecto.
                            <br />
                            <br />
                            <strong>
                              Incluye dos revisiones, formato impesionante,
                              edición de copia y traducción si es necesario.
                            </strong>
                          </>
                        ),
                        t: (
                          <>
                            Su hoja de vida es traducido de español por nuestro
                            equipo de hispanohablantes bilingües y luego editado
                            por nuestro equipo angloparlante.
                            <br />
                            <br />
                            <strong>
                              Incluye también formato impesionante y edición de
                              copia.
                            </strong>
                          </>
                        ),
                        i: (
                          <>
                            Nuestro equipo de editores nativos angloparlantes
                            modifica su hoja de vida hasta que el inglés está
                            fluido y nativo.
                            <br />
                            <br />
                            <strong>
                              Incluye también formato impesionante.
                            </strong>
                          </>
                        )
                      }[props.options.service]
                    }
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="p-3">
            Estilo:
            <Accordion.Toggle
              as={Button}
              className="float-right py-0"
              variant="link"
              eventKey="1"
            >
              Ver y cambiar
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <Row>
                <Col xs={7} md={5}>
                  <Image
                    src={"./eg" + props.options.format + "-sample.jpg"}
                    className="w-100 m-xs-0 m-md-3 border"
                  />
                </Col>
                <Col
                  xs={5}
                  md={7}
                  className="p-0 align-self-center text-center"
                >
                  <ButtonGroup vertical className="mx-auto">
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowEgModal(true)}
                    >
                      Ver mas grande
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowChoiceModal(true)}
                    >
                      Seleccionar otro estilo
                    </Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </Container>
  );
  let egModal = (
    <Modal
      centered
      show={showEgModal}
      onHide={() => {
        setShowEgModal(false);
        setPage(0);
      }}
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
          activeIndex={modalPage}
          onSelect={page => setPage(page)}
        >
          <Carousel.Item>
            <Image fluid src={"./eg" + props.options.format + "-0.jpg"} />
          </Carousel.Item>
          <Carousel.Item>
            <Image fluid src={"./eg" + props.options.format + "-1.jpg"} />
          </Carousel.Item>
        </Carousel>
      </Modal.Body>
      <Modal.Footer className="py-1">
        <Row className="mx-auto">
          <Col
            className="py-1 px-2 mx-1"
            style={{
              border: modalPage === 0 ? "1px solid black" : "0px solid black"
            }}
            onClick={() => setPage(0)}
          >
            1
          </Col>
          <Col
            className="py-1 px-2 mx-1"
            style={{
              border: modalPage === 1 ? "1px solid black" : "0px solid black"
            }}
            onClick={() => setPage(1)}
          >
            2
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );

  let choiceModal = (
    <Modal
      centered
      show={showChoiceModal}
      onHide={() => setShowChoiceModal(false)}
      size="lg"
    >
      <Modal.Header closeButton className="py-1" />
      <Modal.Body className="p-0">
        <Row>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "18rem",
                height: "18rem",
                backgroundColor:
                  props.options.format === 0 ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 0 })
                )
              }
            >
              <Card.Img variant="top" src="./eg0-sample.jpg" />
            </Card>
          </Col>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "18rem",
                height: "18rem",
                backgroundColor:
                  props.options.format === 1 ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 1 })
                )
              }
            >
              <Card.Img variant="top" src="./eg1-sample.jpg" />
            </Card>
          </Col>
          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "18rem",
                height: "18rem",
                backgroundColor:
                  props.options.format === 2 ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                props.setOptions(
                  Object.assign({ ...props.options }, { format: 2 })
                )
              }
            >
              <Card.Img variant="top" src="./eg2-sample.jpg" />
            </Card>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );

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
          <h1>Cree Su Hoja de Vida</h1>
        </Container>
        <Container className="mx-0 px-1 my-1 py-2 mx-md-auto px-md-auto">
          {inner}
        </Container>
        {options}
        <Button variant="primary" type="submit" className="m-3">
          Enviar
        </Button>
      </Form>
      {egModal}
      {choiceModal}
    </Container>
  );
}

export default withRouter(CVForm);
