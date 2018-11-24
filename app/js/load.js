import * as utils from "./utils.js";

export function apps() {
    const APPS_URL = '/api/apps.json';
    return getJSON(APPS_URL)
        .then((apps) => {
            return utils.getUniqueRandomElement(apps, 6);
        });
}

export function getJSON(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        };
        xhr.onerror = () => {
            reject('Error');
        };
        xhr.send();
    });
}

export function loadSingleApp(id, loadHandler) {
    const xhr = new XMLHttpRequest();
    const APPS_URL = `/api/apps/${id}.json`;
    xhr.open('GET', APPS_URL, true);
    xhr.send();
    xhr.onload = function() {
        let app = JSON.parse(xhr.responseText);
        loadHandler(app);
    };
}
