class RealEstate {
    constructor() {
        this.showMore = document.querySelector('.js-show-more');
        this.scrollTop = document.querySelector('.js-go-up');
        this.hiddenItems = [...document.querySelectorAll('.js-hidden')];
        this.anchors = [...document.querySelectorAll('a[href^="#"]')];
        this.modalClose = [...document.querySelectorAll('.js-modal-close')];
        this.openModal = [...document.querySelectorAll('.js-open-modal')];

        this.showMore.addEventListener('click', this.showHidden.bind(this));
        this.scrollTop.addEventListener('click', this.goUp.bind(this));

        this.anchors.forEach((anchor) => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        this.openModal.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let modalId = btn.dataset.modal;
                let modal = document.getElementById(modalId);
                modal.classList.remove('m-hidden');
            });
        });

        this.modalClose.forEach((close) => {
            close.addEventListener('click', function (e) {
                close.closest('.js-overlay').classList.add('m-hidden');
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
