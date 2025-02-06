import React, { useState } from "react";
import Home from "./pages/Home";
import ConfigStep from "./pages/ConfigStep";
import InstallStep from "./pages/InstallStep";

const App = () => {
    const [step, setStep] = useState("home");
    const [selectedTemplates, setSelectedTemplates] = useState([]);
    const [selectedScripts, setSelectedScripts] = useState([]);

    const goToConfig = () => setStep("config");
    const goToInstall = (templates, scripts) => {
        setSelectedTemplates(templates);
        setSelectedScripts(scripts);
        setStep("install");
    };

    return (
        <div className="indstall-container">
            {step === "home" && <Home onStart={goToConfig} />}
            {step === "config" && <ConfigStep onNext={goToInstall} />}
            {step === "install" && (
                <InstallStep
                    selectedTemplates={selectedTemplates}
                    selectedScripts={selectedScripts}
                />
            )}
        </div>
    );
};

export default App;
