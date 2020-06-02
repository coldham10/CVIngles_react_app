import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import ContactDropdown from "./Objects/ContactDropdown";
import LangDropdown from "./Objects/LangDropdown";

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
          <Form.Control
            placeholder="Idioma"
            value={props.data}
            onChange={(e) => props.formCRUD("UPDATE", { data: e.target.value })}
          />
          <InputGroup.Append>
            <LangDropdown
              level={props.langLevel}
              updateLevel={(l) => props.formCRUD("UPDATE", { langLevel: l })}
            />
          </InputGroup.Append>
          {deleteButton}
        </InputGroup>
      </Form.Group>
    );
  } else if (props.type === "int" || props.type === "skill") {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <Form.Row>
          <Col xs={3}>
            <Form.Control
              value={props.dataKey}
              onChange={(e) =>
                props.formCRUD("UPDATE", { dataKey: e.target.value })
              }
              placeholder="Nombre"
            />
          </Col>
          <Col xs={7} sm={8}>
            <Form.Control
              value={props.data}
              onChange={(e) =>
                props.formCRUD("UPDATE", { data: e.target.value })
              }
              placeholder="Descripción"
            />
          </Col>
          <Col xs={1}>{deleteButton}</Col>
        </Form.Row>
      </Form.Group>
    );
  } else if (props.type === "other") {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <Form.Row>
          <Col xs={10} md={11} className="pr-xs-0 pr-md-1">
            <Form.Row>
              <Col xs={5} sm={4} md={3}>
                <Form.Control
                  value={props.dataKey}
                  onChange={(e) =>
                    props.formCRUD("UPDATE", { dataKey: e.target.value })
                  }
                  placeholder="Nombre"
                />
              </Col>
              <Col xs={7} sm={8} md={9}>
                <Form.Control
                  value={props.data}
                  onChange={(e) =>
                    props.formCRUD("UPDATE", { data: e.target.value })
                  }
                  placeholder="Descripción"
                />
              </Col>
            </Form.Row>
            <Form.Row>
              <Col className="mt-2" xs={12} sm={6}>
                <Form.Control
                  value={props.dataComment}
                  onChange={(e) =>
                    props.formCRUD("UPDATE", { dataComment: e.target.value })
                  }
                  placeholder="Commentario(???) (opcional)"
                />
              </Col>
            </Form.Row>
          </Col>
          <Col xs={1} className="d-flex align-content-center">
            {deleteButton}
          </Col>
        </Form.Row>
      </Form.Group>
    );
  } else {
    return (
      <Form.Group>
        <Form.Label>{props.displayName}</Form.Label>
        <InputGroup>
          <Form.Control
            className="rounded"
            type={props.type === "textarea" ? "text" : props.type}
            as={props.type === "textarea" ? "textarea" : "input"}
            value={props.data}
            onChange={(e) => props.formCRUD("UPDATE", { data: e.target.value })}
          />
          {props.deletable ? (
            <InputGroup.Append>{deleteButton}</InputGroup.Append>
          ) : null}
        </InputGroup>
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
