import React from "react";

const Home = ({ onStart }) => {
    return (
        <div className="indstall-step">
            <h1>BLANK THEME</h1>
            <p>Thème de base pour Forumactif</p>
            <button className="indstall-button" onClick={onStart}>
                Installer
            </button>
        </div>
    );
};

export default Home;
