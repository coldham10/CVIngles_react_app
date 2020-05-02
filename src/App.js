import React from "react";
import "./App.css";

import Home from "./Home/Home.js";
import CVForm from "./CVForm/CVForm.js";
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
    this.template = require("./example.json");
    this.state = {
      formData: formData || this.template.model,
      options: options || this.template.options,
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
                  data={this.state.formData}
                  options={this.state.options}
                  setOptions={(opts) => this.setState({ options: opts })}
                  formCRUD={this.formCRUD.bind(this)}
                  handleSubmit={(e) => {
                    this.setState({
                      toSend: this.getAppData(),
                    });
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
        case "other":
          elem.name = "other" + idx++;
          break;
        case "skill":
          elem.name = "skill" + idx++;
          elem.displayName = "Habilidad " + idx;
          break;
        default:
          break;
      }
    });
    this.setState({ formData: modelCopy });
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
        newObj[key] = original.contactType
          ? original.contactType + "__" + original.data
          : original.data;
      } else {
        let children = original.data.map((item) => copyRelevant(item));
        newObj[key] = Object.assign({}, ...children);
      }
      return newObj;
    };

    return Object.assign(
      copyRelevant({ name: "model", data: this.state.formData }),
      { options: this.state.options }
    );
  }

  storeLocal(data) {
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
    } catch (e) {
      console.error("Error setting localStorage");
    }
  }

  loadLocal() {
    try {
      const retrievedData = JSON.parse(window.localStorage.getItem("formData"));
      const retrievedOpts = JSON.parse(window.localStorage.getItem("options"));
      return { formData: retrievedData, options: retrievedOpts };
    } catch (e) {
      console.error("Error retrieving localStorage");
      return { formData: null, options: null };
    }
  }
}

export default App;
