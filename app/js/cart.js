import { getJSON } from './load.js'

export class Cart {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartStick = document.querySelector('#cart-stick').content.querySelector('.cart-stick').cloneNode(true);
        this.quantity = this.getQuantity();
        this.cartWindow = document.querySelector('.o-modal');
        // this.total = this.getTotal();
        document.querySelector('body').appendChild(this.cartStick);
        document.addEventListener('click', this.documentClickHandler.bind(this));
        this._updateCartStick();
    }
    add(id) {
        let appIsExists = false;
        this.apps.forEach((app) => {
           appIsExists = app.id === id;
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
    loadApps() {
        let promises = this.apps.map((app) =>  getJSON(`/api/apps/${app.id}.json`));
        Promise.all(promises)
            .then((apps) => {
                this._renderCartApp(apps);
            });
    }
    _updateCart() {
        this.quantity = this.getQuantity();
        this.loadApps();
        this._updateCartStick();
    }
    _renderCartApp(apps) {
        if (document.querySelector('.o-cart-table')) {
            document.querySelector('.o-cart-table').remove();
        }
        let appsTableTemplate = document.querySelector('#main-tpl').content.querySelector('.o-cart-table');
        console.log(appsTableTemplate);
        let appsTableEl = appsTableTemplate.cloneNode(true);
        let appRowTpl = appsTableEl.querySelector('.o-cart-row').cloneNode(true);
        let total = 0;
        appsTableEl.querySelector('.o-cart-row').remove();
        apps.forEach((app) => {
            let appRowEl = appRowTpl.cloneNode(true);
            let appOrderData = this._getById(app.id);
            let totalPrice = app.price * appOrderData.quantity;
            total += totalPrice;
            appRowEl.dataset.id = app.id;
            appRowEl.querySelector('.o-cart-row__img').src = app.image_sm;
            appRowEl.querySelector('.o-cart-row__title').innerHTML = app.title;
            appRowEl.querySelector('.o-cart-table__price .o-cart-row__price').innerHTML = app.price;
            appRowEl.querySelector('.c-counter-input__input').value = appOrderData.quantity;
            appRowEl.querySelector('.o-cart-table__total .o-cart-row__price').innerHTML = totalPrice;
            appRowEl.addEventListener('click', (evt) => {
                let removeEl = appRowEl.querySelector('.o-cart-row__remove');
                if (evt.target === removeEl || removeEl.contains(evt.target)) {
                    this.remove(+evt.currentTarget.dataset.id);
                }
            });
            appsTableEl.querySelector('tbody').appendChild(appRowEl);
            document.querySelector('.c-cart').insertAdjacentElement('afterbegin', appsTableEl);
        })

    }
    _updateCartStick() {
        let quantityEl = this.cartStick.querySelector('.cart-stick__quantity');
        if (this.quantity > 0) {
            quantityEl.innerHTML = this.quantity.toString();
            quantityEl.classList.add('cart-stick__quantity_visible');
        }
    }
    getQuantity() {
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
        this.cartWindow.style.display = 'block';
        document.querySelector('body').classList.add('u-overlay');
        this.loadApps();
    }
    close() {
        this.cartWindow.style.display = 'none';
        document.querySelector('body').classList.remove('u-overlay');
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

}