import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { FaWhatsapp, FaPhone, FaTrash } from 'react-icons/fa';


function CVEntry(props) {
    if (props.section === 'datos' && props.fixed) {
        return (
            <Form.Group>
                <Form.Label>{props.displayName}</Form.Label>
                <Form.Control type={props.type}>
                </Form.Control>
            </Form.Group>
        );
    }
    if (props.section === 'datos') {
        return (
            <Form.Group>
            <Form.Label>{props.displayName}</Form.Label>
            <InputGroup>
                <DropdownButton
                    as={InputGroup.Prepend} 
                    variant="outline-secondary"
                    title={shortenContactType(props.contactType)}
                >
                <Dropdown.Item onClick={() => props.changeEntry([{
                    'key': 'contactType',
                    'val': 'wa'}])}
                >
                    <FaWhatsapp color="green"/>{'  '}WhatsApp
                </Dropdown.Item>
                <Dropdown.Item onClick={() => props.changeEntry([{
                    'key': 'contactType',
                    'val': 'phone'}])}
                >
                    <FaPhone />{'  '}Telefono
                </Dropdown.Item>
                </DropdownButton>
              <Form.Control type={props.type} className="rounded-right"/>
               <InputGroup.Append>
                   <Button variant="link"> <FaTrash /> </Button> 
               </InputGroup.Append>
            </InputGroup>
            </Form.Group>
        );
    }
}

function CVSection(props) {
    const entries = props.data.entries.map((entry, i) =>
        <CVEntry
            key={i}
            idx={i}
            section={props.data.id}
            {...entry}
            changeEntry={changes => props.changeEntry(entry.id, changes)}
        />
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

    addEntry(section, sectionIdx) {
        console.log('added');
        let newEntry;
        switch(section.id) {
            case 'datos':
                newEntry = {...this.defaults.entryDefaults.datos};
                newEntry.id = 'contact' + (this.state.sections[0].entries.length - 3);
                newEntry.displayName = 'Modo de contacto ' + (this.state.sections[0].entries.length - 2);
                break;
            case 'estudios':
                newEntry = {...this.defaults.entryDefaults.estudios};
                break;
            case 'experiencia':
                newEntry = {...this.defaults.entryDefaults.experiencia};
                break;
            default:
                throw new Error('Cannot add entry: section missing');
        }
        let replacementSection = JSON.parse(JSON.stringify(section)); //Deep copy
        replacementSection.entries = section.entries.concat(newEntry);
        this.setState({sections: 
            this.state.sections.slice(0, sectionIdx)
            .concat(replacementSection)
            .concat(this.state.sections.slice(sectionIdx+1))}
        );
    }

    updateEntry(sectionId, entryId, changes) {
        const sec = this.state.sections.find(section => section.id === sectionId);
        const secIdx = this.state.sections.indexOf(sec);
        const ent = sec.entries.find(entry => entry.id === entryId);
        const entIdx = sec.entries.indexOf(ent);

        const newEntry = JSON.parse(JSON.stringify(ent)); //Deep copy
        changes.forEach(change => {
            if (newEntry[change.key].hasOwnProperty("value")) {
                newEntry[change.key].value = change.val;
            }
            else {
                newEntry[change.key] = change.val;
            }
        });
        const newSection = JSON.parse(JSON.stringify(sec)); //Deep copy
        newSection.entries[entIdx] = newEntry;
        this.setState({sections:
            this.state.sections.slice(0, secIdx)
            .concat(newSection)
            .concat(this.state.sections.slice(secIdx+1))}
        );
        return null;
    }

    render() {
        const sections = this.state.sections.map((section, idx) => {
            return (
                <CVSection
                key={idx}
                data={section}
                addEntry={() => this.addEntry(section, idx)}
                changeEntry={(entryId, changes) => this.updateEntry(section.id, entryId, changes)}
                />
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

function shortenContactType(contactType) {
    switch (contactType) {
        case 'phone':
            return (<FaPhone />);
        case 'wa':
            return (<FaWhatsapp color="green"/>);
        default:
            return 'Icon not defined';
    }
}

export default CVForm;
