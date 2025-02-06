import React, { useState } from "react";

const ConfigStep = ({ onNext }) => {
    const [selectedTemplates, setSelectedTemplates] = useState(new Set());
    const [selectedScripts, setSelectedScripts] = useState(new Set());

    const templates = ["index_body", "viewtopic_body", "posting_body"];
    const scripts = ["main.js", "utils.js"];

    const toggleSelection = (set, item) => {
        set((prev) => {
            const newSet = new Set(prev);
            newSet.has(item) ? newSet.delete(item) : newSet.add(item);
            return newSet;
        });
    };

    return (
        <div>
            <h1>Personnalisation de l'installation</h1>
            <h2>Templates</h2>
            {templates.map((template) => (
                <label key={template}>
                    <input
                        type="checkbox"
                        onChange={() =>
                            toggleSelection(setSelectedTemplates, template)
                        }
                    />
                    {template}
                </label>
            ))}
            <h2>Scripts</h2>
            {scripts.map((script) => (
                <label key={script}>
                    <input
                        type="checkbox"
                        onChange={() =>
                            toggleSelection(setSelectedScripts, script)
                        }
                    />
                    {script}
                </label>
            ))}
            <button
                onClick={() =>
                    onNext([...selectedTemplates], [...selectedScripts])
                }
            >
                Suivant
            </button>
        </div>
    );
};

export default ConfigStep;
