import React, { useState } from "react";
import templatesData from "../../data/install.json";

const ListItem = ({ item, isChecked, isIndeterminate, onToggle }) => {
    return (
        <label
            className={`indstall-configs-listlist-item ${
                isIndeterminate ? "indeterminate" : ""
            }`}
        >
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onToggle}
                ref={(input) => {
                    if (input) {
                        input.indeterminate = isIndeterminate;
                    }
                }}
            />
            {item.name || item}
        </label>
    );
};

const ConfigStep = ({ onNext }) => {
    const [selectedTemplates, setSelectedTemplates] = useState(new Set());
    const [selectedScripts, setSelectedScripts] = useState(new Set());

    const scripts = ["main.js", "utils.js"];

    const toggleSelection = (set, item) => {
        set((prev) => {
            const newSet = new Set(prev);
            newSet.has(item) ? newSet.delete(item) : newSet.add(item);
            return newSet;
        });
    };

    const toggleLayout = (layout) => {
        const allSelected = layout.templates.every((template) =>
            selectedTemplates.has(template)
        );
        const newSelections = new Set(selectedTemplates);

        if (allSelected) {
            layout.templates.forEach((template) =>
                newSelections.delete(template)
            );
        } else {
            layout.templates.forEach((template) => newSelections.add(template));
        }

        setSelectedTemplates(newSelections);
    };

    const toggleTemplate = (template) => {
        const newSelections = new Set(selectedTemplates);
        if (newSelections.has(template)) {
            newSelections.delete(template);
        } else {
            newSelections.add(template);
        }
        setSelectedTemplates(newSelections);
    };

    const isLayoutSelected = (layout) =>
        layout.templates.every((template) => selectedTemplates.has(template));

    const isLayoutIndeterminate = (layout) => {
        const selectedCount = layout.templates.filter((template) =>
            selectedTemplates.has(template)
        ).length;
        return selectedCount > 0 && selectedCount < layout.templates.length;
    };

    const totalTemplates = templatesData.reduce((count, layoutItem) => {
        return count + layoutItem.templates.length;
    }, 0);

    return (
        <div className="indstall-step">
            <header className="indstall-header">
                <h1>BLANK THEME</h1>
                <h2>Personnalisation de l'installation</h2>
            </header>
            <div className="indstall-wrapper">
                <div className="indstall-configs">
                    <ul className="indstall-configs-list">
                        <h2 className="indstall-configs-listTitle">
                            Templates
                            <div>
                                {selectedTemplates.size}/{totalTemplates}
                            </div>
                        </h2>
                        {templatesData.map((layout) => (
                            <div
                                className="indstall-configs-list"
                                key={layout.name}
                            >
                                <div>
                                    <ListItem
                                        item={layout.name}
                                        isChecked={isLayoutSelected(layout)}
                                        isIndeterminate={isLayoutIndeterminate(
                                            layout
                                        )}
                                        onToggle={() => toggleLayout(layout)}
                                    />
                                </div>
                                <ul className="nested-list indstall-configs-list--nested">
                                    {layout.templates.map((template) => (
                                        <li key={template.id}>
                                            <ListItem
                                                item={template} // ✅ template est une chaîne de caractères
                                                isChecked={selectedTemplates.has(
                                                    template
                                                )}
                                                onToggle={() =>
                                                    toggleTemplate(template)
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </ul>
                    <ul className="indstall-configs-list">
                        <h2 className="indstall-configs-listTitle">
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
                </div>
            </div>
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
