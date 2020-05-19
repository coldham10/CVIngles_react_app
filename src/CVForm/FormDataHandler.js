import React from "react";
import AWS from "aws-sdk/global";
import apigClientFactory from "aws-api-gateway-client";

import CVForm from "./CVForm.js";

import { cognito_id } from "../keys.js";

AWS.config.region = "us-east-1";
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
  IdentityPoolId: cognito_id,
});

const uploadEndpont =
  "https://micezq8w65.execute-api.us-east-1.amazonaws.com/test";

class FormDataHandler extends React.Component {
  constructor(props) {
    super(props);
    this.options = props.options;
    this.ucid = props.ucid;
    this.setOptions = props.setOptions;
    this.template = props.template;
    this.state = {
      formData: props.loadedData || this.template.model,
    };
  }

  render() {
    return (
      <CVForm
        data={this.state.formData}
        options={this.options}
        ucid={this.state.ucid}
        setOptions={(opts) => this.setOptions(opts)}
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
        sendImg={(pic) => this.sendImg(pic)}
      />
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
      { options: this.options }
    );
  }

  storeLocal(data) {
    if (data === undefined) {
      data = { ...this.state };
      data.options = this.options;
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

  sendData(data) {
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
          sessionID: this.ucid,
        },
      };
      apigClient
        .invokeApi(pathParams, pathTemplate, "POST", additionalParams, data)
        .then(function (result) {
          console.log("upload success");
          // TODO: so long as photo not still uploading allow (or initiate) redirect to checkout
        })
        .catch(function (result) {
          //TODO implement funtion to stop payment if no upload.
        });
    });
  }

  sendImg(pic) {
    if (pic === undefined) return;
    console.log(pic);
    let reader = new FileReader();
    reader.onload = () => {
      AWS.config.credentials.refresh(() => {
        let credentials = AWS.config.credentials.data.Credentials;
        let apigClient = apigClientFactory.newClient({
          invokeUrl: uploadEndpont,
          region: "us-east-1",
          accessKey: credentials.AccessKeyId,
          secretKey: credentials.SecretKey,
          sessionToken: credentials.SessionToken,
        });
        //image upload
        let pathParams = { resource: "image" };
        let pathTemplate = "/{resource}";
        let additionalParams = {
          headers: {
            sessionID: this.ucid,
            "Content-Type": pic.type,
          },
        };
        apigClient
          .invokeApi(
            pathParams,
            pathTemplate,
            "POST",
            additionalParams,
            reader.result.split(",")[1]
          )
          .then(function (result) {
            console.log("image upload success");
            // TODO:
          })
          .catch(function (result) {
            console.warn("image upload failure");
            //TODO implement funtion to stop payment if no upload.
          });
      });
    };
    reader.readAsDataURL(pic);
    //reader.readAsArrayBuffer(pic);
  }
}

export default FormDataHandler;
