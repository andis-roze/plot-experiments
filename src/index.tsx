import * as React from "react";
import * as ReactDOM from "react-dom";
import "./index.scss";

import { App } from "./components/app/App";

const app = document.getElementById("root");

if (app) {
    ReactDOM.render(
        (
            <App />
        ),
        app
    );
}
