export function loadApps(loadHandler) {
    const xhr = new XMLHttpRequest();
    const APPS_URL = '/api/apps.json';
    xhr.open('GET', APPS_URL, true);
    xhr.send();
    xhr.onload = loadHandler;
}
