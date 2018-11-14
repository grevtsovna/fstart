(function () {
    window.slider = slider;
    function slider(selector) {
        let viewport = document.querySelector(selector);
        let slides = viewport.querySelectorAll('li');
        let carouselContainer = document.createElement('div');

        carouselContainer.classList.add('carousel-container');
        carouselContainer.style.whiteSpace = 'nowrap';
        viewport.style.overflow = 'hidden';
        slides.forEach((slide) => {
            carouselContainer.appendChild(slide);
        });

        viewport.appendChild(carouselContainer);
        console.dir(slides[0].offsetWidth);
    }
})();