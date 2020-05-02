import React, { useState } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

import CVSection from "./CVSection.js";
import CVFormOptions from "./CVFormOptions.js";
import FormEgModal from "./FormEgModal.js";
import FormChoiceModal from "./FormChoiceModal.js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_1g7zgBmmQ8HZtjxuBuC0A0WN00erWtfYzw");

function CVForm(props) {
  const toCheckout = async (event) => {
    // When the customer clicks on the button, redirect them to Checkout.
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      items: [
        {
          sku: {
            p: "sku_HAyeENTtw83AH4",
            t: "sku_HAygNDGw8p9Ket",
            i: "sku_HAyhjrPoPglqoV",
          }[props.options.service],
          quantity: 1,
        },
      ],
      successUrl: "http://cvingles.net/enviar",
      cancelUrl: "http://cvingles.net/enviar",
      clientReferenceId: "test000",
      locale: "es",
    });
  };

  /*Map section data to section objects -- the body of the form*/
  let inner = props.data.map((section) => {
    if (section.CVtype === "section") {
      return (
        <CVSection
          key={section.name}
          displayName={section.displayName}
          data={section.data}
          default={section.default}
          type={section.type}
          deletable={section.deletable}
          formCRUD={props.formCRUD.bind(null, section.name)}
        />
      );
    } else {
      console.error("CVForm recieved non-section item at top level");
      return null;
    }
  });

  //Button to add new CV sections
  let [showSecDD, setShowSecDD] = useState(false);
  let addSection = (
    <Container className="mt-0 mb-3 py-2 px-2 mt-md-4 mb-md-4 p-md-4">
      <DropdownButton
        title="Nueva sección"
        show={showSecDD}
        onToggle={(a) => setShowSecDD(a)}
        onSelect={(i) =>
          props.formCRUD("CREATE", {
            name: ["skills", "langs", "thesis", "interests"][i],
          })
        }
      >
        {["Otros Habilidades", "Idiomas", "Tesis", "Intereses"].map(
          (secName, i) => (
            <Dropdown.Item
              disabled={props.data.map((s) => s.displayName).includes(secName)}
              eventKey={i}
              key={i}
            >
              {secName}
            </Dropdown.Item>
          )
        )}
        <Dropdown.Divider />
        <Container>
          <Form.Control
            placeholder="Personalizado"
            onKeyDown={(e) => {
              //Enter key pressed
              if (e.which === 13 && e.target.value !== "") {
                props.formCRUD("CREATE", {
                  name: "other",
                  displayName: e.target.value,
                });
                e.target.value = "";
                setShowSecDD(false);
              }
            }}
          ></Form.Control>
        </Container>
      </DropdownButton>
    </Container>
  );

  //Hooks to manage modal display state
  const [showEgModal, setShowEgModal] = useState(false); //Format example modal displayed?
  const [modalPage, setPage] = useState(0); //Format example page number
  const [showChoiceModal, setShowChoiceModal] = useState(false); //Format choice modal displayed?

  return (
    <Container className="mb-5 px-0 px-md-3">
      <Form
        className="cv-form border rounded px-2 px-md-4 py-3"
        onSubmit={(e) => {
          props.handleSubmit(e);
          toCheckout(e);
        }}
        onKeyPress={(event) => {
          if (
            event.which === 13 &&
            event.target.type !== "textarea" /* Enter key*/
          )
            event.preventDefault();
        }}
      >
        <Container className="pt-3 pb-0">
          <h1>Cree Su Hoja de Vida</h1>
        </Container>
        <Container className="mx-0 px-1 my-1 py-2 mx-md-auto px-md-auto">
          {inner}
          {addSection}
        </Container>
        <CVFormOptions
          setEg={setShowEgModal}
          setShowChoice={setShowChoiceModal}
          options={props.options}
          setOptions={props.setOptions}
        />
        <Button type="submit" className="m-3">
          Enviar
        </Button>
      </Form>
      <FormEgModal
        show={showEgModal}
        setShow={setShowEgModal}
        page={modalPage}
        setPage={setPage}
        options={props.options}
      />
      <FormChoiceModal
        show={showChoiceModal}
        setShow={setShowChoiceModal}
        options={props.options}
        setOptions={props.setOptions}
      />
    </Container>
  );
}

export default withRouter(CVForm);
