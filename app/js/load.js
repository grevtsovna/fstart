const xhr = new XMLHttpRequest();

const APPS_URL = '/api/apps.json';

const load = {
    apps: function (loadHandler) {
        xhr.open('GET', APPS_URL, true);
        xhr.send();
        xhr.onload = loadHandler;
    }
};

export {load as default};