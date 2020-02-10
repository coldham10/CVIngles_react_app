import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function CVEntry(props) {
    console.log(props);
    return (
        <Form.Group>
            <Form.Label>{props.displayName}</Form.Label>
            <Form.Control type={props.type}>
            </Form.Control>
        </Form.Group>
    );
}

function CVSection(props) {
    const entries = props.data.entries.map((entry) =>
        <CVEntry {...entry}/>
    );
    return (
        <Container className="cv-form-section border rounded">
        <h2>{props.data.fullName}</h2>
        {entries}
        <Button variant="link" onClick={props.addEntry}>Add</Button>
        </Container>
    );
}

class CVForm extends React.Component {
    constructor(props) {
        super(props);
        this.defaults = require('./defaults.json');
        this.state = this.defaults.formDefaults;
    }

    addEntry(section) {
        let newEntry;
        console.log('clicked');
        switch(section.name) {
            case "datos":
                newEntry = this.defaults.entryDefaults.datos;
                break;
            case "estudios":
                newEntry = this.defaults.entryDefaults.estudios;
                break;
            case "experiencia":
                newEntry = this.defaults.entryDefaults.experiencia;
                break;
            default:
                throw new Error("Cannot add entry: section missing");
        }
        section.entries = section.entries.concat(newEntry);
    }

    render() {
        const sections = this.state.sections.map((section) => {
            return (
                <CVSection data={section} addEntry={() => this.addEntry(section)}/>
            );
        });
        return (
            <Container>
            <Form className="cv-form border rounded">
            {/*TODO: Validation, separate checkout page*/}
            {sections}

            {/*            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group> */}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
            </Container>
        );
    }
}

export default CVForm;
