import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

document.body.style = "background: #e6ebe0;";

serviceWorker.unregister();

ReactDOM.render(<App />, document.getElementById("root"));
