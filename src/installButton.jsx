import TEMPLATES from "../data/templates.json";
import CONFIG from "../data/config.json";
import { getRepoFileContent } from "./lib/API";

const LOCATION = new URL(window.location);
const ROOT = `${LOCATION.protocol}//${LOCATION.host}`;

const initialize = async () => {
    // check if we need advance settings
    const admin_keys = await fetch(ROOT)
        .then((res) => res.text())
        .then((res) => {
            const parser = new DOMParser();
            const htmlDocument = parser.parseFromString(res, "text/html");
            const admin_link = htmlDocument.querySelector('a[href^="/admin/"]');
            if (!admin_link) return false;

            const url = new URLSearchParams(admin_link.href);
            return {
                tid: url.get("tid"),
                timestamp: url.get("_tc"),
            };
        });

    if (!admin_keys) throw "must be logged and admin";

    getRepoFileContent("!Feuille%20de%20style%20CSS.css");
};

export const InstallButton = function () {
    return (
        <>
            <button onClick={initialize}>Commencer</button>
        </>
    );
};
