import React from "react";
import "./App.css";

import Home from "./Home/Home.js";
import CVForm from "./CVForm/CVForm.js";
import Choice from "./Choice/Choice.js";
import MainNavBar from "./MainNavBar.js";
import Footer from "./Footer.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import AWS from "aws-sdk";
import AWS from "aws-sdk/global";
import apigClientFactory from "aws-api-gateway-client";

AWS.config.region = "us-east-1";
const uploadEndpont =
  "https://micezq8w65.execute-api.us-east-1.amazonaws.com/test";

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
                <CVForm
                  options={this.state.options}
                  ucid={this.state.ucid}
                  setOptions={(opts) => this.setState({ options: opts })}
                  formCRUD={this.formCRUD.bind(this)}
                  handleSubmit={(e) => {
                    let data = this.getAppData();
                    this.setState({
                      toSend: data,
                    });
                    this.sendData(data);
                    this.storeLocal();
                    e.preventDefault();
                  }}
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

  sendData(data) {
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: cognito_id,
    });
    AWS.config.credentials.refresh(() => {
      let credentials = AWS.config.credentials.data.Credentials;
      let apigClient = apigClientFactory.newClient({
        invokeUrl: uploadEndpont,
        region: "us-east-1",
        accessKey: credentials.AccessKeyId,
        secretKey: credentials.SecretKey,
        sessionToken: credentials.SessionToken,
      });
      //data/json upload
      let pathParams = { resource: "data" };
      let pathTemplate = "/{resource}";
      let additionalParams = {
        headers: {
          sessionID: this.state.ucid,
        },
      };
      apigClient
        .invokeApi(pathParams, pathTemplate, "POST", additionalParams, data)
        .then(function (result) {
          console.log("upload success");
        })
        .catch(function (result) {
          //TODO implement funtion to stop payment if no upload.
        });
    });
  }
}

export default App;
