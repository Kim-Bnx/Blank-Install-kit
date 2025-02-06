import { fetchFilesFromGitHub, fetchFileContent } from "./github.js";
import { injectContent } from "./forumactif.js";
import { updateProgress } from "../pages/InstallStep"; // Mise à jour de l'UI

/**
 * Lance l'installation des fichiers CSS, Templates et Scripts
 * @param {function} updateProgress Fonction de mise à jour de la progression
 * @param {Array} selectedTemplates Liste des templates à installer
 * @param {Array} selectedScripts Liste des scripts à installer
 */
export async function startInstallation(
    updateProgress,
    selectedTemplates,
    selectedScripts
) {
    try {
        updateProgress(0, "Installation du CSS...", "css");
        let cssFiles = await fetchFilesFromGitHub("CSS");

        if (cssFiles.length > 0) {
            let cssContent = await fetchFileContent(cssFiles[0].download_url);
            await injectContent("css", cssContent, (message) =>
                updateProgress(100, message, "css")
            );
        }

        updateProgress(0, "Installation des templates...", "templates");
        for (let template of selectedTemplates) {
            await injectContent("template", template, (message) =>
                updateProgress(100, message, "templates")
            );
        }

        updateProgress(0, "Installation des scripts...", "scripts");
        for (let script of selectedScripts) {
            await injectContent("js", script, (message) =>
                updateProgress(100, message, "scripts")
            );
        }

        updateProgress(100, "Installation terminée avec succès !", "config");
    } catch (error) {
        console.error(error);
        updateProgress(100, "Erreur lors de l'installation", "config");
    }
}
