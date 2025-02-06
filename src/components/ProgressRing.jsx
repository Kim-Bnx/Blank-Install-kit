import React from "react";

const ProgressRing = ({ percentage }) => {
    const circleRadius = 20;
    const circumference = 2 * Math.PI * circleRadius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <svg width="50" height="50">
            <circle
                cx="25"
                cy="25"
                r={circleRadius}
                stroke="#e0e0e0"
                strokeWidth="5"
                fill="none"
            />
            <circle
                cx="25"
                cy="25"
                r={circleRadius}
                stroke="#4a90e2"
                strokeWidth="5"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                transform="rotate(-90 25 25)"
            />
            <text
                x="25"
                y="30"
                textAnchor="middle"
                fontSize="10"
            >{`${percentage}%`}</text>
        </svg>
    );
};

export default ProgressRing;
