(function () {
    renderApplications();

    function renderApplications() {
        const applications = loadApplications();
        let appTemplate = document.querySelector('template').content.querySelector('.c-packs__item');

        applications.forEach((application) => {
           let appEl = appTemplate.cloneNode(true);
           let linkEl = appEl.querySelector('.c-packs__link');
           let imgEl = appEl.querySelector('.o-pack__img');
           let titleEl = appEl.querySelector('.o-pack__title');
           let dateEl = appEl.querySelector('.o-pack__date');

           linkEl.href = application.link;
           imgEl.src = application.image;
           titleEl.innerHTML = application.title;
           dateEl.innerHTML = formatDate(application.date);
           dateEl.dateTime = application.date.toISOString();
           document.querySelector('.c-packs__list').appendChild(appEl);
        });
    }
    function formatDate(date) {
        const monthList = ['января', 'Февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        let dateString = '';
        dateString += date.getDate();
        dateString += ' ' + monthList[date.getMonth()];
        dateString += ' ' + date.getFullYear();
        return dateString;
    }
    function loadApplications() {
        const applications = [
            {
                link: '#',
                title: 'Стандартный пакет',
                image: 'assets/img/packs/pack_1.jpg',
                date: new Date(2018, 3, 8)
            },
            {
                link: '#1',
                title: 'Новый ЦФТ-Банк',
                image: 'assets/img/packs/pack_2.jpg',
                date: new Date(2016, 8, 9)
            },
            {
                link: '#2',
                title: 'Каталог разработок',
                image: 'assets/img/packs/pack_3.jpg',
                date: new Date(2015, 2, 3)
            },
            {
                link: '#3',
                title: 'Финансовый мониторинг',
                image: 'assets/img/packs/pack_1.jpg',
                date: new Date(2018, 3, 8)
            },
            {
                link: '#4',
                title: 'Бухгалтерский учет',
                image: 'assets/img/packs/pack_2.jpg',
                date: new Date(2016, 8, 9)
            },
            {
                link: '#5',
                title: 'Финансовый мониторинг',
                image: 'assets/img/packs/pack_3.jpg',
                date: new Date(2015, 2, 3)
            }
        ];
        return getUniqueRandomElement(applications, 3);
    }
    function getRandomNumber(min , max) {
        let randomNumber = Math.random() * (max - min) + min;
        return Math.floor(randomNumber);
    }
    function getUniqueRandomElement(array, quantity) {
        let numbers = [];
        let elements = [];
        while (numbers.length < quantity) {
            let randomNumber = getRandomNumber(0, array.length);
            if (numbers.indexOf(randomNumber) === -1 || numbers.length === 0) {
                numbers.push(randomNumber);
            }
        }
        console.log(numbers);
        numbers.forEach((number) => {
            elements.push(array[number]);
        });
        return elements;
    }
})();