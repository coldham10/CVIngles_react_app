import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CVEntry from "./CVEntry.js";
import CVEntryGroup from "./CVEntryGroup.js";

import { MdEdit, MdArrowUpward, MdArrowDownward } from "react-icons/md";

class CVSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editing: false };
  }

  render() {
    let inner = this.props.data.map((entry) => {
      if (entry.CVtype === "entry") {
        return (
          <CVEntry
            type={entry.type}
            data={entry.data}
            dataKey={entry.dataKey}
            dataComment={entry.dataComment}
            key={entry.name}
            deletable={entry.deletable}
            displayName={entry.displayName}
            contactType={entry.contactType}
            langLevel={entry.langLevel}
            invalid={entry.invalid}
            formCRUD={this.props.formCRUD.bind(null, entry.name)}
          />
        );
      } else if (entry.CVtype === "group") {
        return (
          <CVEntryGroup
            data={entry.data}
            key={entry.name}
            deletable={entry.deletable}
            displayName={entry.displayName}
            formCRUD={this.props.formCRUD.bind(null, entry.name)}
          />
        );
      } else {
        console.log("unknown CVtype, error 7133 ");
        return null;
      }
    });

    let editButton =
      this.props.type === "other" ? (
        <Button
          variant="link"
          onClick={() =>
            this.setState((prevState) => {
              return { editing: !prevState.editing };
            })
          }
        >
          <MdEdit color="black" />
        </Button>
      ) : null;
    // FIXME: When button clicked to finish editing does not update

    let header = (
      <Container fluid className="p-0">
        {this.props.first ? (
          <Button className="float-right px-0" variant="link" disabled></Button>
        ) : (
          <Button
            className="float-right px-0 mx-md-2"
            variant="link"
            onClick={() => this.props.formCRUD("SWAP", { dir: "UP" })}
          >
            <MdArrowUpward />
          </Button>
        )}
        {this.props.last ? null : (
          <Button
            className="float-right px-1 mx-md-1"
            variant="link"
            onClick={() => this.props.formCRUD("SWAP", { dir: "DOWN" })}
          >
            <MdArrowDownward />
          </Button>
        )}
        <Row>
          <Col xs="auto" className="pr-0 pl-1 pl-md-3">
            {this.state.editing ? (
              <Form.Control
                defaultValue={this.props.displayName}
                onKeyDown={(e) => {
                  //Enter key pressed
                  if (e.which === 13 && e.target.value !== "") {
                    this.props.formCRUD("UPDATE", {
                      displayName: e.target.value,
                    });
                    e.target.value = "";
                    this.setState({ editing: false });
                  }
                }}
                onBlur={(e) => {
                  if (e.target.value !== "") {
                    this.props.formCRUD("UPDATE", {
                      displayName: e.target.value,
                    });
                  }
                  e.target.value = "";
                  this.setState({ editing: false });
                }}
              ></Form.Control>
            ) : (
              <h2>{this.props.displayName}</h2>
            )}
          </Col>
          <Col className="pl-0">{editButton}</Col>
        </Row>
      </Container>
    );

    let moreButton = !this.props.default ? (
      <Button variant="link" disabled />
    ) : (
      <Button variant="link" onClick={() => this.props.formCRUD("CREATE", {})}>
        Más
      </Button>
    );

    return (
      <Container className="cv-form-section border rounded mt-0 mb-3 py-2 px-2 mt-md-4 mb-md-4 p-md-4">
        <Container fluid className="mx-auto px-0 px-md-auto my-2 py-2">
          {header}
        </Container>
        <Container className="px-0 px-md-2">{inner}</Container>
        <Container>
          {moreButton}
          {this.props.deletable ? (
            <Button
              className="float-right"
              variant="link"
              onClick={() => this.props.formCRUD("DELETE", {})}
            >
              Eliminar sección
            </Button>
          ) : null}
        </Container>
      </Container>
    );
  }
}

export default CVSection;
