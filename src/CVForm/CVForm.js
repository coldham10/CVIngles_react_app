import React from "react";
import "../App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

import ImageUploader from "react-images-upload";
import FlipMove from "react-flip-move";
import { loadStripe } from "@stripe/stripe-js";

import CVFormOptions from "./CVFormOptions.js";
import CVSection from "./CVSection.js";
import FormChoiceModal from "./Objects/FormChoiceModal.js";
import FormEgModal from "./Objects/FormEgModal.js";
import NoImgModal from "./Objects/NoImgModal.js";
import SaveToast from "./Objects/SaveToast.js";
import { stripe_pk } from "../keys.js";

const stripePromise = loadStripe(stripe_pk);

class CVForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEgModal: false,
      modalPage: 0,
      showChoiceModal: false,
      showNoImgModal: false,
      showSecDD: false,
      redirectFail: false,
      validationFail: false,
    };
  }

  handleSubmit() {
    if (this.props.findInputErrors()) {
      this.setState({ validationFail: true });
    } else if (
      ["NONE", "FAILED"].includes(this.props.imageStatus) &&
      this.props.options.format !== 1
    ) {
      this.setState({ validationFail: false });
      this.setState({ showNoImgModal: true });
    } else {
      this.setState({ validationFail: false });
      this.props.handleSubmit();
      this.toCheckout(0);
    }
  }

  async toCheckout(prevTries) {
    // When the customer clicks on the button, first props.handleSubmit is called, then redirect to Stripe Checkout.
    if (this.props.dataStatus === "LOADING") {
      window.setTimeout(() => this.toCheckout(prevTries), 500);
    } else if (prevTries < 3) {
      this.setState({ redirectFail: false });
      if (this.props.dataStatus !== "COMPLETE") {
        window.setTimeout(() => this.toCheckout(prevTries + 1), 500);
      } else {
        //data successfully uploaded
        try {
          const stripe = await stripePromise;
          var { error } = await stripe.redirectToCheckout({
            items: [
              {
                sku: {
                  p: "sku_HAyeENTtw83AH4",
                  t: "sku_HAygNDGw8p9Ket",
                  i: "sku_HAyhjrPoPglqoV",
                }[this.props.options.service],
                quantity: 1,
              },
            ],
            successUrl: "http://cvingles.net/enviado?id=" + this.props.ucid,
            cancelUrl: "http://cvingles.net/enviar",
            clientReferenceId: this.props.ucid,
            customerEmail: (
              this.props.data
                .find((e) => e.name === "datos")
                .data.find((e) => e.contactType === "email") || {
                data: undefined,
              }
            ).data,
            locale: "es",
          });
        } catch {
          this.toCheckout(prevTries + 1);
          console.warn(error);
        }
      }
    } else {
      //More than three failed attempts or timeouts
      this.setState({ redirectFail: true });
    }
  }

  render() {
    /*Map section data to section objects -- the body of the form*/
    let inner = this.props.data.map((section, idx) => {
      if (section.CVtype === "section") {
        return (
          <CVSection
            key={section.name}
            displayName={section.displayName}
            data={section.data}
            default={section.default}
            first={idx < 2}
            last={idx === 0 || idx === this.props.data.length - 1}
            type={section.type}
            deletable={section.deletable}
            formCRUD={this.props.formCRUD.bind(null, section.name)}
          />
        );
      } else {
        console.error("CVForm recieved non-section item at top level");
        return null;
      }
    });

    //Button to add new CV sections
    let addSection = (
      <Container className="my-0 py-2 px-2 mt-md-4 mb-md-1 p-md-4">
        <DropdownButton
          title="Nueva sección"
          show={this.state.showSecDD}
          variant="light"
          onToggle={(a) => this.setState({ showSecDD: a })}
          onSelect={(i) =>
            this.props.formCRUD("CREATE", {
              name: ["skills", "langs", "thesis", "interests"][i - 1],
            })
          }
        >
          {[
            "Otros Habilidades",
            "Idiomas",
            "Tesis de Maestría",
            "Intereses",
          ].map((secName, i) => (
            <Dropdown.Item
              disabled={this.props.data
                .map((s) => s.displayName)
                .includes(secName)}
              eventKey={i + 1}
              key={i + 1}
            >
              {secName}
            </Dropdown.Item>
          ))}
          <Dropdown.Divider />
          <Container>
            <Form.Control
              placeholder="Personalizado"
              onKeyDown={(e) => {
                //Enter key pressed
                if (e.which === 13 && e.target.value !== "") {
                  this.props.formCRUD("CREATE", {
                    name: "other",
                    displayName: e.target.value,
                  });
                  e.target.value = "";
                  this.setState({ showSecDD: false });
                }
              }}
            ></Form.Control>
          </Container>
        </DropdownButton>
      </Container>
    );

    let imgSpinner =
      this.props.imageStatus === "LOADING" ? (
        <Row className="justify-content-center">
          <Spinner animation="border" />
        </Row>
      ) : null;

    return (
      <Container className="mb-5 px-0 px-md-3">
        <Form
          noValidate
          className="cv-form border rounded px-2 px-md-4 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
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
            <FlipMove>{inner}</FlipMove>
            {addSection}
          </Container>
          <Container className="rounded mx-0 px-1 my-1 pt-1 pb-3 mx-md-auto px-md-auto">
            <ImageUploader
              className="img-uploader"
              buttonClassName="btn btn-primary"
              buttonText="Elegir imagen (opcional)"
              imgExtension={[".jpg", ".jpeg", ".png", ".bmp"]}
              maxFileSize={5242880}
              fileSizeError="pesa más de 5Mb"
              fileTypeError="no es compatible"
              singleImage={true}
              withIcon={false}
              withPreview={true}
              withLabel={false}
              onChange={(pics) => this.props.sendImg(pics[0])}
            />
            {imgSpinner}
            <Alert variant="danger" show={this.props.imageStatus === "FAILED"}>
              {"La subida de la imagen falló" + this.props.imageMessage}
            </Alert>
          </Container>
          <CVFormOptions
            setEg={(s) => this.setState({ showEgModal: s })}
            setShowChoice={(s) => this.setState({ showChoiceModal: s })}
            options={this.props.options}
            setOptions={this.props.setOptions}
          />
          <Button
            type="submit"
            disabled={this.props.imageStatus === "LOADING"}
            className="my-3 my-md-4"
            size="lg"
            block
          >
            Enviar
          </Button>
          <Alert variant="danger" show={this.state.redirectFail}>
            No se puede conectar con el servidor
          </Alert>
          <Alert variant="warning" show={this.state.validationFail}>
            El formulario tiene errores
          </Alert>
        </Form>
        <FormEgModal
          show={this.state.showEgModal}
          setShow={(s) => this.setState({ showEgModal: s })}
          page={this.state.modalPage}
          setPage={(p) => this.setState({ modalPage: p })}
          options={this.props.options}
        />
        <FormChoiceModal
          show={this.state.showChoiceModal}
          setShow={(s) => this.setState({ showChoiceModal: s })}
          options={this.props.options}
          setOptions={this.props.setOptions}
        />
        <NoImgModal
          show={this.state.showNoImgModal}
          setShow={(s) => this.setState({ showNoImgModal: s })}
          handleSubmit={() => this.props.handleSubmit()}
          toCheckout={() => this.toCheckout(0)}
        />
        <SaveToast status={this.props.saveStatus} />
      </Container>
    );
  }
}

export default withRouter(CVForm);
