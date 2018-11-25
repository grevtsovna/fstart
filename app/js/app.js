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
        appEl.querySelector('.o-app-page__title').innerHTML = data.title;
        let date = new Date(+data.date * 1000);
        appEl.querySelector('.o-app-header__date').innerHTML = formatDate(date);

        document.querySelector('.l-content__content').appendChild(appEl);
    }
}