import React, { useState } from "react";

const ListItem = ({ item, selected, onSelect }) => {
    return (
        <label>
            <input type="checkbox" onChange={() => onSelect(selected, item)} />
            {item}
        </label>
    );
};

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
        <div className="indstall-step">
            <header className="indstall-header">
                <h1>BLANK THEME</h1>
                <h2>Personnalisation de l'installation</h2>
            </header>
            <div className="indstall-wrapper">
                <div className="indstall-configs">
                    <ul className="indstall-configs-list">
                        <h2 className="install-configs-listTitle">
                            Templates
                            <div>
                                {selectedTemplates.size}/{templates.length}
                            </div>
                        </h2>
                        {templates.map((template) => (
                            <ListItem
                                key={template}
                                item={template}
                                selected={setSelectedTemplates}
                                onSelect={toggleSelection}
                            />
                        ))}
                    </ul>
                    <ul className="indstall-configs-list">
                        <h2 className="install-configs-listTitle">
                            Scripts
                            <div>
                                {selectedScripts.size}/{scripts.length}
                            </div>
                        </h2>
                        {scripts.map((script) => (
                            <ListItem
                                key={script}
                                item={script}
                                selected={setSelectedScripts}
                                onSelect={toggleSelection}
                            />
                        ))}
                    </ul>
                    <button
                        onClick={() =>
                            onNext([...selectedTemplates], [...selectedScripts])
                        }
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfigStep;
