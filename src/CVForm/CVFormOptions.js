import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import Image from "react-bootstrap/Image";
import ButtonGroup from "react-bootstrap/ButtonGroup";

//Accordion options to change format and service type
function CVFormOptions(props) {
  return (
    <Container className="mx-0 px-1 my-1 pt-1 pb-3 mx-md-auto px-md-auto">
      <Accordion>
        <Card>
          <Card.Header className="p-3 form-options-header">
            Tipo de servicio:{" "}
            <strong>
              {
                {
                  p: "De Lujo",
                  t: "Traducción Profesional",
                  i: "Inglés Nativo",
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
                        i: "Inglés Nativo",
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
                        ),
                      }[props.options.service]
                    }
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card>
          <Card.Header className="p-3 form-options-header">
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
                      onClick={() => props.setEg(true)}
                    >
                      Ver mas grande
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={() => props.setShowChoice(true)}
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
}

export default CVFormOptions;
