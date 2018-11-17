import * as utils from "./utils.js";

export function loadApps(loadHandler) {
    const xhr = new XMLHttpRequest();
    const APPS_URL = '/api/apps.json';
    xhr.open('GET', APPS_URL, true);
    xhr.send();
    xhr.onload = function(data) {
        let apps = JSON.parse(data.target.responseText);
        let cutApps = utils.getUniqueRandomElement(apps, 3);
        loadHandler(cutApps);
    };
}
