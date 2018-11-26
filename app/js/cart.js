export class Cart {
    constructor() {
        this.apps = JSON.parse(localStorage.getItem('cart')) || [];
    }
    add(id) {
        let appIsExists = false;
        this.apps.forEach((app) => {
           appIsExists = app.id === id;
        });
        if (!appIsExists) {
            this.apps.push({id: id, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(this.apps));
        Cart.open('.o-modal');
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