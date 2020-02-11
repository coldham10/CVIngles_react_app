import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { FaWhatsapp, FaPhone, FaTrash, FaEnvelope, FaLinkedin, FaGlobeAmericas, FaTwitter} from 'react-icons/fa';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Popover from 'react-bootstrap/Popover';
import Alert from 'react-bootstrap/Alert';
import Col from 'react-bootstrap/Col';

import PopoverStickOnHover from './PopoverStickOnHover.jsx';



function CVEntry(props) {
    /*Each elelment of a section, including personal information, jobs, etc*/
    if (props.section === 'datos' && props.data.fixed) {
        /*Some personal info fields cannot be deleted. Shown in defaults.json*/
        return (
            <Form.Group>
                <Form.Label>{props.data.displayName}</Form.Label>
                <Form.Control type={props.data.type}>
                </Form.Control>
            </Form.Group>
        );
    }
    if (props.section === 'datos') {
        /*Extensible personal data. Each field is a single InputGroup, with a dropdown for the type of info*/
        return (
            <Form.Group>
            <Form.Label>{props.data.displayName}</Form.Label>
            <InputGroup>
                <DropdownButton
                    as={InputGroup.Prepend} 
                    variant="outline-secondary"
                    title={shortenContactType(props.data.contactType)}
                >
                    {/*WhatsApp*/}
                    <Dropdown.Item onClick={() => props.updateEntry([{
                        'key': 'contactType',
                        'val': 'wa'},
                        {'key': 'type',
                        'val': 'tel'}])}
                    >
                        <FaWhatsapp color="green"/>{'  '}WhatsApp
                    </Dropdown.Item>
                    {/*Phone*/}
                    <Dropdown.Item onClick={() => props.updateEntry([{
                        'key': 'contactType',
                        'val': 'phone'},
                        {'key': 'type',
                        'val': 'tel'}])}
                    >
                        <FaPhone />{'  '}Telefono
                    </Dropdown.Item>
                    {/*Email*/}
                    <Dropdown.Item onClick={() => props.updateEntry([{
                        'key': 'contactType',
                        'val': 'email'},
                        {'key': 'type',
                        'val': 'email'}])}
                    >
                        <FaEnvelope />{'  '}Email
                    </Dropdown.Item>
                    {/*Linkedin has a helper popover for customizing url*/}
                    <PopoverStickOnHover
                        component={
                            <>
                            <Popover.Title as="h3">{'¿Sabías?'}</Popover.Title>
                            <Popover.Content>
                                Puedes personalizar tu URL de LinkedIn. Haga clic 
                                <a target="_blank"
                                    rel="noopener noreferrer"
                                    href="https://www.linkedin.com/help/linkedin/answer/594/personalizar-la-url-de-tu-perfil-publico?lang=es"
                                > aquí </a>
                                para aprender como.
                            </Popover.Content>
                            </>
                        }
                        placement="left"
                        onMouseEnter={() => { }}
                        delay={200}
                    >
                        <Dropdown.Item onClick={() => props.updateEntry([{
                            'key': 'contactType',
                            'val': 'li'},
                            {'key': 'type',
                            'val': 'text'}])}
                        >
                            <FaLinkedin color="#0072b1"/>{'  '}LinkedIn
                        </Dropdown.Item>
                    </PopoverStickOnHover>
                    {/*website*/}
                    <Dropdown.Item onClick={() => props.updateEntry([{
                        'key': 'contactType',
                        'val': 'web'},
                        {'key': 'type',
                        'val': 'url'}])}
                    >
                        <FaGlobeAmericas />{'  '}Sitio Personal
                    </Dropdown.Item>
                    {/*Twitter*/}
                    <Dropdown.Item onClick={() => props.updateEntry([{
                        'key': 'contactType',
                        'val': 'twitter'},
                        {'key': 'type',
                        'val': 'text'}])}
                    >
                        <FaTwitter color="#00aced"/>{'  '}Twitter
                    </Dropdown.Item>
                </DropdownButton>
                <Form.Control type={props.data.type} className="rounded-right"/>
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
    if (props.section === 'estudios') {
        const entryNames = Object.getOwnPropertyNames(props.data);
        entryNames.sort();
        const rows = [];
        let row = [];
        let rowLength = 0;
        for (let i = 0; i < entryNames.length; i++) {
            if (props.data[entryNames[i]].show) {
                if (rowLength + props.data[entryNames[i]].length <= 12) {
                    row.push(
                            <Form.Group as={Col} md={props.data[entryNames[i]].length} key={i}>
                                <Form.Label>
                                    {props.data[entryNames[i]].displayName}
                                </Form.Label>
                                <Form.Control
                                    className="rounded"
                                    type={props.data[entryNames[i]].type}
                                    as={props.data[entryNames[i]].as}
                                />
                            </Form.Group>
                    );
                    rowLength += props.data[entryNames[i]].length;
                }
                if (rowLength >=12) {
                    rows.push(
                        <Form.Row>
                            {row}
                        </Form.Row>
                    );
                    row = [];
                    rowLength = 0;
                }
            }
        }
        return (
            <>
            <Container className="degree-unit border rounded">
            <h3 className="text-center">{props.data.displayName}</h3>
                {rows}
            </Container>
            </>
        );
    }
}

function CVSection(props) {
    const entries = props.data.entries.map((entry, i) =>
        <CVEntry
            key={i}
            idx={i}
            section={props.data.id}
            data={entry}
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
        /*TODO import formVisited from props, managed by App*/
        /*XXX: remove, should be managed by the alert*/
        this.loadLocal()
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
                newEntry.id = 'degree' + (this.state.sections[1].entries.length);
                newEntry.displayName = 'Carrera ' + (this.state.sections[1].entries.length +1);
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
        this.saveLocal();
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
        this.saveLocal();
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
        sessionStorage.setItem("formVisited", "true");
        this.saveLocal();
    }

    loadLocal() {
        //TODO this.state = JSON.parse(localStorage.getItem("userCVData"));
        return null;
    }

    saveLocal() {
        localStorage.setItem("userCVData", JSON.stringify(this.state));
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
        let loadAlert = "";
        //TODO save only if form contains fields, not just changes. Delete if info deleted.
        if (localStorage.getItem("userCVData") && this.formVisited) {
            loadAlert = (
                <Alert variant="info" dismissible onClose={() => localStorage.removeItem("userCVData")}> 
                    Sample alert! 
                    <Alert.Link onClick={() => this.loadLocal()}>
                        {' '}click here to load saved...
                    </Alert.Link>
                </Alert>
            );
        }
        return (
            <Container>
            <Form
                className="cv-form border rounded"
                onKeyPress={event => {
                    if (event.which === 13 && event.target.type !== 'textarea'  /* Enter */) event.preventDefault();
                }}>
            <h1>Crea Tu Hoja de Vida</h1>
            {loadAlert}
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
        case 'web':
            return (<FaGlobeAmericas color="#606060"/>);
        case 'twitter':
            return (<FaTwitter color="#00aced"/>);
        default:
            return 'Icon not defined: ' + contactType;
    }
}

export default CVForm;
