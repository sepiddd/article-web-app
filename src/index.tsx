import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "antd/dist/antd.css";
import "draft-js/dist/Draft.css";

import "./index.scss";
/**I have to disable React.StrictMode due to the issue on antd with React 17 */

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
