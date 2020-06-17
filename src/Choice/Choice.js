import React from "react";
import "../App.css";

import ColorBlock from "./ColorBlock.js";
import CVModal from "./CVModal.js";
import ServiceBlock from "./ServiceBlock.js";
import StyleBlock from "./StyleBlock.js";

import "bootstrap/dist/css/bootstrap.min.css";

import { withRouter } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

/*---Page for selecting service type and formatting options---*/
class Choice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: props.options,
      showExample: null,
      examplePage: 1,
      touchOverlayEnabled: true,
      touchOverlayShow: null,
      serviceWarning: false,
      styleWarning: false,
    };
    this.sendOptions = props.setOptions;
  }

  submit() {
    this.sendOptions(this.state.options);
    if (
      this.state.options.service === undefined ||
      this.state.options.format === undefined
    ) {
      this.setState({
        serviceWarning: this.state.options.service === undefined,
        styleWarning: this.state.options.format === undefined,
      });
    } else {
      this.props.history.push("/enviar");
      this.props.storeLocal({ options: this.state.options });
      window.scrollTo(0, 0);
    }
  }

  render() {
    let warnings = [];
    if (this.state.serviceWarning) {
      warnings.push(
        <Alert key={0} variant="warning">
          Por favor seleccione el tipo de servicio.
        </Alert>
      );
    }
    if (this.state.styleWarning) {
      warnings.push(
        <Alert key={1} variant="warning">
          Por favor seleccione un estilo.
        </Alert>
      );
    }

    return (
      <Container className="choice px-0 px-md-3">
        <h1 className="px-3 pb-2">Seleccione sus opciones</h1>
        <ServiceBlock parent={this} />
        <StyleBlock parent={this} />
        <ColorBlock parent={this} />
        <CVModal parent={this} />
        <Container className="pb-5">
          <Button
            variant="secondary"
            className="mx-auto mb-3"
            onClick={() => this.submit()}
          >
            ¡Cree su CV!
          </Button>
          {warnings}
        </Container>
      </Container>
    );
  }
}

export default withRouter(Choice);
