export class Slider {
    constructor(selector) {
        this._initialize(selector);
    }

    _initialize(selector) {
        this.viewport = document.querySelector(selector);
        this.viewport.style.overflow = 'hidden';
        this.slides = this.viewport.querySelectorAll('li');
        this.slideWidth = this.slides[0].offsetWidth;

        this.currentPosition = 0;

        this.carouselContainer = document.createElement('div');
        this.carouselContainer.classList.add('carousel-container');
        this.carouselContainer.style.whiteSpace = 'nowrap';
        this.slides.forEach((slide) => {
            this.carouselContainer.appendChild(slide);
        });

        this.viewport.appendChild(this.carouselContainer);

        this._renderControls();
    }

    _nextSlide() {
        this.currentPosition++;
        if (this.currentPosition > this.slides.length - 3) {
            this.currentPosition = 0;
        }
        this.carouselContainer.style.transform = `translateX(-${this.currentPosition * this.slideWidth}px)`;
        console.log('currentPosition:' + this.currentPosition);
    }

    _prevSlide() {
        this.currentPosition--;
        if (this.currentPosition < 0) {
            this.currentPosition = this.slides.length - 3;
        }
        this.carouselContainer.style.transform = `translateX(-${this.currentPosition * this.slideWidth}px)`;
        console.log('currentPosition:' + this.currentPosition);
    }
    _renderControls() {
        let next = document.createElement('div');
        next.innerHTML = 'next';
        next.addEventListener('click', () => {
            this._nextSlide();
        });
        let prev = document.createElement('div');
        prev.innerHTML = 'prev';
        prev.addEventListener('click', () => {
            this._prevSlide();
        });
        this.viewport.insertAdjacentElement('beforebegin', prev);
        this.viewport.insertAdjacentElement('beforebegin', next);
    }
    _calculatePosition() {

    }
}