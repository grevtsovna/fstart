(function () {
    renderApplications();

    function renderApplications() {
        const applications = loadApplications();

        applications.forEach((application) => {
           let appEl = document.createElement('li');
           let linkEl = document.createElement('a');
           let coverEl = document.createElement('div');
           let imgEl = document.createElement('img');
           let titleEl = document.createElement('div');
           let dateEl = document.createElement('time');
           appEl.classList.add('c-packs__item');
           linkEl.classList.add('c-packs__link', 'o-pack');
           linkEl.href = application.link;
           coverEl.classList.add('o-pack__cover');
           imgEl.classList.add('o-pack__img');
           imgEl.src = application.image;
           coverEl.appendChild(imgEl);
           linkEl.appendChild(coverEl);
           titleEl.classList.add('o-pack__title');
           titleEl.innerHTML = application.title;
           linkEl.appendChild(titleEl);
           dateEl.classList.add('o-pack__date');
           dateEl.innerHTML = formatDate(application.date);
           dateEl.dateTime = application.date.toISOString();
           linkEl.appendChild(dateEl);
           appEl.appendChild(linkEl);
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
    function getRandomElement(array) {
        return array[getRandomNumber(0,array.length)];
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