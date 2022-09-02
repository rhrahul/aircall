import "./css/body.css";
import "./css/app.css";

import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { AnimateSharedLayout, motion } from "framer-motion/dist/framer-motion";

const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
  <AnimateSharedLayout type="crossfade">
    <BrowserRouter>
      <ReactTooltip
        id="tooltip-main"
        effect="solid"
        className="!p-2 !rounded-lg dark:!bg-slate-200 dark:!text-black"
        arrowColor="transparent"
      />
      <App />
    </BrowserRouter>
  </AnimateSharedLayout>
);
