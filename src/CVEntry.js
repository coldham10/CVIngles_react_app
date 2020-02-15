import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Popover from 'react-bootstrap/Popover'

import { FaWhatsapp, FaPhone, FaTrash, FaEnvelope, FaLinkedin, FaGlobeAmericas, FaTwitter} from 'react-icons/fa';

import PopoverStickOnHover from './PopoverStickOnHover.jsx';

class CVEntry extends React.Component {
    constructor(props) {
        super(props);
        if (props.type === 'contact') {
            this.state = {
                'contactType': props.data.type,
                'value': props.data.value,
                'type': getContactInputType(props.data.type),
            }
        }
        else {
            this.state = {
                'value': props.data
            }
        }
    }

    entryName(type, idx) {
        switch(type) {
            case 'name':        return 'Nombre Completo';
            case 'dob':         return 'Fecha de Nacimiento';
            case 'address':     return 'Direccíon';
            case 'contact':     return `Modo de Contacto ${idx - 2}`;
            case 'degreeName':  return 'Nombre Completo de Carrera o Curso';
            case 'startYear':   return 'Año de Comienzo';
            case 'endYear':     return 'Año de Terminación';
            case 'grade':       return 'Nota (x.x/x.x)';
            case 'university':  return 'Universidad o Instituto';
            case 'location':    return 'Ciudad, País';
            case 'desc':        return 'Descripción';
            case 'title':       return 'Título';
            case 'employer':    return 'Empleador';
            case 'achievement': return `Logro ${idx +1}`;
            default:            return 'Unknown group';
        }
    }

    dataType(entryType) {
        switch(entryType) {
            case 'name':        return ['text', 'input'];
            case 'dob':         return ['date', 'input'];
            case 'address':     return ['text', 'input'];
            case 'contact':     return ['tel',  'input'];
            case 'degreeName':  return ['text', 'input'];
            case 'startYear':   return ['year', 'input']; 
            case 'endYear':     return ['year', 'input']; 
            case 'grade':       return ['text', 'input']; 
            case 'university':  return ['text', 'input']; 
            case 'location':    return ['text', 'input']; 
            case 'desc':        return ['text', 'textarea']; 
            case 'title':       return ['text', 'input']; 
            case 'employer':    return ['text', 'input']; 
            case 'achievement': return ['text', 'input']; 
            default:            return ['text', 'input']; 
        }
    }

    render() {
        const deleteButton = this.props.deletable ?
            <Button
                variant="link"
                onMouseUp={() => this.props.deleteEntry(this.props.idx)/*MouseUp lets a previously edited entry blur and save first before deleting*/}
            >
                <FaTrash color="#ed6a5a"/>
            </Button> :
            <Button
                variant="link"
                onMouseUp={() => null}
            >
                <FaTrash color="#606060"/>
            </Button> ;
        if (this.props.type === 'contact') {
            return (
                <Form.Group>
                <Form.Label>{this.entryName(this.props.type, this.props.idx)}</Form.Label>
                <InputGroup>
                    <ContactDropdown
                        updateEntry={(contactType, type) => {
                            this.setState({'contactType': contactType, 'type': type});
                        }}
                        contactType={this.state.contactType}
                    />
                <Form.Control
                    className="rounded-right"
                    type={getContactInputType(this.state.type)}
                    value={this.state.value}
                    onChange={e => this.setState({'value': e.target.value})}
                    onBlur={() => this.props.setVal(this.props.idx, this.state.value)}
                    onMouseUp={e => e.target.focus()}
                />
                <InputGroup.Append>
                    {deleteButton}
                </InputGroup.Append>
                </InputGroup>
                </Form.Group>

            );
        }
        else if (this.props.type === 'achievement') {
            return (
                <Form.Group>
                    <Form.Label>{this.entryName(this.props.type, this.props.idx)}</Form.Label>
                    <InputGroup>
                    <Form.Control
                        className="rounded"
                        type={this.dataType(this.props.type)[0]}
                        as={this.dataType(this.props.type)[1]}
                        value={this.state.value}
                        onChange={e => this.setState({'value': e.target.value})}
                        onBlur={() => this.props.setVal(this.props.idx, this.state.value)}
                        onMouseUp={e => e.target.focus()}
                    >
                    </Form.Control>
                    <InputGroup.Append>
                        {deleteButton}
                    </InputGroup.Append>
                    </InputGroup>
                </Form.Group>
            );
        }
        else {
            return (
                <Form.Group>
                    <Form.Label>{this.entryName(this.props.type, this.props.idx)}</Form.Label>
                    <Form.Control
                        className="rounded"
                        type={this.dataType(this.props.type)[0]}
                        as={this.dataType(this.props.type)[1]}
                        value={this.state.value}
                        onChange={e => this.setState({'value': e.target.value})}
                        onBlur={() => this.props.setVal(this.props.idx, this.state.value)}
                        onMouseUp={e => e.target.focus()}
                    >
                    </Form.Control>
                </Form.Group>
            );
        }
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

function getContactInputType(contactType) {
    switch (contactType) {
        case 'phone': return 'tel';
        case 'wa': return 'tel';
        case 'email': return 'email';
        case 'li': return 'text';
        case 'web': return 'url';
        case 'twitter': return 'text';
        default: return 'tel';
    }
}

export default CVEntry;
