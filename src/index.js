import React from "react";
import * as ReactDOMClient from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FirstPage from "./pages/1";
import SecondPage from "./pages/2";
import Calculus from "./pages/calculus";
import Fourthpage from "./pages/4";
const rootElement = document.getElementById("root");
const root = ReactDOMClient.createRoot(rootElement);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/1" element={<FirstPage />} />
      <Route path="/2" element={<SecondPage />} />
      <Route path="/4" element={<Fourthpage />} />
      <Route path="/calculus" element={<Calculus />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
