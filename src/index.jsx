import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App/App"


const root = createRoot(document.getElementById('app'));
root.render(<App />);