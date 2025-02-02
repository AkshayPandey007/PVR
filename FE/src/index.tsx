import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./i18n/i18n.config";
import 'mapbox-gl/dist/mapbox-gl.css';

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);


reportWebVitals();
