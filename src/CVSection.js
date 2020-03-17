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
        this.state = (this.props.type === 'datos') ? //datos is an object, others are flexible arrays
            {'entries':  null} : //XXX
            {'entries': this.props.data.map(entry => {
            entry.key = ++this.uid;
            return entry;
        })};
    }
    
    sectionName() {
        switch (this.props.type) {
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
                        name={this.props.type + '_' + entry.type}
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
                    name={this.props.type + '_' + idx }
                />
            );
        });
        return (
            <Container className="cv-form-section border rounded mt-0 mb-3 py-2 px-2 mt-md-4 mb-md-4 p-md-4">
                <Container className="mx-auto px-auto my-2 py-2">
                <h2>{this.sectionName()}</h2>
                </Container> 
                <Container className="px-0 px-md-2">
                {inner}
                </Container>
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
