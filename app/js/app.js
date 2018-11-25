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
            .then(response => {
                this._renderApp(response)
            }, () => {
                let errorEl = document.querySelector('template').content.querySelector('.error').cloneNode(true);
                let errorMsg = 'К сожалению, что-то пошло не так. Возможно, такая страница не существует. Вернитесь <a href="/app-page.html">назад</a> и попробуйте еще раз.'
                errorEl.querySelector('.c-text-banner__content').innerHTML = errorMsg;
                document.querySelector('.l-content__content').appendChild(errorEl);
            });
    }
    _renderApp(data) {
        let appEl = document.querySelector('template').content.querySelector('.o-app-page').cloneNode(true);
        let date = new Date(+data.date * 1000);
        let header = data.headerText;
        let appFunctions = data.functions;
        let functionTemplate = appEl.querySelector('.o-app-info__list-item');
        appEl.querySelector('.o-app-page__title').innerHTML = data.title;
        appEl.querySelector('.o-app-header__date').innerHTML = formatDate(date);
        appEl.querySelector('.o-app-header__licensed').innerHTML = header.licensedText;
        appEl.querySelector('.o-app-header__type').innerHTML = header.appType;
        appEl.querySelector('.o-app-header__developer').innerHTML = header.developer;
        appEl.querySelector('.o-app-header__sku').innerHTML = header.sku;
        appEl.querySelector('.o-app-header__requirements').innerHTML += header.requirements;
        appEl.querySelector('.o-app-header__img').src = data.image;
        appEl.querySelector('.js-add-to-cart').dataset.id = data.id;
        appFunctions.forEach((appFunction) => {
            let appFunctionEl = functionTemplate.cloneNode(true);
            functionTemplate.remove();
            appFunctionEl.innerHTML = appFunction;
            appEl.querySelector('.o-app-info__list').appendChild(appFunctionEl);
        });

        document.querySelector('.l-content__content').appendChild(appEl);
        if (document.querySelector('.o-list__link_active')) {
            document.querySelector('.o-list__link_active').classList.remove('o-list__link_active');
        }
        document.querySelector(`.o-list__link[data-id="${this.appId}"]`).classList.add('o-list__link_active');
    }
}