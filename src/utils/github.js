const GITHUB_BASE_URL =
    "https://api.github.com/repos/Kim-Bnx/Blank-Theme/contents";

/**
 * Récupère la liste des fichiers dans un dossier GitHub.
 * @param {string} path Chemin du dossier (ex: "CSS", "Javascript", "Templates/Layout")
 * @returns {Promise<Array>} Liste des fichiers
 */
export async function fetchFilesFromGitHub(path) {
    try {
        let response = await fetch(`${GITHUB_BASE_URL}/${path}`);
        return response.ok ? await response.json() : [];
    } catch (error) {
        console.error(
            `❌ Erreur lors de la récupération des fichiers de ${path}:`,
            error
        );
        return [];
    }
}

/**
 * Récupère le contenu d'un fichier GitHub.
 * @param {string} url URL du fichier à télécharger
 * @returns {Promise<string>} Contenu du fichier
 */
export async function fetchFileContent(url) {
    try {
        let response = await fetch(url);
        return response.ok ? await response.text() : null;
    } catch (error) {
        console.error(`❌ Erreur lors de la récupération du fichier:`, error);
        return null;
    }
}
