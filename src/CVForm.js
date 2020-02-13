import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'


class CVForm extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
            <Form
                className="cv-form border rounded"
                onKeyPress={event => {
                    if (event.which === 13 && event.target.type !== 'textarea'  /* Enter */) event.preventDefault();
                }}
            >
                <h1>Crea Tu Hoja de Vida</h1>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
            </Container>
        );
    }
}

export default CVForm;
