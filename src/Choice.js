import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options: props.options, showExample: null, examplePage: 1 };
    this.sendOptions = props.setOptions;
  }

  submit() {
    this.sendOptions(this.state.options);
    this.props.history.push("/enviar");
    window.scrollTo(0, 0);
  }

  render() {
    /*---Select type of service---*/
    let serviceBlock = (
      <Container className="border rounded my-4 p-2 p-md-3 choice-group">
        <h3 className="pb-1 pt-3 px-2">Tipo de servicio</h3>
        <Row>
          <Col>
            <Card
              className={"mx-auto my-4"}
              style={{
                width: "18rem",
                height: "32rem",
                backgroundColor:
                  this.state.options.service === "p" ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                this.setState({
                  options: Object.assign({}, this.state.options, {
                    service: "p"
                  })
                })
              }
            >
              <Card.Img variant="top" src="./shrink-suit.jpg" />
              <Card.Body>
                <Card.Title>
                  <Row>
                    <Col>De Lujo</Col>
                    <Col xs={4}>$40</Col>
                  </Row>
                </Card.Title>
                <Card.Text>
                  Perfeccionamos el contenido a mostrar sus habilidades,
                  quitamos lo que no es necesario y consultamos con usted hasta
                  que está perfecto.
                  <br />
                  <br />
                  <strong>
                    Incluye dos revisiones, formato impesionante, edición de
                    copia y traducción si es necesario.
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              className="mx-auto my-4"
              style={{
                width: "18rem",
                height: "32rem",
                backgroundColor:
                  this.state.options.service === "t" ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                this.setState({
                  options: Object.assign({}, this.state.options, {
                    service: "t"
                  })
                })
              }
            >
              <Card.Img variant="top" src="./shrink-english.jpg" />
              <Card.Body>
                <Card.Title>
                  <Row>
                    <Col>Traducción Profesional</Col>
                    <Col xs={4}>$20</Col>
                  </Row>
                </Card.Title>
                <Card.Text>
                  Su hoja de vida es traducido de español por nuestro equipo de
                  hispanohablantes bilingües y luego editado por nuestro equipo
                  angloparlante.
                  <br />
                  <br />
                  <strong>
                    Incluye también formato impesionante y edición de copia.
                  </strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card
              className="mx-auto my-4"
              style={{
                width: "18rem",
                height: "32rem",
                backgroundColor:
                  this.state.options.service === "i" ? "#5ca4a9" : "white"
              }}
              onClick={() =>
                this.setState({
                  options: Object.assign({}, this.state.options, {
                    service: "i"
                  })
                })
              }
            >
              <Card.Img variant="top" src="./shrink-splash.jpg" />
              <Card.Body>
                <Card.Title>
                  <Row>
                    <Col>Inglés Nativo</Col>
                    <Col xs={4}>$15</Col>
                  </Row>
                </Card.Title>
                <Card.Text>
                  Nuestro equipo de editores nativos angloparlantes modifica su
                  hoja de vida hasta que el inglés está fluido y nativo.
                  <br />
                  <br />
                  <strong>Incluye también formato impesionante.</strong>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );

    /*---Select CV format/style---*/
    let styleBlock = (
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
                  this.state.options.format === 0 ? "#5ca4a9" : "white"
              }}
            >
              <Card.Img variant="top" src="./fancy-sample.jpg" />
              <Card.ImgOverlay className="mb-0 pb-0 choice-style-overlay">
                <Container className="choice-style-overlay-button-container">
                  <Row>
                    <Button
                      variant="light"
                      className="mx-auto"
                      onClick={() =>
                        this.setState({
                          options: Object.assign({}, this.state.options, {
                            format: 0
                          })
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
                      onClick={() => this.setState({ showExample: 0 })}
                    >
                      Agrandalo
                    </Button>
                  </Row>
                </Container>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "18rem",
                height: "18rem",
                backgroundColor:
                  this.state.options.format === 1 ? "#5ca4a9" : "white"
              }}
            >
              <Card.Img variant="top" src="./banking-sample.jpg" />
              <Card.ImgOverlay className="mb-0 pb-0 choice-style-overlay">
                <Container className="choice-style-overlay-button-container">
                  <Row>
                    <Button
                      variant="light"
                      className="mx-auto"
                      onClick={() =>
                        this.setState({
                          options: Object.assign({}, this.state.options, {
                            format: 1
                          })
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
                      onClick={() => this.setState({ showExample: 1 })}
                    >
                      Agrandalo
                    </Button>
                  </Row>
                </Container>
              </Card.ImgOverlay>
            </Card>
          </Col>

          <Col>
            <Card
              className={"mx-auto my-4 p-1 style-choice"}
              style={{
                width: "18rem",
                height: "18rem",
                backgroundColor:
                  this.state.options.format === 2 ? "#5ca4a9" : "white"
              }}
            >
              <Card.Img variant="top" src="./casual-sample.jpg" />
              <Card.ImgOverlay className="mb-0 pb-0 choice-style-overlay">
                <Container className="choice-style-overlay-button-container">
                  <Row>
                    <Button
                      variant="light"
                      className="mx-auto"
                      onClick={() =>
                        this.setState({
                          options: Object.assign({}, this.state.options, {
                            format: 2
                          })
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
                      onClick={() => this.setState({ showExample: 2 })}
                    >
                      Agrandalo
                    </Button>
                  </Row>
                </Container>
              </Card.ImgOverlay>
            </Card>
          </Col>
        </Row>
      </Container>
    );

    /*---Modal for zooming in on CV examples---*/
    //TODO
    let cvModal = (
      <Modal
        centered
        show={this.state.showExample !== null}
        onHide={() => this.setState({ showExample: null, examplePage: 1 })}
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
            onSelect={page => this.setState({ examplePage: page + 1 })}
          >
            <Carousel.Item>
              <Image
                fluid
                src={(function(that) {
                  switch (that.state.showExample) {
                    case 0:
                      return "fancy-0.jpg";
                    case 1:
                      return "banking-0.jpg";
                    case 2:
                      return "casual-0.jpg";
                  }
                })(this)}
              />
            </Carousel.Item>
            <Carousel.Item>
              <Image
                fluid
                src={(function(that) {
                  switch (that.state.showExample) {
                    case 0:
                      return "fancy-1.jpg";
                    case 1:
                      return "banking-1.jpg";
                    case 2:
                      return "casual-1.jpg";
                  }
                })(this)}
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
                  this.state.examplePage === 1
                    ? "1px solid black"
                    : "0px solid black"
              }}
            >
              1
            </Col>
            <Col
              className="py-1 px-2 mx-1"
              style={{
                border:
                  this.state.examplePage === 2
                    ? "1px solid black"
                    : "0px solid black"
              }}
            >
              2
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    );

    return (
      <Container className="choice px-0 px-md-3">
        <h1 className="px-3 pb-2">Seleccione sus opciones</h1>
        {serviceBlock}
        {styleBlock}
        {cvModal}
        <Container className="pb-5">
          <Button
            variant="secondary"
            className="mx-auto"
            onClick={() => this.submit()}
          >
            ¡Cree su CV!
          </Button>
        </Container>
      </Container>
    );
  }
}

export default withRouter(Choice);
