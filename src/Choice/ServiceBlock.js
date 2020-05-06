import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import shrink_suit_img from "../images/shrink-suit.jpg";
import shrink_english_img from "../images/shrink-english.jpg";
import shrink_splash_img from "../images/shrink-splash.jpg";

/*---Block on Choice page with cards for selecting the service type--*/
function ServiceBlock(props) {
  return (
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
                props.parent.state.options.service === "p"
                  ? "#5ca4a9"
                  : "white",
            }}
            onClick={() =>
              props.parent.setState({
                options: Object.assign({}, props.parent.state.options, {
                  service: "p",
                }),
              })
            }
          >
            <Card.Img variant="top" src={shrink_suit_img} />
            <Card.Body>
              <Card.Title>
                <Row>
                  <Col>De Lujo</Col>
                  <Col xs={4}>$40</Col>
                </Row>
              </Card.Title>
              <Card.Text>
                Perfeccionamos el contenido a mostrar sus habilidades, quitamos
                lo que no es necesario y consultamos con usted hasta que está
                perfecto.
                <br />
                <br />
                <strong>
                  Incluye dos revisiones, formato impesionante, edición de copia
                  y traducción si es necesario.
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
                props.parent.state.options.service === "t"
                  ? "#5ca4a9"
                  : "white",
            }}
            onClick={() =>
              props.parent.setState({
                options: Object.assign({}, props.parent.state.options, {
                  service: "t",
                }),
              })
            }
          >
            <Card.Img variant="top" src={shrink_english_img} />
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
                props.parent.state.options.service === "i"
                  ? "#5ca4a9"
                  : "white",
            }}
            onClick={() =>
              props.parent.setState({
                options: Object.assign({}, props.parent.state.options, {
                  service: "i",
                }),
              })
            }
          >
            <Card.Img variant="top" src={shrink_splash_img} />
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
      <Container className="fluid">
        <p className="text-right">*Precios en USD</p>
      </Container>
    </Container>
  );
}

export default ServiceBlock;
