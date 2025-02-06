/**
 * Met la première lettre d'une chaîne en majuscule.
 * @param {string} str Chaîne à transformer
 * @returns {string} Chaîne avec première lettre en majuscule
 */
export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
