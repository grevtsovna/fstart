import * as utils from './utils.js';
import * as load from './load.js';
import {formatDate} from "./utils.js";

export class App {
    constructor() {
        this.appId = utils.getQueryVars().id ? utils.getQueryVars().id : 1;
        this._loadApp(this.appId);
    }
    _loadApp(id) {
        load.getJSON(`/api/apps/${id}.json`)
            .then(response => {this._renderApp(response)});
    }
    _renderApp(data) {
        let appEl = document.querySelector('template').content.querySelector('.o-app-page').cloneNode(true);
        let date = new Date(+data.date * 1000);
        let header = data.headerText;
        appEl.querySelector('.o-app-page__title').innerHTML = data.title;
        appEl.querySelector('.o-app-header__date').innerHTML = formatDate(date);
        appEl.querySelector('.o-app-header__licensed').innerHTML = header.licensedText;
        appEl.querySelector('.o-app-header__type').innerHTML = header.type;
        appEl.querySelector('.o-app-header__developer').innerHTML = header.developer;
        appEl.querySelector('.o-app-header__sku').innerHTML = header.sku;
        appEl.querySelector('.o-app-header__requirements').innerHTML += header.requirements;
        appEl.querySelector('.o-app-header__img').src = data.image;
        appEl.querySelector('.js-add-to-cart').dataset.id = data.id;

        document.querySelector('.l-content__content').appendChild(appEl);
    }
}