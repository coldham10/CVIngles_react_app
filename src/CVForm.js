import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

function CVEntry(props) {
    if (props.section === "datos" && props.fixed) {
        return (
            <Form.Group>
                <Form.Label>{props.displayName}</Form.Label>
                <Form.Control type={props.type}>
                </Form.Control>
            </Form.Group>
        );
    }
    if (props.section === "datos") {
        return (
            <InputGroup className="mb-3">
                <DropdownButton
                    as={InputGroup.Prepend}
                    variant="outline-secondary"
                    title="Dropdown"
                    id="input-group-dropdown-1"
                >
                  <Dropdown.Item href="#">Action</Dropdown.Item>
                  <Dropdown.Item href="#">Another action</Dropdown.Item>
                  <Dropdown.Item href="#">Something else here</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">Separated link</Dropdown.Item>
                </DropdownButton>
              <Form.Control type={props.type} />
            </InputGroup>
        );
    }
}

function CVSection(props) {
    const entries = props.data.entries.map((entry, i) =>
        <CVEntry key={i} section={props.data.name} {...entry}/>
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

    addEntry(section, idx) {
        let newEntry;
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
        let replacementSection = {...section};
        replacementSection.entries = section.entries.concat(newEntry);
        this.setState({sections: 
            this.state.sections.slice(0,idx)
            .concat(replacementSection)
            .concat(this.state.sections.slice(idx+1))}
        );
    }

    render() {
        const sections = this.state.sections.map((section, idx) => {
            return (
                <CVSection key={idx} data={section} addEntry={() => this.addEntry(section, idx)}/>
            );
        });
        return (
            <Container >
            <Form className="cv-form border rounded">
            {/*TODO: Validation, separate checkout page*/}
            {sections}
                <Button variant="primary" type="submit">
                  Submit
                </Button>
            </Form>
            </Container>
        );
    }
}

export default CVForm;
