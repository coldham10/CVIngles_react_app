import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';

import CVEntry from './CVEntry.js';

class CVEntryGroup extends React.Component {
    constructor(props) {
        super(props);
        console.log('group made');
        this.uid = -1;
        this.state = {'entries': this.props.data.map(entry => {
            entry.key = ++this.uid;
            return entry;
        })};
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

    addEntry() {
        const egEntry = this.state.entries[0];
        const newEntry = JSON.parse(JSON.stringify(egEntry)); //Deep copy first obj
        newEntry.value = "";
        newEntry.key = ++this.uid;
        const entries = this.state.entries.concat([newEntry]);
        this.setState({'entries': entries});
    }

    getLength(type) {
        const lengthDict = {
            "degreeName":   12, "startYear":    4,
            "endYear":      4,  "grade":        4,
            "university":   6,  "location":     6,
            "desc":         12, "title":        12,
            "employer":     6,  "achievements":  12,
            "achievement":  12}
        return lengthDict[type];
    }

    groupName(type, idx) {
        switch(type) {
            case "degree": return `Carrera ${idx + 1}`;
            case "job": return `Trabajo ${idx + 1}`;
            case "achievements": return `Logros`;
            default: return "Unknown group";
        }
    }

    render() {
        const rows = [];
        let row = [];
        let nextRow = [];
        let rowLength = 0;
        this.state.entries.forEach((entry, idx) => {
            if (entry.type === "achievements")  {
                row.push(
                    <Form.Group as={Col} md={this.getLength(entry.type)} key={entry.key}>
                        <CVEntryGroup
                            type={entry.type}
                            data={entry.value}
                            key={entry.key}
                            idx={idx}
                            extensible
                        />
                    </Form.Group>
                );
            }
            else {
                row.push(
                    <Form.Group as={Col} md={this.getLength(entry.type)} key={entry.key}>
                        <CVEntry
                            type={entry.type}
                            data={entry.value}
                            key={entry.key}
                            idx={idx}
                            deleteEntry={this.deleteEntry.bind(this)}
                            setVal={this.setVal.bind(this)}
                        />
                    </Form.Group>
                );
            }
            rowLength += this.getLength(entry.type);
            if (rowLength >=12) {
                rows.push(
                    <Form.Row key={idx}>
                        {row}
                    </Form.Row>
                );
                row = [];
                rowLength = 0;
            }
        });
        const footer = this.props.extensible ? <Button variant="link" onMouseUp={this.addEntry.bind(this)}>Más</Button> : null;
        return (
            <Container className="entry-group border rounded">
            <h3>{this.groupName(this.props.type, this.props.idx)}</h3>
                {rows}
                {footer}
            </Container>
        );
    }
}

export default CVEntryGroup;
