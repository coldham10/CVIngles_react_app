import React from "react";
import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import { IoIosArrowDown } from "react-icons/io";

import suit_pro_img from "../images/suit-pro.jpg";
import dark_english_img from "../images/dark-english.jpg";
import splash_img from "../images/splash.jpg";

function HomeCarousel(props) {
  return (
    <Container fluid className="m-0 p-0">
      <Carousel
        className="mb-0 pb-0"
        pause={false}
        interval={6000}
        indicators={false}
        controls={false}
      >
        <Carousel.Item className="mb-0 pb-0">
          <Card style={{ border: "none" }}>
            <Card.Body className="py-0 overflow-hidden carousel-card">
              <Image
                as={Card.Image}
                className="vh-100 carousel-image"
                src={suit_pro_img}
              />
              <Card.ImgOverlay className="mb-0 pb-0">
                <Card.Title className="text-center">
                  <h1 className="overlay-h1">Profesional</h1>
                </Card.Title>
              </Card.ImgOverlay>
            </Card.Body>
          </Card>
          <Carousel.Caption>
            <h3 className="carousel-subtitle">
              Deja que su próximo empleador vea lo mejor de usted
            </h3>
            <br />
            <IoIosArrowDown className="scroll-indicator" />
            <IoIosArrowDown className="scroll-indicator delayed-15" />
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="mb-0 pb-0">
          <Card style={{ border: "none" }}>
            <Card.Body className="py-0 overflow-hidden carousel-card">
              <Image
                as={Card.Image}
                className="vh-100 carousel-image"
                src={dark_english_img}
              />
              <Card.ImgOverlay className="mb-0 pb-0">
                <Card.Title className="text-center">
                  <h1 className="overlay-h1">Nativo</h1>
                </Card.Title>
              </Card.ImgOverlay>
            </Card.Body>
          </Card>
          <Carousel.Caption>
            <h3 className="carousel-subtitle">
              Su hoja de vida revisada por un profesional nativo angloparlante
            </h3>
            <br />
            <IoIosArrowDown className="scroll-indicator" />
            <IoIosArrowDown className="scroll-indicator delayed-15" />
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item className="mb-0 pb-0">
          <Card style={{ border: "none" }}>
            <Card.Body className="py-0 overflow-hidden carousel-card">
              <Image
                as={Card.Image}
                className="vh-100 carousel-image"
                src={splash_img}
              />
              <Card.ImgOverlay className="mb-0 pb-0">
                <Card.Title className="text-center">
                  <h1 className="overlay-h1 overlay-h1-long">Impresionante</h1>
                </Card.Title>
              </Card.ImgOverlay>
            </Card.Body>
          </Card>
          <Carousel.Caption>
            <h3 className="carousel-subtitle">
              Formato muy profesional y elegante
            </h3>
            <br />
            <IoIosArrowDown className="scroll-indicator" />
            <IoIosArrowDown className="scroll-indicator delayed-15" />
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default HomeCarousel;
