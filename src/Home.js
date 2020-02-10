import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';

function HeaderImage(props) {
    return (
        <Container className="main-header">
      <Image className="header-image" src="stock-man.jpg" rounded />
        </Container>
    );
}

function Home() {
    return (
        <HeaderImage mainTitle="CV Ingles" subTitle="Hojas de Vida en Ingles Nativo y Professional" />
    );
}

export default Home;
