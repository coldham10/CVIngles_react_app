import React from "react";
import "./App.css";

import Home from "./Home/Home.js";
import FormDataHandler from "./CVForm/FormDataHandler.js";
import Choice from "./Choice/Choice.js";
import MainNavBar from "./MainNavBar.js";
import Footer from "./Footer.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    /*TODO load from local save*/
    var { options, formData } = this.loadLocal();
    this.loadedData = formData;
    this.template = require("./example.json"); //XXX Send to datahandler props
    this.state = {
      options: options || this.template.options,
      ucid: (Math.floor(Math.random() * new Date().getTime()) % Math.pow(2, 32))
        .toString(16)
        .padStart(8, "0"), // TODO: load from local unless explicit restart condition given
      toSend: null,
    };
    window.addEventListener("unload", () => this.storeLocal());
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainNavBar />
          <div>
            <Switch>
              <Route exact path="/">
                <Home
                  options={this.state.options}
                  setOptions={(opts) => this.setState({ options: opts })}
                />
              </Route>
              <Route path="/empiece">
                <Choice
                  options={this.state.options}
                  setOptions={(opts) => this.setState({ options: opts })}
                  storeLocal={(data) => this.storeLocal(data)}
                />
              </Route>
              <Route path="/enviar">
                <FormDataHandler
                  options={this.state.options}
                  ucid={this.state.ucid}
                  setOptions={(opts) => this.setState({ options: opts })}
                  template={this.template}
                  loadedData={this.loadedData}
                />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }

  loadLocal() {
    try {
      const retrievedData = JSON.parse(window.localStorage.getItem("formData"));
      const retrievedOpts = JSON.parse(window.localStorage.getItem("options"));
      return {
        formData: retrievedData,
        options: retrievedOpts,
      };
    } catch (e) {
      console.error("Error retrieving localStorage");
      return { formData: null, options: null };
    }
  }
}

export default App;
