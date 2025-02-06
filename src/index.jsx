import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Fonction d'initialisation
function initializeInstaller() {
    let container = document.getElementById("indstall");

    if (!container) {
        container = document.createElement("div");
        container.id = "indstall";
        document.body.appendChild(container);
    }

    const root = createRoot(container); // createRoot(container!) if you use TypeScript
    root.render(<App />);
}

// Expose l'initialisation dans `window` pour Forumactif
window.BlankThemeInstaller = {
    init: initializeInstaller,
};
