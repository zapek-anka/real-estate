class RealEstate {
    constructor() {
        this.showMore = document.querySelector('.js-show-more');
        this.scrollTop = document.querySelector('.js-go-up');
        this.hiddenItems = [...document.querySelectorAll('.js-hidden')];
        this.showMore.addEventListener('click', this.showHidden.bind(this));
        this.scrollTop.addEventListener('click', this.goUp.bind(this));
        this.anchors = [...document.querySelectorAll('a[href^="#"]')];
        this.anchors.forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });
    }

    showHidden() {
        this.hiddenItems.forEach((item) => {
            item.classList.remove('m-hidden');
        });
        this.showMore.classList.add('m-hidden');
    }

    goUp() {
        window.scrollTo({top: 0, behavior: 'smooth'});
    }
}

new RealEstate();
