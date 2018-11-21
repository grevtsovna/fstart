import * as load from './load.js';
import * as render from './render.js';
import * as slider from './slider.js'
let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
document.querySelector('.c-packs__list').appendChild(preloader);
load.loadApps(apps => {
    setTimeout(() => {
        render.sliderApps(apps);
        preloader.remove();
        let appSlider = new slider.Slider('.c-packs__list');
    }, 1000);
});