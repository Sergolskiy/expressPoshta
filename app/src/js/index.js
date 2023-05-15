
function blockScrollHandler(close = false) {
    if (!close) {
        document.querySelector('html').style.top = '-' + window.scrollY + 'px'
        document.querySelector('html').classList.toggle('block-scroll')
    }
    else {
        document.querySelector('html').classList.remove('block-scroll')
        window.scrollTo({top: Math.abs(parseInt(document.querySelector('html').style.top))})
        document.querySelector('html').style.top = ''
    }
}


function initAccordion() {
    let accordionItems = document.querySelectorAll('.js-accordion')
    accordionItems.forEach(item => {
        let accordionHead = item.querySelector('.js-accordion__head')
        let accordionBody = item.querySelector('.js-accordion__body')
        if (item.classList.contains('open') && accordionBody) {
            accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'
            setTimeout(function () {
                accordionBody.style.maxHeight = 'initial'
            }, 300)
        }
        if (accordionHead) {
            accordionHead.addEventListener('click', function() {
                if (item.classList.contains('open')) {
                    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'
                    setTimeout(function () {
                        accordionBody.style.maxHeight = 0
                    }, 50)
                }
                else {
                    accordionBody.style.maxHeight = accordionBody.scrollHeight + 'px'
                    setTimeout(function () {
                        accordionBody.style.maxHeight = 'initial'
                    }, 300)
                }
                item.classList.toggle('open')
            })
        }
    })
}

function initTabs() {
    let tabs = document.querySelectorAll('[data-tabs]')
    tabs.forEach(item => {
        let tabItems = item.querySelectorAll('[data-tab]')
        tabItems.forEach(tItem => {
            tItem.addEventListener('click', function () {
                if (this.classList.contains('active')) return
                let currentActiveTab = item.querySelector('.active[data-tab]')
                let currentActiveTabContent = item.querySelector('.active[data-tab-content]')
                let nextActiveTabContent = item.querySelector(`[data-tab-content="${this.getAttribute('data-tab')}"]`)

                this.classList.add('active')
                if (currentActiveTab) currentActiveTab.classList.remove('active')
                if (currentActiveTabContent) currentActiveTabContent.classList.remove('active')
                if (nextActiveTabContent) nextActiveTabContent.classList.add('active')
            })
        })
    })
}

function initLanguageMenu() {
    let blocks = document.querySelectorAll('.header__languages')
    blocks.forEach(block => {
        // let block = document.querySelector('.header__languages')
        block.addEventListener('click', (e) => {
            let target = e.target
            if (target.classList.contains('header__languages-item')) {
                document.querySelectorAll('.header__languages-selected')[0].innerHTML = target.innerHTML
                document.querySelectorAll('.header__languages-selected')[1].innerHTML = target.innerHTML
            }

            target.closest('.header__languages').classList.toggle('open')
        })
    })

    document.addEventListener('click', (e) => {
        let target = e.target
        if(target.closest('.header__languages')) {
            return
        }
        if(document.querySelector('.header__languages.open')) {
            document.querySelector('.header__languages.open').classList.toggle('open')
        }
    })
}

function initShowBlock() {
    let btn = document.getElementById('detail-show')
    if(!btn) return
    btn.addEventListener('click', (e) => {
        e.preventDefault()
        let block = document.querySelector('.who-we__txt')
        if(block.classList.contains('show')) {
            btn.innerHTML = 'Детальніше'
        } else {
            btn.innerHTML = 'Скрити'
        }
        block.classList.toggle('show')

    })
}

function initShowMobileMenu() {
    let btns = document.querySelectorAll('.mobile-menu-btn')
    btns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            let block = document.querySelector('.header-mobile')
            block.classList.toggle('open')

        })
    })
}

