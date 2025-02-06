import React from "react";

const Home = ({ onStart }) => {
    return (
        <div className="installer-container">
            <h1>BLANK THEME</h1>
            <p>Thème de base pour Forumactif</p>
            <button onClick={onStart}>Installer</button>
        </div>
    );
};

export default Home;
