import React from "react";
import "./App.css";

import Home from "./Home/Home.js";
import CVForm from "./CVForm/CVForm.js";
import Choice from "./Choice/Choice.js";
import MainNavBar from "./MainNavBar.js";
import Footer from "./Footer.js";
import { cognito_id } from "./keys.js";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AWS from "aws-sdk/global";
import apigClientFactory from "aws-api-gateway-client";

AWS.config.region = "us-east-1";
const uploadEndpont =
  "https://micezq8w65.execute-api.us-east-1.amazonaws.com/test";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: cognito_id,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    var { options, formData } = this.loadLocal();
    this.template = require("./model.json");
    this.state = {
      formData: formData || this.template.model,
      options: options || this.template.options,
      ucid: (Math.floor(Math.random() * new Date().getTime()) % Math.pow(2, 32))
        .toString(16)
        .padStart(8, "0"), // TODO: load from local unless explicit restart condition given
      dataStatus: "NONE",
      imageStatus: "NONE",
      imageMessage: "",
      dataUploadAttempts: 0,
      imageUploadAttempts: 0,
      navbarTransparent: false,
      saveStatus: "READY",
    };

    if (!formData) {
      this.addDefaults();
    }
  }

  render() {
    return (
      <div className="App">
        <Router>
          <MainNavBar transparent={this.state.navbarTransparent} />
          <div>
            <Switch>
              <Route exact path="/">
                <Home
                  options={this.state.options}
                  setOptions={(opts) => this.setState({ options: opts })}
                  setNavTransparent={(b) =>
                    this.setState({ navbarTransparent: b })
                  }
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
                  data={this.state.formData}
                  options={this.state.options}
                  ucid={this.state.ucid}
                  setOptions={(opts) => this.setState({ options: opts })}
                  formCRUD={this.formCRUD.bind(this)}
                  handleSubmit={() => {
                    this.sendData(this.getAppData());
                    this.storeLocal();
                  }}
                  sendImg={(pic) => this.sendImg(pic)}
                  dataStatus={this.state.dataStatus}
                  imageStatus={this.state.imageStatus}
                  imageMessage={this.state.imageMessage}
                  saveStatus={this.state.saveStatus}
                />
              </Route>
              <Route path="*">
                <Home
                  options={this.state.options}
                  setOptions={(opts) => this.setState({ options: opts })}
                  setNavTransparent={(b) =>
                    this.setState({ navbarTransparent: b })
                  }
                />
              </Route>
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }

  formCRUD() {
    /*arguments: first n-2 guide to relevant section
    second to last is CREATE, UPDATE or DELETE
    last argument = {prop: val} or {}*/
    const n = arguments.length;
    let modelCopy = JSON.parse(JSON.stringify(this.state.formData)); //Deep Copy
    let modelObj = { data: modelCopy };
    let parent = null;
    for (let i = 0; i < n - 2; i++) {
      parent = modelObj;
      modelObj = parent.data.find((element) => element.name === arguments[i]);
    }
    switch (arguments[n - 2]) {
      case "CREATE":
        parent = modelObj;
        if (n > 2) {
          //Not adding new section
          modelObj =
            parent.data[
              parent.data.push(JSON.parse(JSON.stringify(parent.default))) - 1
            ];
        } else {
          modelObj =
            parent.data[
              parent.data.push(
                JSON.parse(
                  JSON.stringify(this.template.default[arguments[n - 1].name])
                )
              ) - 1
            ];
          //Creating a new section should have a default entry added
          modelObj.data.push(JSON.parse(JSON.stringify(modelObj.default)));
        }
        for (let key in arguments[n - 1]) {
          modelObj[key] = arguments[n - 1][key];
        }
        break;
      case "UPDATE":
        for (let key in arguments[n - 1]) {
          modelObj[key] = arguments[n - 1][key];
        }
        break;
      case "DELETE":
        parent.data = parent.data.filter((obj) => obj !== modelObj);
        if (n === 3) {
          modelCopy = parent.data;
        }
        break;
      default:
        console.warn("Error unkown CRUD argument");
    }
    let idx = 0; //Renaming variable entries
    parent.data.forEach((elem) => {
      switch (elem.type) {
        case "contact":
          elem.name = "contact" + idx++;
          elem.displayName = "Modo de Contacto " + idx;
          break;
        case "achievement":
          elem.name = "achievement" + idx++;
          elem.displayName = "Logro " + idx;
          break;
        case "job":
          elem.name = "job" + idx++;
          elem.displayName = "Trabajo " + idx;
          break;
        case "degree":
          elem.name = "degree" + idx++;
          elem.displayName = "Estudio " + idx;
          break;
        case "lang":
          elem.name = "lang" + idx++;
          break;
        case "other":
          elem.name = "other" + idx++;
          break;
        case "skill":
          elem.name = "skill" + idx++;
          elem.displayName = "Habilidad " + idx;
          break;
        case "int":
          elem.name = "int" + idx++;
          elem.displayName = "Interes " + idx;
          break;
        default:
          break;
      }
    });
    this.setState({ formData: modelCopy });
    this.queueSave();
  }

  addDefaults() {
    //If not loading data, add a single default to all possible entries in the template to "flesh it out" a little
    let q = [];
    let copyObj = JSON.parse(JSON.stringify(this.state.formData));
    copyObj.forEach((sec) => q.push(sec));
    while (q.length > 0) {
      let node = q.shift();
      if ("default" in node) {
        node.data.push(JSON.parse(JSON.stringify(node.default)));
      }
      if (Array.isArray(node.data)) {
        node.data.forEach((obj) => q.push(obj));
      }
    }
    this.state.formData = copyObj;
  }

  getAppData() {
    let copyRelevant = function (original) {
      //Recursively extract only name and data from full model
      let newObj = {};
      let key =
        original.type === "other"
          ? original.name + "__" + original.displayName
          : original.name;
      if (typeof original.data !== "object") {
        if (original.contactType) {
          newObj[key] = original.contactType + "__" + original.data;
        } else if (original.langLevel) {
          newObj[key] = original.langLevel + "__" + original.data;
        } else if (original.key) {
          newObj[key] = original.key + "__" + original.data;
        } else {
          newObj[key] = original.data;
        }
      } else {
        let children = original.data.map((item) => copyRelevant(item));
        newObj[key] = Object.assign({}, ...children);
      }
      return newObj;
    };

    return Object.assign(
      copyRelevant({ name: "model", data: this.state.formData }),
      { options: this.state.options, imageStatus: this.state.imageStatus }
    );
  }

  storeLocal(data) {
    //Store form data and options in localStorage
    if (data === undefined) {
      data = this.state;
    }
    try {
      if (data.formData !== undefined) {
        window.localStorage.setItem("formData", JSON.stringify(data.formData));
      }
      if (data.options !== undefined) {
        window.localStorage.setItem("options", JSON.stringify(data.options));
      }
      this.setState((prevState) => {
        if (prevState.saveStatus !== "QUEUED") {
          return { saveStatus: "READY" };
        } else {
          return null;
        }
      });
    } catch (e) {
      console.error("Error setting localStorage");
      this.setState({ saveStatus: "FAILED" });
    }
  }

  queueSave(data) {
    if (this.state.saveStatus !== "QUEUED") {
      this.setState({ saveStatus: "QUEUED" });
      window.setTimeout(() => {
        this.setState({ saveStatus: "SAVING" });
        this.storeLocal(data);
      }, 2000);
    }
  }

  loadLocal() {
    //Load data and otr options from localStorage if they exist
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
    //Send form data and options as a JSON object to backend api
    this.setState({ dataStatus: "LOADING" });
    AWS.config.credentials.refresh(() => {
      try {
        //if refresh unsuccessful, credentials will not have the data attribute
        let credentials = AWS.config.credentials.data.Credentials;
        var apigClient = apigClientFactory.newClient({
          invokeUrl: uploadEndpont,
          region: "us-east-1",
          accessKey: credentials.AccessKeyId,
          secretKey: credentials.SecretKey,
          sessionToken: credentials.SessionToken,
        });
      } catch {
        //Could not get IAM credentials
        this.setState((prevState) => ({
          dataUploadAttempts: prevState.dataUploadAttempts + 1,
        }));
        //Three retries before failing
        if (this.state.dataUploadAttempts < 3) {
          this.sendData(data);
        } else {
          this.setState({ dataStatus: "FAILED", dataUploadAttempts: 0 });
        }
        return;
      }
      //Setting up the message
      let pathParams = { resource: "data" };
      let pathTemplate = "/{resource}";
      let additionalParams = {
        headers: {
          sessionID: this.state.ucid,
        },
      };
      //invoking data api
      apigClient
        .invokeApi(pathParams, pathTemplate, "POST", additionalParams, data)
        .then(() =>
          this.setState({ dataStatus: "COMPLETE", dataUploadAttempts: 0 })
        )
        .catch(() => {
          //Three attempts otherwise fail
          this.setState((prevState) => ({
            dataUploadAttempts: prevState.dataUploadAttempts + 1,
          }));
          if (this.state.dataUploadAttempts < 3) {
            this.sendData(data);
          } else {
            this.setState({ dataStatus: "FAILED", dataUploadAttempts: 0 });
          }
          return;
        });
    });
  }

  sendImg(pic) {
    //Send image to backend api
    if (pic === undefined) {
      //When image removed pic is sent as undefined
      this.setState({
        imageStatus: "NONE",
        imageMessage: "",
        imageUploadAttempts: 0,
      });
      return;
    }
    this.setState({ imageStatus: "LOADING" });
    let reader = new FileReader();
    reader.onload = () => {
      //Once image has been loaded
      AWS.config.credentials.refresh(() => {
        try {
          let credentials = AWS.config.credentials.data.Credentials;
          var apigClient = apigClientFactory.newClient({
            invokeUrl: uploadEndpont,
            region: "us-east-1",
            accessKey: credentials.AccessKeyId,
            secretKey: credentials.SecretKey,
            sessionToken: credentials.SessionToken,
          });
        } catch {
          //Could not get IAM credentials
          this.setState((prevState) => ({
            imageUploadAttempts: prevState.imageUploadAttempts + 1,
          }));
          //Three retries before failing
          if (this.state.imageUploadAttempts < 3) {
            this.sendImg(pic);
          } else {
            this.setState({
              imageStatus: "FAILED",
              imageMessage: ", no se puede conectar con el servidor",
            });
          }
          return;
        }
        //setting up image upload api call
        let pathParams = { resource: "image" };
        let pathTemplate = "/{resource}";
        let additionalParams = {
          headers: {
            sessionID: this.state.ucid,
            "Content-Type": pic.type,
          },
        };
        //Invoke the image upload api
        apigClient
          .invokeApi(
            pathParams,
            pathTemplate,
            "POST",
            additionalParams,
            reader.result.split(",")[1]
          )
          .then(() =>
            this.setState({
              imageStatus: "COMPLETE",
              imageMessage: "",
              imageUploadAttempts: 0,
            })
          )
          .catch(() => {
            //Three attempts otherwise fail
            this.setState((prevState) => ({
              imageUploadAttempts: prevState.imageUploadAttempts + 1,
            }));
            if (this.state.imageUploadAttempts < 3) {
              this.sendImg(pic);
            } else {
              this.setState({
                imageStatus: "FAILED",
                imageMessage: ", error de red",
              });
            }
            return;
          });
      });
    };
    //On successful load calls reader.onload above
    reader.readAsDataURL(pic);
  }
}

export default App;
