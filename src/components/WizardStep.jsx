import React from "react";
import ProgressRing from "./ProgressRing";

const WizardStep = ({ title, percentage, steps, isActive }) => {
    return (
        <div className={`progress-section ${isActive ? "active" : "hidden"}`}>
            <div className="progress-header">
                <span>{title}</span>
                <ProgressRing percentage={percentage} />
            </div>
            <ul className="progress-list">
                {steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    );
};

export default WizardStep;
