import { capitalize } from "./helpers";

/**
 * Crée une iframe pour charger une page d'administration Forumactif.
 * @param {string} url URL de la page d'administration
 * @param {function} onLoadCallback Fonction à exécuter une fois l'iframe chargée
 */
export function createIframe(url, onLoadCallback) {
    let iframe = document.createElement("iframe");
    iframe.src = url;
    iframe.style.width = "100%";
    iframe.style.height = "600px";
    iframe.style.position = "fixed";
    iframe.style.top = "50px";
    iframe.style.left = "50%";
    iframe.style.transform = "translateX(-50%)";
    iframe.style.zIndex = "9999";
    iframe.style.border = "1px solid black";
    document.body.appendChild(iframe);

    iframe.onload = () => onLoadCallback(iframe);
}

/**
 * Injecte un fichier (CSS, JS ou Template) dans Forumactif.
 * @param {string} type Type de fichier ("css", "js", "template")
 * @param {string} content Contenu du fichier
 * @param {function} updateProgress Fonction de mise à jour de la progression
 * @param {object} auth Informations d'authentification Forumactif
 * @param {object} additionalData Données supplémentaires (id du template, layout)
 */
export function injectContent(
    type,
    content,
    updateProgress,
    auth,
    additionalData = {}
) {
    let url;

    switch (type) {
        case "css":
            url = `/admin/?part=themes&sub=logos&mode=css&tid=${auth.tid}&_tc=${auth._tc}`;
            break;
        case "js":
            url = `/admin/index.forum?part=themes&sub=javascript`;
            break;
        case "template":
            if (!additionalData.templateId || !additionalData.layout) {
                console.error(
                    "❌ Informations manquantes pour l'injection de template."
                );
                return;
            }
            url = `/admin/?part=themes&sub=templates&mode=edit_main&t=${
                additionalData.templateId
            }&l=${capitalize(additionalData.layout)}&extended_admin=1&tid=${
                auth.tid
            }&_t=${auth._tc}`;
            break;
        default:
            console.error(`❌ Type d'injection inconnu : ${type}`);
            return;
    }

    createIframe(url, (iframe) => {
        let iframeDocument =
            iframe.contentDocument || iframe.contentWindow.document;
        let textarea = iframeDocument.querySelector("textarea#edit_code");

        if (!textarea) {
            console.error(`❌ Impossible de trouver l'éditeur pour ${type}.`);
            return;
        }

        textarea.value = content;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));

        let saveButton = iframeDocument.querySelector("input[type='submit']");
        if (saveButton) {
            console.log(`💾 Sauvegarde automatique du ${type}...`);
            saveButton.click();
            updateProgress(`Injection du ${type} terminée.`);
        } else {
            console.error(`❌ Bouton de validation introuvable pour ${type}.`);
        }
    });
}
