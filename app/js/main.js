import * as load from './load.js';
import * as render from './render.js';

let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
document.querySelector('.c-packs__list').appendChild(preloader);
load.loadApps(apps => {
    setTimeout(() => {
        render.sliderApps(apps);
        preloader.remove();
    }, 1000);
});