import * as load from './load.js';
import * as utils from './utils.js';
import render from './render.js';


let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares');
document.querySelector('.c-packs__list').appendChild(preloader);
load.loadApps(data => {
    let apps = JSON.parse(data.target.responseText);
    let cutApps = utils.getUniqueRandomElement(apps, 3);
    setTimeout(() => {
        render.sliderApps(cutApps);
        preloader.remove();
    }, 1000);
});