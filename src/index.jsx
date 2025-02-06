import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// Fonction d'initialisation
function initializeInstaller() {
    let container = document.getElementById("blank-theme-installer");

    if (!container) {
        container = document.createElement("div");
        container.id = "blank-theme-installer";
        document.body.appendChild(container);
    }

    ReactDOM.render(<App />, container);
}

// Expose l'initialisation dans `window` pour Forumactif
window.BlankThemeInstaller = {
    init: initializeInstaller,
};
