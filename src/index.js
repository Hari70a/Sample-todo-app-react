import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
// import { faHighlighter } from "@fortawesome/free-regular-svg-icons";

// import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import Router from "./Router";
import store from "./Store/";

library.add(faPen, faTrash);

ReactDOM.render(
  <Provider store={store}>
    <Router />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
