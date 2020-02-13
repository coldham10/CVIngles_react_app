import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import CVEntry from './CVEntry.js'
import CVEntryGroup from './CVEntryGroup.js'

class CVSection extends React.Component {
    constructor(props) {
        super(props);
    }
    
    sectionName() {
        switch (this.props.type) {
            case "datos":
                return "Datos Personales";
            case "estudios":
                return "Estudios";
            case "experiencia":
                return "Experiencia Laboral";
            default:
                return "Undefined, section type error";
        }
    }

    render() {
        let inner = this.props.data.map((entry, idx) => {
            if (this.props.type === "datos") {
                //XXX could also be extra category that uses ungrouped data...
                return (
                    <CVEntry
                        type={entry.type}
                        data={entry.value}
                        key={idx}
                        idx={idx}
                    />
                );
            }
            return (
                <CVEntryGroup
                    type={entry.type}
                    data={entry.value}
                    key={idx}
                    idx={idx}
                />
            );
        });
        return (
            <Container className="cv-form-section border rounded">
                <h2>{this.sectionName()}</h2>
                {inner}
            <Button variant="link">Más</Button>
            </Container>
        );
    }
}

export default CVSection;
