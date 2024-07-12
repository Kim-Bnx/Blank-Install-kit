import { useState } from "react";

import { InstallButton } from "./components/installButton";

/*
createStore({
    steps: {
        setup: {
            label: "Setup",
            percent: 0,
            items: [],
        },
        config: {
            label: "Configuration",
            percent: 0,
            items: [],
        },
        install: {
            label: "Templates",
            percent: 0,
            items: [],
        },
        css: {
            label: "CSS",
            percent: 0,
            items: [],
        },
        scripts: {
            label: "Scripts & Plugins",
            percent: 0,
            items: [],
        },
    },
});
*/

function App() {
    return (
        <>
            <h1>Vite + React</h1>
            <div className="card">
                <InstallButton />
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
        </>
    );
}

export default App;
