import React, { useState } from "react";
import WizardStep from "../components/WizardStep";
import { startInstallation } from "../utils/installer";

const InstallStep = ({ selectedTemplates, selectedScripts }) => {
    const [progress, setProgress] = useState({
        css: 0,
        templates: 0,
        scripts: 0,
        steps: {
            css: [],
            templates: [],
            scripts: [],
        },
    });

    return (
        <div>
            <h1>Installation en cours...</h1>
            <WizardStep
                title="CSS"
                percentage={progress.css}
                steps={progress.steps.css}
                isActive
            />
            <WizardStep
                title="Templates"
                percentage={progress.templates}
                steps={progress.steps.templates}
            />
            <WizardStep
                title="Scripts"
                percentage={progress.scripts}
                steps={progress.steps.scripts}
            />

            <button
                onClick={() =>
                    startInstallation(
                        setProgress,
                        selectedTemplates,
                        selectedScripts
                    )
                }
            >
                Démarrer l'installation
            </button>
        </div>
    );
};

export default InstallStep;
