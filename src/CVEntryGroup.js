import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Collapse from "react-bootstrap/Collapse";

import { MdClose, MdExpandLess, MdExpandMore } from "react-icons/md";

import CVEntry from "./CVEntry.js";

class CVEntryGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { expanded: true };
  }

  render() {
    const rows = [];
    let row = [];
    let rowLength = 0;
    this.props.data.forEach(entry => {
      if (entry.name === "achievements") {
        row.push(
          <Form.Group as={Col} md={entry.width} key={entry.name}>
            <CVEntryGroup
              displayName={entry.displayName}
              type={entry.type}
              data={entry.data}
              key={entry.name}
              extensible
            />
          </Form.Group>
        );
      } else {
        row.push(
          <Form.Group as={Col} md={entry.width} key={entry.name}>
            <CVEntry
              type={entry.type}
              data={entry.data}
              key={entry.name}
              displayName={entry.displayName}
              deletable={entry.deletable}
            />
          </Form.Group>
        );
      }
      rowLength += entry.width;
      if (rowLength >= 12) {
        rows.push(<Form.Row key={rows.length}>{row}</Form.Row>);
        row = [];
        rowLength = 0;
      }
    });
    const buttons = this.props.deletable ? (
      <>
        <Button
          variant="link"
          className="ml-auto"
          onClick={() => this.setState({ expanded: !this.state.expanded })}
        >
          {this.state.expanded ? <MdExpandLess /> : <MdExpandMore />}
        </Button>
        <Button variant="link" onClick={() => console.log("TODO: delete")}>
          <MdClose />
        </Button>
      </>
    ) : (
      <Button
        variant="link"
        className="ml-auto"
        onClick={() => this.setState({ expanded: !this.state.expanded })}
      >
        {this.state.expanded ? <MdExpandLess /> : <MdExpandMore />}
      </Button>
    );
    const footer = this.props.extensible ? (
      <Button variant="link" onMouseUp={() => console.log("TODO: add")}>
        Más
      </Button>
    ) : null;
    return (
      <Container className="entry-group border rounded py-3 px-2 px-md-3">
        <Container className="ml-1 ml-md-3 my-1 py-1 my-md-3">
          <Row>
            <h3>{this.props.displayName}</h3>
            {buttons}
          </Row>
        </Container>
        <Collapse in={this.state.expanded}>
          <Container className="px-0 px-md-2">{rows}</Container>
        </Collapse>
        {footer}
      </Container>
    );
  }
}

export default CVEntryGroup;
