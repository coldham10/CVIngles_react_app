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



class CVEntry extends React.Component {
    constructor(props) {
        super(props);
        this.displayName    = props.displayName || null;
        this.length         = props.length      || 12;
        this.as             = props.as          || 'input';
        this.state          = {'value': props.value|| null, 'type': 'text'};

    }

    render() {
        return (
            <Form.Group>
                <Form.Label>{this.displayName}</Form.Label>
                <Form.Control
                    type={this.type}
                    onChange={(e) => this.setState({'value': e.target.value})}
                />
            </Form.Group>
        );
    }

    toJSON() {
        return 'TODO';
    }
}

class DatosEntry extends CVEntry {
    constructor(props) {
        super(props);
        this.fixed = props.fixed || false;
        this.state = {
            'contactType' : props.contactType || 'phone',
            'type' : props.type || 'tel',
            'value' : null
        };
    }

    render() {  
        if (this.fixed) {
            /*Some personal info fields cannot be deleted*/
            return (super.render());
        }
        else {
            /*Extensible personal data. Each field is a single InputGroup, with a dropdown for the type of info*/
            return (
                <Form.Group>
                <Form.Label>{this.displayName}</Form.Label>
                <InputGroup>
                    <ContactDropdown
                        updateEntry={(contactType, type) => {
                            this.setState({'contactType': contactType, 'type': type});
                        }}
                        contactType={this.state.contactType}
                    />
                <Form.Control
                    type={this.type}
                    onChange={(e) => this.setState({"value" : e.target.value})}
                />
                </InputGroup>
                </Form.Group>

            );
        }
    }

    toJSON() {
        //TODO
        return null;
    }
}

class EstudiosSubEntry extends CVEntry {
    constructor(props) {
        super(props);
        this.state = {"value": null};
    }

    render() {
        return (
            <Form.Group as={Col} md={this.length}>
                <Form.Label>
                    {this.props.displayName}
                </Form.Label>
                <Form.Control
                    className="rounded"
                    type={this.props.type}
                    as={this.props.as}
                    onChange={e => this.setState({'value': e.target.value})}
                />
            </Form.Group>
        );
    }
}

class EstudiosEntry extends CVEntry {
    constructor(props) {
        super(props);
        this.subEntries = props.subEntries || [
            <EstudiosSubEntry name="degree" displayName="Nombre del estudio" type="text" as="input" length="12" key="1" />,
            <EstudiosSubEntry name="startYear" displayName="Año de emezar" type="year" as="input" length="4" key="2" />,
            <EstudiosSubEntry name="endYear" displayName="Año de terminar" type="year" as="input" length="4" key="3" />,
            <EstudiosSubEntry name="grade" displayName="Nota (x.x/x.x)" type="text" as="input" length="4" key="4" />,
            <EstudiosSubEntry name="university" displayName="Nombre del Universidad" type="text" as="input" length="6" key="5" />,
            <EstudiosSubEntry name="location" displayName="Ciudad, País" type="text" as="input" length="6" key="6" />,
            <EstudiosSubEntry name="desc" displayName="Descripción" type="text" as="textarea" length="12" key="7" />,
        ];
    }

    /*TODO: change header name depending on displayname, default if whitespace or empty*/

    render() {
        const rows = [];
        let row = [];
        let rowLength = 0;
        for (let i = 0; i < this.subEntries.length; i++) {
            console.log(rowLength);
            if (rowLength + Number(this.subEntries[i].props.length) <= 12) {
                row.push(
                    this.subEntries[i]
                );
                rowLength += Number(this.subEntries[i].props.length);
            }
            if (rowLength >=12) {
                rows.push(
                    <Form.Row key={i}>
                        {row}
                    </Form.Row>
                );
                row = [];
                rowLength = 0;
            }
        }
        console.log(rows);
        return (
            <Container className="degree-unit border rounded">
            <h3 className="text-center">{this.displayName}</h3>
                {rows}
            </Container>
        );
    }

    toJSON () {
        //TODO
        return ""
    }
}

function ContactDropdown(props) {
   return ( 
        <DropdownButton
            as={InputGroup.Prepend} 
            variant="outline-secondary"
            title={shortenContactType(props.contactType)}
        >
            {/*WhatsApp*/}
            <Dropdown.Item onClick={() => props.updateEntry('wa', 'tel')}>
                <FaWhatsapp color="green"/>{'  '}WhatsApp
            </Dropdown.Item>
            {/*Phone*/}
            <Dropdown.Item onClick={() => props.updateEntry('phone','te')}>
                <FaPhone />{'  '}Telefono
            </Dropdown.Item>
            {/*Email*/}
            <Dropdown.Item onClick={() => props.updateEntry('email','email')}>
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
                <Dropdown.Item onClick={() => props.updateEntry('li','text')}>
                    <FaLinkedin color="#0072b1"/>{'  '}LinkedIn
                </Dropdown.Item>
            </PopoverStickOnHover>
            {/*Website*/}
            <Dropdown.Item onClick={() => props.updateEntry('web','url')}>
                <FaGlobeAmericas />{'  '}Sitio Personal
            </Dropdown.Item>
            {/*Twitter*/}
            <Dropdown.Item onClick={() => props.updateEntry('twitter', 'text')}>
                <FaTwitter color="#00aced"/>{'  '}Twitter
            </Dropdown.Item>
        </DropdownButton>
   );
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

export { CVEntry, DatosEntry, EstudiosEntry, EstudiosSubEntry};
