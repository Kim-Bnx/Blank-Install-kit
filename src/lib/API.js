const ROOT = "https://api.github.com/repos/gp-kim/Blank-Theme/contents/";

/**
 *
 * @param {string} str
 * @description Decode base64, but utf8 friendly
 * @returns {string}
 */
function decode(str) {
    return decodeURIComponent(
        atob(str)
            .split("")
            .map(function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join("")
    );
}

/**
 *
 * @param {string} path
 * @description
 * @returns {string}
 */
const getRepoFileContent = async (path) => {
    return await fetch(ROOT + path)
        .then((res) => res.json())
        .then((res) => {
            return decode(res.content);
        });
};

export { getRepoFileContent };
