import React, { useState } from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import ImageUploader from "react-images-upload";

import CVSection from "./CVSection.js";
import CVFormOptions from "./CVFormOptions.js";
import FormEgModal from "./FormEgModal.js";
import FormChoiceModal from "./FormChoiceModal.js";
import NoImgModal from "./NoImgModal.js";
import { stripe_pk } from "../keys.js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(stripe_pk);

function CVForm(props) {
  const toCheckout = async (event) => {
    props.handleSubmit();
    // When the customer clicks on the button, first props.handleSubmit is called, then redirect to Stripe Checkout.
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
      successUrl: "http://cvingles.net/enviado",
      cancelUrl: "http://cvingles.net/enviar",
      clientReferenceId: props.ucid,
      customerEmail: (
        props.data
          .find((e) => e.name === "datos")
          .data.find((e) => e.contactType === "email") || { data: undefined }
      ).data,
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
    <Container className="my-0 py-2 px-2 mt-md-4 mb-md-1 p-md-4">
      <DropdownButton
        title="Nueva sección"
        show={showSecDD}
        variant="light"
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
  const [showNoImgModal, setShowNoImgModal] = useState(false); //Format choice modal displayed?

  return (
    <Container className="mb-5 px-0 px-md-3">
      <Form
        className="cv-form border rounded px-2 px-md-4 py-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (props.imageStatus === "NONE" && props.options.format !== 1) {
            setShowNoImgModal(true);
          } else {
            toCheckout(e);
          }
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
        <Container className="rounded mx-0 px-1 my-1 pt-1 pb-3 mx-md-auto px-md-auto">
          <ImageUploader
            className="img-uploader"
            buttonClassName="btn btn-primary"
            buttonText="Elegir imagen (opcional)"
            imgExtension={[".jpg", ".jpeg", ".png", ".bmp"]}
            maxFileSize={1048576}
            fileSizeError="pesa más de 1Mb"
            fileTypeError="no es compatible"
            singleImage={true}
            withIcon={false}
            withPreview={true}
            withLabel={false}
            onChange={(pics) => props.sendImg(pics[0])}
          />
        </Container>
        <CVFormOptions
          setEg={setShowEgModal}
          setShowChoice={setShowChoiceModal}
          options={props.options}
          setOptions={props.setOptions}
        />
        <Button type="submit" className="my-3 my-md-4" size="lg" block>
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
      <NoImgModal
        show={showNoImgModal}
        setShow={setShowNoImgModal}
        toCheckout={() => toCheckout()}
      />
    </Container>
  );
}

export default withRouter(CVForm);
