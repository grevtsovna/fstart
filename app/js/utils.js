export function getRandomNumber(min, max) {
    let randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
}

export function getUniqueRandomElement(array, quantity) {
    let numbers = [];
    let elements = [];
    while (numbers.length < quantity) {
        let randomNumber = this.getRandomNumber(0, array.length);
        if (numbers.indexOf(randomNumber) === -1 || numbers.length === 0) {
            numbers.push(randomNumber);
        }
    }
    numbers.forEach((number) => {
        elements.push(array[number]);
    });
    return elements;
}

export function formatDate(date) {
    const monthList = ['января', 'Февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let dateString = '';
    dateString += date.getDate();
    dateString += ' ' + monthList[date.getMonth()];
    dateString += ' ' + date.getFullYear();
    return dateString;
}

export function getQueryVars() {
    let stringParams = window.location.search.slice(1).split('&');
    let paramsObj = {};
    stringParams.forEach((param) => {
        let keyValueArr = param.split('=');
        paramsObj[keyValueArr[0]] = keyValueArr[1];
    });

    return paramsObj;
}

export function delay (timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, timeout)
    });
}
