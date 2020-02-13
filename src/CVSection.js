import React from 'react';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import {CVEntry, DatosEntry} from './CVEntry.js';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

class CVSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {'entries': [null]}
        this.displayName = "Section"
    }

    addEntry() {
        this.setState({'entries': this.state.entries.concat([<CVEntry />])});
    }

    deleteEntry(name) {
        const idx = this.state.entries.findIndex(elem => elem.props.name === name);
        const newEntries = this.state.entries.slice(0,idx);
        newEntries.push(...this.state.entries.slice(idx + 1));
        this.setState({'entries': newEntries});
    }

    render() {
        return (
            <Container className="cv-form-section border rounded">
            <h2>{this.state.displayName}</h2>
                {this.state.entries}
            <Button variant="link" onClick={() => this.addEntry()}>Add</Button>
            </Container>
        );
    }

    toJSON() {
        //TODO
        return "";
    }
}

class DatosSection extends CVSection {
    constructor(props) {
        super(props);
        this.state = {'entries': [
            <DatosEntry fixed displayName="Nombre Completo" name="name" type="text" key="0"/>,
            <DatosEntry fixed displayName="Fecha de Nacimiento" name="dob" type="date" key="1"/>,
            <DatosEntry fixed displayName="Dirreción" name="address" type="text" key="2"/>
        ],
        'displayName': 'Datos Personales'};
        this.lastkey = 2;
    }

    addEntry() {
        let replacementEntries = this.state.entries.slice();
        replacementEntries.push(
            <DatosEntry
                name={`contact${this.state.entries.length - 3}`}
                displayName={`Modo de Contacto ${this.state.entries.length - 2}`}
                deleteEntry={this.deleteEntry.bind(this,(`contact${this.state.entries.length - 3}`))}
                key={++this.lastkey}
            />);
        this.setState({'entries': replacementEntries});
    }
}


//class CVForm extends React.Component {
//    constructor(props) {
//        super(props);
//        this.defaults = require('./defaults.json');
//        this.state = this.defaults.formDefaults;
//        /*TODO import formVisited from props, managed by App*/
//        /*XXX: remove, should be managed by the alert*/
//        this.loadLocal()
//    }
//
//    addEntry(section, sectionIdx) {
//        let newEntry;
//        switch(section.id) {
//            case 'datos':
//                newEntry = {...this.defaults.entryDefaults.datos};
//                newEntry.id = 'contact' + (this.state.sections[0].entries.length - 3);
//                newEntry.displayName = 'Modo de contacto ' + (this.state.sections[0].entries.length - 2);
//                break;
//            case 'estudios':
//                newEntry = {...this.defaults.entryDefaults.estudios};
//                newEntry.id = 'degree' + (this.state.sections[1].entries.length);
//                newEntry.displayName = 'Carrera ' + (this.state.sections[1].entries.length +1);
//                break;
//            case 'experiencia':
//                newEntry = {...this.defaults.entryDefaults.experiencia};
//                break;
//            default:
//                throw new Error('Cannot add entry: section missing');
//        }
//        let replacementSection = JSON.parse(JSON.stringify(section)); //Deep copy
//        replacementSection.entries = section.entries.concat(newEntry);
//        this.setState({sections: 
//            this.state.sections.slice(0, sectionIdx)
//            .concat(replacementSection)
//            .concat(this.state.sections.slice(sectionIdx+1))}
//        );
//        this.saveLocal();
//    }
//
//    updateEntry(sectionId, entryId, changes) {
//        const sec = this.state.sections.find(section => section.id === sectionId);
//        const secIdx = this.state.sections.indexOf(sec);
//        const ent = sec.entries.find(entry => entry.id === entryId);
//        const entIdx = sec.entries.indexOf(ent);
//
//        const newEntry = JSON.parse(JSON.stringify(ent)); //Deep copy
//        changes.forEach(change => {
//            /*Some elements are nested objects, therefore change with same api*/
//            const key = Object.keys(change)[0];
//            const val = Object.values(change)[0];
//            console.log(newEntry[key]);
//            if (typeof newEntry[key] === 'object' && newEntry[key] !== null) { //typeof null bug...
//                console.log('nested');
//                newEntry[key].value = val;
//            }
//            else {
//                newEntry[key] = val;
//            }
//        });
//        const newSection = JSON.parse(JSON.stringify(sec)); //Deep copy
//        newSection.entries[entIdx] = newEntry;
//        this.setState({sections:
//            this.state.sections.slice(0, secIdx)
//            .concat(newSection)
//            .concat(this.state.sections.slice(secIdx+1))}
//        );
//        this.saveLocal();
//    }
//
//    deleteEntry(section, sectionIdx, entryId) {
//        const entryIdx = section.entries.findIndex(entry => entry.id === entryId);
//        const  newSection = JSON.parse(JSON.stringify(section)); //Deep copy
//        newSection.entries = section.entries.slice(0, entryIdx)
//            .concat(section.entries.slice(entryIdx +1));
//        if (section.id === "datos") {
//            let cont = 0;
//            for (let i = 0; i < newSection.entries.length; i++) {
//                if (!newSection.entries[i].fixed) {
//                    newSection.entries[i].id = 'contact' + cont++;
//                    newSection.entries[i].displayName = 'Modo de contacto ' + cont;
//                }
//            }
//        }
//
//        this.setState({sections: 
//            this.state.sections.slice(0, sectionIdx)
//            .concat(newSection)
//            .concat(this.state.sections.slice(sectionIdx+1))}
//        );
//        sessionStorage.setItem("formVisited", "true");
//        this.saveLocal();
//    }
//
//    loadLocal() {
//        //TODO this.state = JSON.parse(localStorage.getItem("userCVData"));
//        return null;
//    }
//
//    saveLocal() {
//        /*TODO - if performance issues call save only on blur, etc)*/
//        localStorage.setItem("userCVData", JSON.stringify(this.state));
//    }
//
//    render() {
//        const sections = this.state.sections.map((section, idx) => {
//            return (
//                <CVSection
//                key={idx}
//                data={section}
//                addEntry={() => this.addEntry(section, idx)}
//                updateEntry={(entryId, changes) => this.updateEntry(section.id, entryId, changes)}
//                deleteEntry={(entryId) => this.deleteEntry(section, idx, entryId)}
//                />
//            );
//        });
//        let loadAlert = "";
//        //TODO save only if form contains fields, not just changes. Delete if info deleted.
//        if (localStorage.getItem("userCVData") && this.formVisited) {
//            loadAlert = (
//                <Alert variant="info" dismissible onClose={() => localStorage.removeItem("userCVData")}> 
//                    Sample alert! 
//                    <Alert.Link onClick={() => this.loadLocal()}>
//                        {' '}click here to load saved...
//                    </Alert.Link>
//                </Alert>
//            );
//        }
//        return (
//            <Container>
//            <Form
//                className="cv-form border rounded"
//                onKeyPress={event => {
//                    if (event.which === 13 && event.target.type !== 'textarea'  /* Enter */) event.preventDefault();
//                }}>
//            <h1>Crea Tu Hoja de Vida</h1>
//            {loadAlert}
//            {/*TODO: Validation, separate checkout page*/}
//            {sections}
//                <Button variant="primary" type="submit">
//                  Submit
//                </Button>
//            </Form>
//            </Container>
//        );
//    }
//}
export {CVSection, DatosSection};
