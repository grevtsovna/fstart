import * as utils from './utils.js';
import * as load from './load.js';

export class App {
    constructor() {
        this.appId = utils.getQueryVars().id ? utils.getQueryVars().id : 1;
    }
    _loadApp() {

    }
}