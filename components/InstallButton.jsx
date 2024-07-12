import TEMPLATES from "@/data/install.json";
import CONFIG from "@/data/config.json";
import { getRepoFileContent } from "@/lib/API";

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

    /* setup */
    await initSetup(admin_keys);
    /* config */
    await initConfig(admin_keys);
    /* install */
    await initInstall(admin_keys);
    /* css */
    await initCSS(admin_keys);
    /* scripts */
    await initScripts(admin_keys);
};

export const InstallButton = function ({ children }) {
    return (
        <>
            <button onClick={initialize}>{children}</button>
        </>
    );
};
