const utils = {
    getRandomNumber: function (min, max) {
    let randomNumber = Math.random() * (max - min) + min;
    return Math.floor(randomNumber);
},
getUniqueRandomElement: function (array, quantity) {
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
},
formatDate: function (date) {
    const monthList = ['января', 'Февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    let dateString = '';
    dateString += date.getDate();
    dateString += ' ' + monthList[date.getMonth()];
    dateString += ' ' + date.getFullYear();
    return dateString;
}
};

export {utils as default};