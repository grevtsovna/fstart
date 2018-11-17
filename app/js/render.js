import utils from './utils.js';

const render = {
    sliderApps: function (apps) {
        let appTemplate = document.querySelector('template').content.querySelector('.c-packs__item');

        apps.forEach(application => {
            let appEl = appTemplate.cloneNode(true);
            let linkEl = appEl.querySelector('.c-packs__link');
            let imgEl = appEl.querySelector('.o-pack__img');
            let titleEl = appEl.querySelector('.o-pack__title');
            let dateEl = appEl.querySelector('.o-pack__date');
            let date = new Date(application.date);

            linkEl.href = application.link;
            imgEl.src = application.image;
            titleEl.innerHTML = application.title;
            dateEl.innerHTML = utils.formatDate(date);
            dateEl.dateTime = date.toISOString();
            document.querySelector('.c-packs__list').appendChild(appEl);
        });
    }
};

export {render as default};