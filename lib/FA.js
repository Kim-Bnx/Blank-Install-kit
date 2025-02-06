import TEMPLATES from "@/data/install.json";

const htmlParser = (data) => {
    const parser = new DOMParser();
    return parser.parseFromString(data, "text/html");
};

const initSetup = async () => {};

const initConfig = async () => {};

async function fetchTemplatePage(url) {
    const response = await fetch(url);
    const data = htmlParser(await response.text());
    console.log(data);
    /* const resForm = data.getElementById("formenvoi");
    const action = resForm.action;
    let body = {};

    resForm
        .querySelectorAll(
            'input:not([type="submit"], [type="radio"]), textarea'
        )
        .forEach((el) => {
            body[el.name] = el.value;
        });

    body.forumact_template = 1;
    body.set_homepage = 0;
    body.submit = 1;

    return { body, action }; */
}

async function postTemplate(formdata) {}

const initInstall = async (keys) => {
    const { timestamp, tid } = keys;
    const ROOT_EDIT = `/admin/?part=themes&sub=templates&mode=edit_main&extended_admin=1&tid=${tid}&_t=${timestamp}`;
    TEMPLATES.forEach((tpl) => {
        tpl.templates.forEach((item) => {
            fetchTemplatePage(ROOT_EDIT + `&l=${tpl.layout}&t=${item.id}`);
        });
        console.log(tpl);
    });
};

const initCSS = async () => {};

const initScripts = async () => {};

export { initSetup, initConfig, initInstall, initCSS, initScripts };
