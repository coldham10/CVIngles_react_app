import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Collapse from 'react-bootstrap/Collapse';

import {MdClose, MdExpandLess, MdExpandMore} from "react-icons/md";

import CVEntry from './CVEntry.js';

class CVEntryGroup extends React.Component {
    constructor(props) {
        super(props);
        this.uid = -1;
        this.state = {'expanded': true,
            'entries': this.props.data.map(entry => {
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
        this.setState({'expanded': true}); //If adding entry to group, should expand so not adding 'in secret'
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
            case "degree": return `Estudio ${idx + 1}`;
            case "job": return `Trabajo ${idx + 1}`;
            case "achievements": return `Logros`;
            default: return "Unknown group";
        }
    }

    render() {
        const rows = [];
        let row = [];
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
                            name={this.props.name + '_' + entry.type}
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
                            deletable={this.state.entries.length > 1 /*Achievements*/}
                            name={this.props.name + '_' + entry.type}
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
        const buttons = this.props.deletable ?
            <>
                <Button variant="link"
                    className="ml-auto"
                    onClick={() => this.setState({'expanded': !this.state.expanded})}
                >
                    {this.state.expanded ? <MdExpandLess /> : <MdExpandMore />}
                </Button>
                <Button variant="link"
                    onClick={() => this.props.deleteEntry(this.props.idx)}
                >
                    <MdClose />
                </Button>
            </> :
            <Button variant="link"
                    className="ml-auto"
                    onClick={() => this.setState({'expanded': !this.state.expanded})}
                >
                    {this.state.expanded ? <MdExpandLess /> : <MdExpandMore />}
            </Button> ;
        const footer = this.props.extensible ? <Button variant="link" onMouseUp={this.addEntry.bind(this)}>Más</Button> : null;
        return (
            <Container className="entry-group border rounded py-3 px-2 px-md-3">
                <Container className="ml-1 ml-md-3 my-1 py-1 my-md-3">
                <Row>
                    <h3>{this.groupName(this.props.type, this.props.idx)}</h3>
                    {buttons}
                </Row>
                </Container>
                <Collapse in={this.state.expanded}>
                <Container className="px-0 px-md-2">
                    {rows}
                </Container>
                </Collapse>
                {footer}
            </Container>
        );
    }
}

export default CVEntryGroup;
