import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";

import ContactDropdown from "./Objects/ContactDropdown";

import { FaTrash } from "react-icons/fa";

function CVEntry(props) {
  const deleteButton = props.deletable ? (
    <Button variant="link" onMouseUp={() => props.formCRUD("DELETE", {})}>
      <FaTrash color="#ed6a5a" />
    </Button>
  ) : (
    <Button variant="link" onMouseUp={() => null}>
      <FaTrash color="#606060" />
    </Button>
  );
  if (props.type === "contact") {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <InputGroup>
          <ContactDropdown
            updateEntry={(contactType, inputType) => {
              props.formCRUD("UPDATE", {
                contactType: contactType,
                inputType: inputType,
              });
            }}
            contactType={props.contactType}
          />
          <Form.Control
            className="rounded-right"
            type={getContactInputType(props.contactType)}
            value={props.data}
            onChange={(e) => props.formCRUD("UPDATE", { data: e.target.value })}
          />
          <InputGroup.Append>{deleteButton}</InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  } else if (props.type === "achievement") {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <InputGroup>
          <Form.Control
            className="rounded"
            type="text"
            value={props.data}
            onChange={(e) => props.formCRUD("UPDATE", { data: e.target.value })}
          ></Form.Control>
          <InputGroup.Append>{deleteButton}</InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  } else if (props.type === "lang") {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <InputGroup>
          <Form.Control className="rounded" placeholder="Idioma" />
          <DropdownButton
            as={InputGroup.Prepend}
            variant="outline-secondary"
          ></DropdownButton>
          <InputGroup.Append>{deleteButton}</InputGroup.Append>
        </InputGroup>
      </Form.Group>
    );
  } else {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <Form.Control
          className="rounded"
          type={props.type === "textarea" ? "text" : props.type}
          as={props.type === "textarea" ? "textarea" : "input"}
          value={props.data}
          onChange={(e) => props.formCRUD("UPDATE", { data: e.target.value })}
        ></Form.Control>
      </Form.Group>
    );
  }
}

function getContactInputType(contactType) {
  switch (contactType) {
    case "phone":
      return "tel";
    case "wa":
      return "tel";
    case "email":
      return "email";
    case "li":
      return "text";
    case "web":
      return "url";
    case "twitter":
      return "text";
    default:
      return "tel";
  }
}

export default CVEntry;
