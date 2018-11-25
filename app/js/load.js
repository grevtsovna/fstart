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
            console.log(xhr.status);
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject();
            }
        };
        xhr.onerror = () => {
            reject();
        };
        xhr.send();
    });
}