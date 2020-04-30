import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Popover from "react-bootstrap/Popover";

import {
  FaWhatsapp,
  FaPhone,
  FaTrash,
  FaEnvelope,
  FaLinkedin,
  FaGlobeAmericas,
  FaTwitter,
} from "react-icons/fa";

import PopoverStickOnHover from "./PopoverStickOnHover.jsx";

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
function ContactDropdown(props) {
  return (
    <DropdownButton
      as={InputGroup.Prepend}
      variant="outline-secondary"
      title={shortenContactType(props.contactType)}
    >
      {/*WhatsApp*/}
      <Dropdown.Item onClick={() => props.updateEntry("wa", "tel")}>
        <FaWhatsapp color="green" />
        {"  "}WhatsApp
      </Dropdown.Item>
      {/*Phone*/}
      <Dropdown.Item onClick={() => props.updateEntry("phone", "tel")}>
        <FaPhone />
        {"  "}Telefono
      </Dropdown.Item>
      {/*Email*/}
      <Dropdown.Item onClick={() => props.updateEntry("email", "email")}>
        <FaEnvelope />
        {"  "}Email
      </Dropdown.Item>
      {/*Linkedin has a helper popover for customizing url*/}
      <PopoverStickOnHover
        component={
          <>
            <Popover.Title as="h3">{"¿Sabías?"}</Popover.Title>
            <Popover.Content>
              Puedes personalizar tu URL de LinkedIn. Haga clic
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.linkedin.com/help/linkedin/answer/594/personalizar-la-url-de-tu-perfil-publico?lang=es"
              >
                {" "}
                aquí{" "}
              </a>
              para aprender como.
            </Popover.Content>
          </>
        }
        placement="left"
        onMouseEnter={() => {}}
        delay={200}
      >
        <Dropdown.Item onClick={() => props.updateEntry("li", "text")}>
          <FaLinkedin color="#0072b1" />
          {"  "}LinkedIn
        </Dropdown.Item>
      </PopoverStickOnHover>
      {/*Website*/}
      <Dropdown.Item onClick={() => props.updateEntry("web", "url")}>
        <FaGlobeAmericas />
        {"  "}Sitio Personal
      </Dropdown.Item>
      {/*Twitter*/}
      <Dropdown.Item onClick={() => props.updateEntry("twitter", "text")}>
        <FaTwitter color="#00aced" />
        {"  "}Twitter
      </Dropdown.Item>
    </DropdownButton>
  );
}

function shortenContactType(contactType) {
  switch (contactType) {
    case "phone":
      return <FaPhone color="#606060" />;
    case "wa":
      return <FaWhatsapp color="green" />;
    case "email":
      return <FaEnvelope color="#606060" />;
    case "li":
      return <FaLinkedin color="#0072b1" />;
    case "web":
      return <FaGlobeAmericas color="#606060" />;
    case "twitter":
      return <FaTwitter color="#00aced" />;
    default:
      return "Icon not defined: " + contactType;
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
