(function () {
    let elements = document.querySelectorAll('*');

    setInterval(function () {
        highlightElement(getRandomElement(elements));
    }, 500);
    setInterval(function () {
        removeHighlight(getRandomElement(elements));
    }, 500);

    function getRandomNumber(min , max) {
        let randomNumber = Math.random() * (max - min) + min;
        return Math.floor(randomNumber);
    }
    function getRandomElement(array) {
        return array[getRandomNumber(0,array.length)];
    }
    function highlightElement(element) {
        let color = getRandomColor();
        element.style.outline = `0.2rem solid ${color}`;
    }
    function removeHighlight(element) {
        element.style.outline = '';
    }
    function getRandomColor() {
        let red = getRandomNumber(0, 255);
        let green = getRandomNumber(0, 255);
        let blue = getRandomNumber(0, 255);
        let opacity = getRandomNumber(7, 10) / 10;
        return `rgba(${red}, ${green}, ${blue}, ${opacity})`;
    }
})();