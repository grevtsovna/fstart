import * as load from './load.js';
import * as render from './render.js';
import * as slider from './slider.js';
import {App} from './app.js';
import {delay, getRandomNumber} from "./utils.js";
import { Cart } from './cart.js'

let cart = new Cart();

if (document.querySelector('body').classList.contains('main')) {

    let preloader = document.querySelector('template').content.querySelector('.preloader-chasing-squares').cloneNode(true);
    document.querySelector('.c-packs__list').appendChild(preloader);

    delay(getRandomNumber(800, 1500))
        .then(() => load.apps())
        .then(apps => {
            render.sliderApps(apps);
            preloader.remove();
            new slider.Slider('.c-packs__list');
        });
}

if (document.querySelector('body').classList.contains('app')) {
    new App();
    document.addEventListener('appRendered', appRenderedHandler);
    document.addEventListener('successAddedToCart', addToCartHandler);
}

function appRenderedHandler(evt) {
    document.querySelector('.js-add-to-cart').addEventListener('click', () => {
        cart.add(evt.detail.id);
    })
}
function addToCartHandler() {
    let successMsg = document.querySelector('.o-app-header__success-add');
    successMsg.classList.add('o-app-header__success-add_active');
    delay(3000)
        .then(() => {
            successMsg.classList.remove('o-app-header__success-add_active');
        });
}