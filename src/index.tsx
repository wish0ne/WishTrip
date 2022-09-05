import React from "react";
import * as AFRAME from "aframe";
import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient(); //Create a client

AFRAME.registerComponent("clickhandler", {
  init: function () {
    let data = this.data;
    let el = this.el;
    el.addEventListener("click", () => {
      localStorage.setItem("arId", data);
      const modal = document.querySelector(".modal");
      modal.classList.add("half");
    });
    window.addEventListener("gps-camera-update-position", (e) => {
      alert("camera position update");
    });
  },
});

root.render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      {/* Provide the client to app */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </RecoilRoot>,
  // </React.StrictMode>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
