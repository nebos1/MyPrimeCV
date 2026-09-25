import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import App from "./App.jsx";
import { ApplyPageMetadata } from "./page-metadata.mjs";

ApplyPageMetadata();
window.addEventListener("hashchange", ApplyPageMetadata);

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
