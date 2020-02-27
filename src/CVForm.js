import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { withRouter } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import CVSection from './CVSection.js'


class CVForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'options': props.options, 'data': ''};
        this.sendOptions = props.setOptions;
        this.sendData = props.setData;
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
                onSubmit={e => this.handleSubmit(e)}
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

    handleSubmit(event) {
        event.preventDefault();
        let formData = {}
        for (let i = 0; i < event.target.elements.length; i++) { // All form elements at time of submit
            const elem = event.target.elements[i];
            if (elem.outerHTML.split(' ')[0] !== '<input' && elem.outerHTML.split(' ')[0] !== '<textarea') continue; //skip over non-control elements
            formData = this.addElementToDataObject(formData, elem.name, elem.value);
        }
        console.log(JSON.stringify(formData, null, 2))
        

        //this.props.history.push('/caja');
        //window.scrollTo(0,0);
    }

    addElementToDataObject(obj, name, value) {
        /*Using the element name creates/assigns the value to the relevant part of the data object*/
        const tokens = name.split('_');
        const category = tokens.shift();
        if (tokens.length < 1) { //final depth reached, add value
            obj[category] = value;
        }
        else {
            obj[category] = this.addElementToDataObject(obj[category] || {}, tokens.join('_'), value);
        }
        return obj;
    }
}

export default withRouter(CVForm);