document.addEventListener('DOMContentLoaded', function() {

    initLanguageMenu()
    initShowBlock()
    initShowMobileMenu()
    initTabs()

    $('.form-select').select2({
        minimumResultsForSearch: -1,
        // placeholder: $(this).data('placeholder'),
    });

    // if (document.querySelector('.site-datepicker')) {
    //     const picker = datepicker('.site-datepicker input')
    // }
    //
    // $('.form-select').select2({
    //     minimumResultsForSearch: -1,
    //     placeholder: $(this).data('placeholder'),
    // });
    //
    // $('.form-select-multiple').select2({
    //     multiple: true,
    //     placeholder: $(this).data('placeholder'),
    // });
    //
    // Inputmask({"mask": "+38 (999) 999 99 99"}).mask(".js-phone-input");
    //
    // if (document.querySelector('.home-slider')) {
    //     const swiper = new Swiper('.home-slider ', {
    //         loop: true,
    //         slidesPerView: 1,
    //         navigation: {
    //             nextEl: '.home-slider__nav-next',
    //             prevEl: '.home-slider__nav-prev',
    //         },
    //         pagination: {
    //             el: '.home-slider__pagination',
    //             type: 'bullets',
    //             clickable: true,
    //         },
    //         effect: 'fade',
    //         fadeEffect: { crossFade: true },
    //         on: {
    //             beforeInit: function () {
    //                 let numOfSlides = this.wrapperEl.querySelectorAll(".swiper-slide").length;
    //                 this.$el[0].classList.add(`home-slider--${numOfSlides}-slides`)
    //                 let slidesCount = document.querySelector('[data-slides-count]')
    //                 if (slidesCount) {
    //                     slidesCount.innerHTML = '' + numOfSlides
    //                 }
    //             }
    //         },
    //     });
    //
    //     swiper.on('slideChange', function () {
    //         let indexCurrentSlide = this.realIndex;
    //         let currentSlide = this.slides[indexCurrentSlide]
    //
    //         console.log(indexCurrentSlide);
    //         let slideStepIndicator = document.querySelector('.home-slider__nav-counter-step')
    //         slideStepIndicator.removeAttribute('class')
    //         slideStepIndicator.classList.add('home-slider__nav-counter-step')
    //         slideStepIndicator.classList.add(`step-${indexCurrentSlide + 1}`)
    //         let slideCounter = document.querySelector('[data-current-slide]')
    //         if (slideCounter) {
    //             slideCounter.innerHTML = '' + (indexCurrentSlide + 1)
    //         }
    //     });
    // }
    //
    //
    // const swiperCategory = new Swiper('.categories-slider ', {
    //     loop: false,
    //     slidesPerView: 10,
    //     spaceBetween: 8,
    //     navigation: {
    //         nextEl: '.categories-slider__nav-next',
    //         prevEl: '.categories-slider__nav-prev',
    //     },
    //     pagination: {
    //         el: '.categories-slider__pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     },
    //     // Responsive breakpoints
    //     breakpoints: {
    //         300: {
    //             slidesPerView: 'auto',
    //         },
    //         650: {
    //             slidesPerView: 5,
    //         },
    //         800: {
    //             slidesPerView: 6,
    //         },
    //         900: {
    //             slidesPerView: 7,
    //         },
    //         1000: {
    //             slidesPerView: 8,
    //         },
    //         1100: {
    //             slidesPerView: 9,
    //         },
    //         1200: {
    //             slidesPerView: 10,
    //         }
    //     }
    // });
    //
    // const swiperCombo = new Swiper('.combo-slider ', {
    //     loop: false,
    //     slidesPerView: 3,
    //     spaceBetween: 18,
    //     pagination: {
    //         el: '.combo-slider__pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     },
    //     on:{
    //         beforeResize() {
    //             if (window.innerWidth <= 1410) {
    //                 swiperCombo.slides.css('width', '');
    //             }
    //         }
    //     },
    //     // Responsive breakpoints
    //     breakpoints: {
    //         300: {
    //             slidesPerView: 'auto',
    //         },
    //         1410: {
    //             slidesPerView: 3,
    //         },
    //
    //     }
    // });
    //
    // const swiperCatalogCombo = new Swiper('.catalog-combo-slider ', {
    //     loop: false,
    //     slidesPerView: 3,
    //     spaceBetween: 0,
    //     pagination: {
    //         el: '.combo-slider__pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     },
    //     // Responsive breakpoints
    //     breakpoints: {
    //         300: {
    //             slidesPerView: 'auto',
    //         },
    //         1300: {
    //             slidesPerView: 3,
    //         },
    //
    //     }
    // });
    //
    // const swiperReviews = new Swiper('.reviews-slider ', {
    //     loop: false,
    //     slidesPerView: 2,
    //     spaceBetween: 18,
    //     navigation: {
    //         nextEl: '.reviews-slider__nav-next',
    //         prevEl: '.reviews-slider__nav-prev',
    //     },
    //     pagination: {
    //         el: '.reviews-slider__pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     },
    //     // Responsive breakpoints
    //     breakpoints: {
    //         320: {
    //             slidesPerView: 1,
    //         },
    //         768: {
    //             slidesPerView: 2,
    //         }
    //     }
    // });
    //
    // let productSliderThumbs = document.querySelectorAll('.product-single__thumbnail')
    // const swiperProduct = new Swiper('.product-single-slider', {
    //     loop: false,
    //     slidesPerView: 1,
    //     navigation: {
    //         nextEl: '.product-single-slider__nav-next',
    //         prevEl: '.product-single-slider__nav-prev',
    //     },
    //     pagination: {
    //         el: '.product-single-slider__pagination',
    //         type: 'bullets',
    //         clickable: true,
    //     },
    //     on: {
    //         slideChange: function () {
    //             let indexCurrentSlide = this.activeIndex;
    //             let currentActiveThumb = document.querySelector('.product-single__thumbnail.active')
    //             if (currentActiveThumb) currentActiveThumb.classList.remove('active')
    //             let nextActiveThumb = document.querySelector(`.product-single__thumbnail[data-slide="${indexCurrentSlide}"]`)
    //             if (nextActiveThumb) nextActiveThumb.classList.add('active')
    //         },
    //     },
    //     // Responsive breakpoints
    // });
    //
    // productSliderThumbs.forEach(item => {
    //     item.addEventListener('click', function() {
    //         let currentActiveThumb = document.querySelector('.product-single__thumbnail.active')
    //         if (currentActiveThumb) currentActiveThumb.classList.remove('active')
    //         this.classList.add('active')
    //         swiperProduct.slideTo(this.getAttribute('data-slide'))
    //     })
    // })

    // initHeaderMenu()
    // initPopups()
    // initShowMoreBlocks()
    // initFavBtn()
    // initCityPopup()
    // initCart()
    // initSearch()
    // initFilterTabs()
    // initTabs()
    // initFilterPopup()
    // initAccordion()
    // initQuantityInputs()
    // fileInputHandler()
    // initRating()
    // initSelectProduct()
    // initCookiesPopup()
    // initAccountSidebarBtn()
    // initCheckboxSelect()
    // initProductSlider()
    // initBuyBtn()
    // initEditBlock()






});