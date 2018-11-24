import * as utils from "./utils.js";

export function apps() {
    const APPS_URL = '/api/apps.json';
    return get(APPS_URL)
        .then((response) => {
            let apps = JSON.parse(response);
            return utils.getUniqueRandomElement(apps, 6);
        });
}

export function get(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onload = () => {
            resolve(xhr.responseText);
        };
        xhr.onerror = () => {
            reject('Error');
        };
        xhr.send();
    });
}

/*export function loadApps(loadHandler) {
    const xhr = new XMLHttpRequest();
    const APPS_URL = '/api/apps.json';
    xhr.open('GET', APPS_URL, true);
    xhr.send();
    xhr.onload = function() {
        let apps = JSON.parse(xhr.responseText);
        let cutApps = utils.getUniqueRandomElement(apps, 6);
        loadHandler(cutApps);
    };
}*/

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
