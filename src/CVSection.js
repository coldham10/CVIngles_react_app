import React from "react";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import CVEntry from "./CVEntry.js";
import CVEntryGroup from "./CVEntryGroup.js";

function CVSection(props) {
  let inner = props.data.map(entry => {
    if (entry.CVtype === "entry") {
      return (
        <CVEntry
          type={entry.type}
          data={entry.data}
          key={entry.name}
          deletable={entry.deletable}
          displayName={entry.displayName}
          contactType={entry.contactType}
          formCRUD={props.formCRUD.bind(null, entry.name)}
        />
      );
    } else if (entry.CVtype === "group") {
      return (
        <CVEntryGroup
          data={entry.data}
          key={entry.name}
          deletable={entry.deletable}
          displayName={entry.displayName}
          formCRUD={props.formCRUD.bind(null, entry.name)}
        />
      );
    } else {
      console.log("unknown CVtype, error 7133");
      return null;
    }
  });
  return (
    <Container className="cv-form-section border rounded mt-0 mb-3 py-2 px-2 mt-md-4 mb-md-4 p-md-4">
      <Container className="mx-auto px-auto my-2 py-2">
        <h2>{props.displayName}</h2>
      </Container>
      <Container className="px-0 px-md-2">{inner}</Container>
      <Button variant="link" onClick={() => props.formCRUD("CREATE", {})}>
        Más
      </Button>
    </Container>
  );
}

export default CVSection;
