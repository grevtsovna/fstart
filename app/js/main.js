import load from './load.js';
import utils from './utils.js';
import render from './render.js';

(function () {

    load.apps(data => {
        let apps = JSON.parse(data.target.responseText);
        let cutApps = utils.getUniqueRandomElement(apps, 3);
        render.sliderApps(cutApps);
    });
})();