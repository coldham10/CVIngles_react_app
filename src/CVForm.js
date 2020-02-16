import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import CVSection from './CVSection.js'


class CVForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        /*Map section data to section objects*/
        let inner = this.props.data.map((section, idx) => {
            return (
                <CVSection
                type={section.type}
                data={section.value}
                key={idx}
            />
            );
        });
        return (
            <Container className="mb-5">
            <Form
                className="cv-form border rounded px-2 px-md-4 py-3"
                onKeyPress={event => {
                    if (event.which === 13 && event.target.type !== 'textarea'  /* Enter */) event.preventDefault();
                }}
            >
                <Container className="pt-3 pb-0">
                <h1>Crea Tu Hoja de Vida</h1>
                </Container>
                <Container className="mx-0 px-1 my-1 py-2 mx-md-auto px-md-auto">
                    {inner}
                </Container>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
            </Form>
            </Container>
        );
    }
}

export default CVForm;
