import load from './load.js';
import utils from './utils.js';
import render from './render.js';

(function () {

    load.apps(data => {
        let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
        document.querySelector('.c-packs__list').appendChild(preloader);
        let apps = JSON.parse(data.target.responseText);
        let cutApps = utils.getUniqueRandomElement(apps, 3);
        setTimeout(() => {
            render.sliderApps(cutApps);
            preloader.remove();
        }, 1000);
    });
})();