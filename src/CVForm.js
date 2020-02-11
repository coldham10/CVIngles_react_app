import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWhatsapp, FaPhone, FaTrash, FaEnvelope, FaLinkedin } from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';


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
                <Dropdown.Item onClick={() => props.updateEntry([{
                    'key': 'contactType',
                    'val': 'wa'},
                    {'key': 'type',
                    'val': 'tel'}])}
                >
                    <FaWhatsapp color="green"/>{'  '}WhatsApp
                </Dropdown.Item>
                <Dropdown.Item onClick={() => props.updateEntry([{
                    'key': 'contactType',
                    'val': 'phone'},
                    {'key': 'type',
                    'val': 'tel'}])}
                >
                    <FaPhone />{'  '}Telefono
                </Dropdown.Item>
                <Dropdown.Item onClick={() => props.updateEntry([{
                    'key': 'contactType',
                    'val': 'email'},
                    {'key': 'type',
                    'val': 'email'}])}
                >
                    <FaEnvelope />{'  '}email
                </Dropdown.Item>
                <OverlayTrigger
                    placement="left"
                    delay={{ show: 250, hide: 1200 }}
                    overlay={
                      <Popover>
                        <Popover.Title as="h3">{'¿Sabías?'}</Popover.Title>
                        <Popover.Content>
                            Puedes personalizar tu URL de LinkedIn. Haga clic 
                            <a target="_blank" href="https://www.linkedin.com/help/linkedin/answer/594/personalizar-la-url-de-tu-perfil-publico?lang=es"> aquí </a>
                             para aprender como.
                        </Popover.Content>
                      </Popover>
                    }
                >
                <Dropdown.Item onClick={() => props.updateEntry([{
                    'key': 'contactType',
                    'val': 'li'},
                    {'key': 'type',
                    'val': 'text'}])}
                >
                    <FaLinkedin color="#0072b1"/>{'  '}LinkedIn
                </Dropdown.Item>
            </OverlayTrigger>
                </DropdownButton>
              <Form.Control type={props.type} className="rounded-right"/>
               <InputGroup.Append>
                   <Button
                        variant="link"
                        onClick={() => props.deleteEntry()}
                   >
                    <FaTrash color="#ed6a5a"/>
                   </Button> 
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
            updateEntry={changes => props.updateEntry(entry.id, changes)}
            deleteEntry={() => props.deleteEntry(entry.id)}
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

    deleteEntry(section, sectionIdx, entryId) {
        const entryIdx = section.entries.findIndex(entry => entry.id === entryId);
        const  newSection = JSON.parse(JSON.stringify(section)); //Deep copy
        newSection.entries = section.entries.slice(0, entryIdx)
            .concat(section.entries.slice(entryIdx +1));
        if (section.id === "datos") {
            let cont = 0;
            for (let i = 0; i < newSection.entries.length; i++) {
                if (!newSection.entries[i].fixed) {
                    newSection.entries[i].id = 'contact' + cont++;
                    newSection.entries[i].displayName = 'Modo de contacto ' + cont;
                }
            }
        }

        this.setState({sections: 
            this.state.sections.slice(0, sectionIdx)
            .concat(newSection)
            .concat(this.state.sections.slice(sectionIdx+1))}
        );
    }

    render() {
        const sections = this.state.sections.map((section, idx) => {
            return (
                <CVSection
                key={idx}
                data={section}
                addEntry={() => this.addEntry(section, idx)}
                updateEntry={(entryId, changes) => this.updateEntry(section.id, entryId, changes)}
                deleteEntry={(entryId) => this.deleteEntry(section, idx, entryId)}
                />
            );
        });
        return (
            <Container>
            <Form
                className="cv-form border rounded"
                onKeyPress={event => {
                    if (event.which === 13 /* Enter */) event.preventDefault();
                }}>
            <h1>Crea Tu Hoja de Vida</h1>
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
            return (<FaPhone color="#606060"/>);
        case 'wa':
            return (<FaWhatsapp color="green"/>);
        case 'email':
            return (<FaEnvelope color="#606060"/>);
        case 'li':
            return (<FaLinkedin color="#0072b1"/>);
        default:
            return 'Icon not defined';
    }
}

export default CVForm;
