import { getJSON } from './load.js'
import { delay, getRandomNumber } from './utils.js'

export class Cart {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartStick = document.querySelector('#cart-stick').content.querySelector('.cart-stick').cloneNode(true);
        this.quantity = this._getQuantity();
        this.cartWindow = document.querySelector('.o-modal');
        document.querySelector('body').appendChild(this.cartStick);
        document.addEventListener('click', this.documentClickHandler.bind(this));
        document.addEventListener('keydown', this.documentKeydownHandler.bind(this));
        this._updateCartStick();
    }
    add(id) {
        let appIsExists = false;
        this.apps.forEach((app) => {
           appIsExists = +app.id === +id;
           if (appIsExists) {
               app.quantity++;
           }
        });
        if (!appIsExists) {
            this.apps.push({id: id, quantity: 1});
        }
        this.quantity++;
        this._updateCartStick();
        localStorage.setItem('cart', JSON.stringify(this.apps));
        let addedEvent = new Event('successAddedToCart', {
            bubbles: true
        });
        document.dispatchEvent(addedEvent);
    }
    remove(id) {
        this.apps.forEach((app, index) => {
           if (+app.id === id) {
               this.apps.splice(index, 1);
           }
        });
        localStorage.setItem('cart', JSON.stringify(this.apps));
        this._updateCart();
    }
    _loadApps() {
        let promises = this.apps.map((app) =>  getJSON(`/api/apps/${app.id}.json`));
        let preloader = document.querySelector('#main-tpl').content.querySelector('.preloader-chasing-squares').cloneNode(true);
        let cartBlock = document.querySelector('.c-cart');
        cartBlock.appendChild(preloader);
        delay(getRandomNumber(800, 3000))
            .then(() => Promise.all(promises))
            .then((apps) => {
                preloader.remove();
                this._renderCartApp(apps);
            });
    }
    _updateCart() {
        this.quantity = this._getQuantity();
        this._loadApps();
        this._updateCartStick();
    }
    _renderCartApp(apps) {
        let appsTableTemplate = document.querySelector('#main-tpl').content.querySelector('.o-cart-table');
        let appsTableEl = appsTableTemplate.cloneNode(true);
        let appRowTpl = appsTableEl.querySelector('.o-cart-row').cloneNode(true);
        let total = 0;
        appsTableEl.querySelector('.o-cart-row').remove();
        apps.forEach((app) => {
            let appRowEl = appRowTpl.cloneNode(true);
            let appOrderData = this._getById(app.id);
            let totalPrice = Math.round(app.price * appOrderData.quantity * 100) / 100;
            let removeEl = appRowEl.querySelector('.o-cart-row__remove');
            let plusEl = appRowEl.querySelector('.c-counter-input__control_plus');
            let minusEl = appRowEl.querySelector('.c-counter-input__control_minus');
            let inputEl = appRowEl.querySelector('.c-counter-input__input');
            total += totalPrice;
            appRowEl.dataset.id = app.id;
            appRowEl.querySelector('.o-cart-row__img').src = app.image_sm;
            appRowEl.querySelector('.o-cart-row__title').innerHTML = app.title;
            appRowEl.querySelector('.o-cart-table__price .o-cart-row__price').innerHTML = app.price;
            inputEl.value = appOrderData.quantity;
            appRowEl.querySelector('.o-cart-table__total .o-cart-row__price').innerHTML = totalPrice;
            appRowEl.addEventListener('click', (evt) => {
                if (evt.target === removeEl || removeEl.contains(evt.target)) {
                    this.remove(+evt.currentTarget.dataset.id);
                }
                if (evt.target === plusEl || plusEl.contains(evt.target)) {
                    inputEl.value++;
                    this.quantity++;
                    this._getById(+evt.currentTarget.dataset.id).quantity++;
                    this._updateCartStick();
                    localStorage.setItem('cart', JSON.stringify(this.apps));
                    this._updateCartPrices();
                }
                if (evt.target === minusEl || minusEl.contains(evt.target)) {
                    if (inputEl.value > 1) {
                        inputEl.value--;
                        this.quantity--;
                        this._getById(+evt.currentTarget.dataset.id).quantity--;
                        this._updateCartStick();
                        localStorage.setItem('cart', JSON.stringify(this.apps));
                        this._updateCartPrices();
                    }
                }
            });
            appsTableEl.querySelector('tbody').appendChild(appRowEl);
        });
        document.querySelector('.c-cart').insertAdjacentElement('afterbegin', appsTableEl);
        let totals = (Math.round(total * 100) / 100).toString().split('.');
        document.querySelector('.o-cart__integer').innerHTML = '$' + totals[0];
        document.querySelector('.o-cart__fractional').innerHTML = totals[1];
    }
    _updateCartPrices() {
        let rows = document.querySelectorAll('.o-cart-row');
        let total = 0;
        Array.from(rows).forEach((row) => {
            let price = parseFloat(row.querySelector('.o-cart-table__price .o-cart-row__price').innerText);
            let quantity = +row.querySelector('.c-counter-input__input').value;
            let totalRow = Math.round(price * quantity * 100) / 100;
            row.querySelector('.o-cart-table__total .o-cart-row__price').innerHTML = totalRow;
            total += totalRow;
        });
        let totals = (Math.round(total * 100) / 100).toString().split('.');
        document.querySelector('.o-cart__integer').innerHTML = '$' + totals[0];
        document.querySelector('.o-cart__fractional').innerHTML = totals[1];

    }
    _updateCartStick() {
        let quantityEl = this.cartStick.querySelector('.cart-stick__quantity');
        if (this.quantity > 0) {
            quantityEl.innerHTML = this.quantity.toString();
            quantityEl.classList.add('cart-stick__quantity_visible');
        }
    }
    _getQuantity() {
        let quantity = 0;
        this.apps.forEach(app => {
            quantity += app.quantity;
        })
        return quantity;
    }
    _getById(id) {
        let searchedApp = false;
        this.apps.forEach((app) => {
            if (+app.id === +id) {
                searchedApp = app;
            }
        });
        return searchedApp;
    }
    open() {
        if (this.quantity > 0) {
            this.cartWindow.style.display = 'block';
            document.querySelector('body').classList.add('u-overlay');
            this._loadApps();
        }
    }
    close() {
        this.cartWindow.style.display = 'none';
        document.querySelector('body').classList.remove('u-overlay');
        if (document.querySelector('.o-cart-table')) {
            document.querySelector('.o-cart-table').remove();
        }
    }
    documentClickHandler(evt) {
        let target = evt.target;
        let isCartWindow = false;
        if (target === this.cartStick || this.cartStick.contains(target)) {
            this.open();
        }
        if (target === this.cartWindow ||
            this.cartWindow.contains(target) ||
            target === this.cartStick ||
            this.cartStick.contains(target)) {
            isCartWindow = true;
        }
        if (!isCartWindow) {
            this.close();
        }
    }
    documentKeydownHandler(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

}