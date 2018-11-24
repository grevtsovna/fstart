import * as load from './load.js';
import * as render from './render.js';
import * as slider from './slider.js';
import * as app from './app.js';

if (document.querySelector('body').classList.contains('main')) {
    let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
    document.querySelector('.c-packs__list').appendChild(preloader);
    load.loadApps(apps => {
        setTimeout(() => {
            render.sliderApps(apps);
            preloader.remove();
            let appSlider = new slider.Slider('.c-packs__list');
        }, 1000);
    });
}

if (document.querySelector('body').classList.contains('app')) {
    let currentApp = new app.App();
}