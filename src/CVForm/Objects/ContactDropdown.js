import React from "react";

import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Popover from "react-bootstrap/Popover";

import {
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaLinkedin,
  FaGlobeAmericas,
  FaTwitter,
} from "react-icons/fa";

import PopoverStickOnHover from "./PopoverStickOnHover.jsx";

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

export default ContactDropdown;
