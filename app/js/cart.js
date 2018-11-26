export class Cart {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartStick = document.querySelector('#cart-stick').content.querySelector('.cart-stick').cloneNode(true);
        this.quantity = this.getQuantity();
        this.cartWindow = document.querySelector('.o-modal');
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
    open() {
        this.cartWindow.style.display = 'block';
        document.querySelector('body').classList.add('u-overlay');
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