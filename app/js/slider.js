export class Slider {
    constructor(selector) {
        this._initialize(selector);
    }

    _initialize(selector) {
        this.viewport = document.querySelector(selector);
        this.viewport.style.overflow = 'hidden';
        this.slides = this.viewport.querySelectorAll('li');
        this.slideWidth = this.slides[0].offsetWidth;

        this.currentPosition = 1;

        this.carouselContainer = document.createElement('div');
        this.carouselContainer.classList.add('carousel-container');
        this.carouselContainer.style.whiteSpace = 'nowrap';
        this.slides.forEach((slide) => {
            this.carouselContainer.appendChild(slide);
        });

        this.viewport.appendChild(this.carouselContainer);

        this._renderControls();
        this._renderControlDot();
    }
    _goToSlide(position) {
        this.currentPosition = position;
        this.carouselContainer.style.transform = `translateX(${this.slideWidth - this.currentPosition * this.slideWidth}px)`;
        document.querySelector('.carousel-dot_active').classList.remove('carousel-dot_active');
        document.querySelector(`.carousel-dot:nth-child(${this.currentPosition + 1})`).classList.add('carousel-dot_active');
    }

    _nextSlide() {
        let position = this.currentPosition + 1;
        if (position > this.slides.length - 1) {
            position = 0;
        }
        this._goToSlide(position);
    }

    _prevSlide() {
        let position = this.currentPosition - 1;
        if (position < 0) {
            position = this.slides.length - 1;
        }
        this._goToSlide(position);
    }
    _renderControls() {
        let next = document.createElement('div');
        next.classList.add('slide-control', 'carousel-next');
        next.innerHTML = '<svg class="slide-control__icon"><use xlink:href="#right-arrow"></use></svg></div>';
        next.addEventListener('click', () => {
            this._nextSlide();
        });
        let prev = document.createElement('div');
        prev.classList.add('slide-control', 'carousel-prev');
        prev.innerHTML = '<svg class="slide-control__icon"><use xlink:href="#right-arrow"></use></svg></div>';
        prev.addEventListener('click', () => {
            this._prevSlide();
        });
        this.viewport.insertAdjacentElement('afterbegin', prev);
        this.viewport.insertAdjacentElement('afterbegin', next);
    }
    _renderControlDot() {
        let dotContainer = document.createElement('div');
        dotContainer.classList.add('dots-container');
        for (let i = 0; i < this.slides.length; i++) {
            let dot = document.createElement('span');
            dot.classList.add('carousel-dot');
            if (i === this.currentPosition) {
                dot.classList.add('carousel-dot_active');
            }
            dot.addEventListener('click', () => {
               this._goToSlide(i);
            });
            dotContainer.appendChild(dot);
        }

        this.viewport.insertAdjacentElement('beforeend', dotContainer);
    }
}