import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { initContract } from "./utils";
import Mypokemons from "./Components/Mypokemons"
import { BrowserRouter, Routes, Route } from "react-router-dom";
window.nearInitPromise = initContract()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}></Route>
            <Route path="/deck" element={<Mypokemons />}></Route>

          </Routes>
        </BrowserRouter>
      </React.StrictMode>
    );
  })
  .catch(console.error);
