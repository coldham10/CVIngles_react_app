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
        this.uid = -1;
        this.state = {'entries': this.props.data.map(entry => {
            entry.key = ++this.uid;
            return entry;
        })};
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

    cleanValues(element) {
        if (element.type === 'contact') {
            element.value = {'type': 'phone', 'value': ""};
            return element;
        }
        if (element.type === 'achievements') {
            element.value = [{'type': 'achievement', 'value': ""}];
            return element;
        }
        if (typeof element.value !== 'object') {
            element.value = "";
            return element;
        }
        if (Array.isArray(element.value)) {
            element.value = element.value.map(i => this.cleanValues(i));
            return element;
        }
        element.value = this.cleanValues(element.value);
        return element;
    }

    addEntry() {
        const egEntry = this.state.entries[this.state.entries.length-1];
        const newEntry = this.cleanValues(JSON.parse(JSON.stringify(egEntry))); //Deep copy last obj data, values set to ""
        newEntry.key = ++this.uid;
        const entries = this.state.entries.concat([newEntry]);
        this.setState({'entries': entries});
    }

    deleteEntry(idx) {
        const entries = this.state.entries.slice(0,idx)
            .concat(this.state.entries.slice(idx + 1));
        this.setState({'entries': entries});
    }

    setVal(idx, val) {
        const entries = this.state.entries.slice();
        entries[idx].value = val;
        this.setState({'entries': entries});
    }

    render() {
        let inner = this.state.entries.map((entry, idx) => {
            if (this.props.type === "datos") {
                return (
                    <CVEntry
                        type={entry.type}
                        data={entry.value}
                        key={entry.key}
                        idx={idx}
                        deleteEntry={this.deleteEntry.bind(this)}
                        setVal={this.setVal.bind(this)}
                        deletable={this.state.entries.length > 4 /*Contacts*/}
                    />
                );
            }
            return (
                <CVEntryGroup
                    type={entry.type}
                    data={entry.value}
                    key={entry.key}
                    idx={idx}
                    deleteEntry={this.deleteEntry.bind(this)}
                    deletable={this.state.entries.length > 1}
                />
            );
        });
        return (
            <Container className="cv-form-section border rounded">
                <h2>{this.sectionName()}</h2>
                {inner}
            <Button
                variant="link"
                onClick={this.addEntry.bind(this)}
            >
                Más
            </Button>
            </Container>
        );
    }
}

export default CVSection;
