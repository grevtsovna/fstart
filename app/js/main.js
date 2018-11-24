import * as load from './load.js';
import * as render from './render.js';
import * as slider from './slider.js';
import * as app from './app.js';
import {delay as delay} from "./utils.js";

if (document.querySelector('body').classList.contains('main')) {

    let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
    document.querySelector('.c-packs__list').appendChild(preloader);

    delay(1000)
        .then(() => load.apps())
        .then(apps => {
            render.sliderApps(apps);
            preloader.remove();
            new slider.Slider('.c-packs__list');
        });
}

if (document.querySelector('body').classList.contains('app')) {
    let currentApp = new app.App();
}