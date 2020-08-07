import Swiper from 'swiper/bundle';

class RealEstate {
    constructor() {
        this.showMore = document.querySelector('.js-show-more');
        this.scrollTop = document.querySelector('.js-go-up');
        this.hiddenItems = [...document.querySelectorAll('.js-hidden')];
        this.anchors = [...document.querySelectorAll('a[href^="#"]')];
        this.modalClose = [...document.querySelectorAll('.js-modal-close')];
        this.openModal = [...document.querySelectorAll('.js-open-modal')];
        this.modalTabs = [...document.querySelectorAll('.js-modal-tab')];
        this.modalSections = [...document.querySelectorAll('.js-modal-section')];

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

        this.modalTabs.forEach((tab) => tab.addEventListener('click', this.changeTab.bind(this)));

        this.openModal.forEach((btn) => {
            btn.addEventListener('click', function (e) {
                e.preventDefault();
                let modalId = btn.dataset.modal;
                let modal = document.getElementById(modalId);
                modal.classList.remove('m-hidden');
                document.body.classList.add('no-scroll');
            });
        });

        this.modalClose.forEach((close) => {
            close.addEventListener('click', function (e) {
                close.closest('.js-overlay').classList.add('m-hidden');
                document.body.classList.remove('no-scroll');
            });
        });

        let swiper = new Swiper('.swiper-container', {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    changeTab(evt) {
        this.modalTabs.forEach((tab) => {
            tab.classList.remove('m-active');
        })
        this.modalSections.forEach((section) => {
            section.classList.remove('m-active');
        })
        evt.target.classList.add('m-active');
        let activeSection = document.querySelector('[data-section=' + evt.target.dataset.tab + ']');
        activeSection.classList.add('m-active');
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
