(function () {

    window.slider = {
        viewport: '',
        carouselContainer: '',
        slides: '',
        slideWidth: 0,
        initialize: function(selector) {
            this.viewport = document.querySelector(selector);
            this.viewport.style.overflow = 'hidden';
            this.slides = this.viewport.querySelectorAll('li');
            this.slideWidth = this.slides[0].offsetWidth;

            this.carouselContainer = document.createElement('div');
            this.carouselContainer.classList.add('carousel-container');
            this.carouselContainer.style.whiteSpace = 'nowrap';
            this.slides.forEach((slide) => {
                this.carouselContainer.appendChild(slide);
            });

            this.viewport.appendChild(this.carouselContainer);
        },
        nextSlide: function() {
            this.carouselContainer.style.transform = `translateX(-${this.slideWidth}px)`
        }
    };
})();