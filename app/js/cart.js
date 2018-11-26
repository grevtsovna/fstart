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
    }

}