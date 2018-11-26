export class Cart {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartStick = document.querySelector('#cart-stick').content.querySelector('.cart-stick').cloneNode(true);
        this.quantity = this.getQuantity();
        document.querySelector('body').appendChild(this.cartStick);
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
        // Cart.open('.o-modal');
        console.log(this.apps);
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
    static open(selector) {
        document.querySelector(selector).style.display = 'block';
        document.querySelector('body').classList.add('u-overlay');
        document.addEventListener('click', Cart.documentClickHandler);
    }
    static close() {
        document.querySelector('.o-modal').style.display = 'none';
        document.querySelector('body').classList.remove('u-overlay');
        document.removeEventListener('click', Cart.documentClickHandler);
    }
    static documentClickHandler(evt) {
        let target = evt.target;
        let modal =  document.querySelector('.o-modal');
        let openBtn = document.querySelector('.js-add-to-cart');
        let isModal = target === modal || modal.contains(target) || target === openBtn;
        if (!isModal) {
            Cart.close();
        }
    }

}