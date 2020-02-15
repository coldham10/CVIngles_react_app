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
            <Container>
            <Form
                className="cv-form border rounded"
                onKeyPress={event => {
                    if (event.which === 13 && event.target.type !== 'textarea'  /* Enter */) event.preventDefault();
                }}
            >
                <Container>
                <h1>Crea Tu Hoja de Vida</h1>
                </Container>
                <Container>
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
