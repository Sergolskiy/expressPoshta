function initHeaderMenu() {
    let headerTrigger = document.querySelector('.header__menu-icon')
    let headerMenuPopup = document.querySelector('.sidebar-popup')

    if (headerTrigger && headerMenuPopup) {
        headerTrigger.addEventListener('click', function() {
            headerTrigger.classList.toggle('active')
            headerTrigger.parentNode.classList.toggle('active')
            headerMenuPopup.classList.toggle('open')
            blockScrollHandler(!headerTrigger.classList.contains('active'))
        })
        headerMenuPopup.addEventListener('click', function (e){
            if (e.target.classList.contains('sidebar-popup') || e.target.classList.contains('sidebar__close-icon') || e.target.closest('.sidebar__close-icon')) {
                blockScrollHandler(true)
                headerMenuPopup.classList.remove('open')
                headerTrigger.classList.remove('active')
                headerTrigger.parentNode.classList.remove('active')
            }
        })
    }
}

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

function initPopups() {
    let popupOpenTriggers = document.querySelectorAll('[data-open]')
    popupOpenTriggers.forEach(item => {
        item.addEventListener('click', function () {
            let popup = document.querySelector(`[data-popup="${item.getAttribute('data-open')}"]`)
            if (popup) {
                blockScrollHandler()
                popup.classList.add('open')
            }
        })
    })

    let popupCloseTriggers = document.querySelectorAll('.popup__close-icon, [data-close]')
    popupCloseTriggers.forEach(item => {
        item.addEventListener('click', function() {
            blockScrollHandler(true)
            item.closest('.popup').classList.remove('open')
        })
    })

    document.addEventListener('click', function (e){
        if (e.target.classList.contains('popup') || e.target.classList.contains('popup__wrapper')) {
            blockScrollHandler(true)
            e.target.classList.remove('open')
            if (e.target.classList.contains('popup__wrapper')) e.target.closest('.popup').classList.remove('open')
        }
    })

    let initLocationPopupWrap = document.querySelector('.init-location-popup__wrap')
    let initLocationPopup = document.querySelector('.init-location-popup')

    if (initLocationPopupWrap && initLocationPopup) {
        initLocationPopupWrap.addEventListener('click', function () {
            initLocationPopupWrap.classList.remove('open')
            initLocationPopup.classList.add('close')
        })
        let initLocationCloseTrigger = document.querySelectorAll('[data-close-init-location]')
        initLocationCloseTrigger.forEach(item => {
            item.addEventListener('click', function () {
                initLocationPopupWrap.classList.remove('open')
                initLocationPopup.classList.add('close')
            })
        })
    }
}

function initFavBtn() {
    let favBtns = document.querySelectorAll('.product-card__favorite-btn, .product-single__favorite-btn')
    favBtns.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('active')
        })
    })
}

function initQuantityInputs() {
    let qElements = document.querySelectorAll('.js-quantity')
    qElements.forEach(item => {
        let qInput = item.querySelector('.js-quantity-input')
        let qPlus = item.querySelector('.js-quantity-plus')
        let qMinus = item.querySelector('.js-quantity-minus')

        if (qInput && qMinus) {
            qMinus.addEventListener('click', function () {
                if (qInput.value <= 1) return
                qInput.value = +qInput.value - 1
            })
        }
        if (qInput && qPlus) {
            qPlus.addEventListener('click', function () {
                qInput.value = +qInput.value + 1
            })
        }
    })
}

function initAutoresizeTextareas() {
    let textareaItems = document.querySelectorAll('.js-site-textarea textarea');
    textareaItems.forEach(item => {
        item.addEventListener('input', function() {
            this.style.height = this.scrollHeight + 1 + "px";
        });
    });
}

function initInputIcons() {
    let inputIcons = document.querySelectorAll('.input__icon')
    inputIcons.forEach(item => {
        item.addEventListener('click', function (e) {
            let relatedInput = item.parentNode.querySelector('input')
            if (relatedInput) {
                e.stopPropagation()
                relatedInput.focus()
            }
        })
    })
}

function initCityPopup() {
    let cityItems = document.querySelectorAll('.city-popup__item-value')
    let locationItems = document.querySelectorAll('.location-select')
    let cityPopup = document.querySelector('[data-popup="location-select"]')
    cityItems.forEach(item => {
        item.addEventListener('click', function() {
            locationItems.forEach(locItem => {
                if (locItem.querySelector('.location-select__selected-value')) {
                    locItem.querySelector('.location-select__selected-value').innerHTML = item.innerHTML
                }
            })
            if (cityPopup) {
                cityPopup.classList.remove('open')
                blockScrollHandler(true)
            }
        })
    })

    let citySearch = document.querySelector('[data-search="city"]')
    if (citySearch) {
        citySearch.addEventListener('input', function() {
            let foundItems = [...cityItems].filter(item => {
                return item.innerHTML.toLowerCase().indexOf(this.value.toLowerCase()) !== -1
            })
            cityItems.forEach(item => {
                item.parentNode.classList.add('hide')
            })
            foundItems.forEach(item => {
                item.parentNode.classList.remove('hide')
            })
        })
    }
}

function initCart() {
    let cartTriggers = document.querySelectorAll('[data-cart]')
    cartTriggers.forEach(item => {
        item.addEventListener('click', function () {
            let cartPopup = document.querySelector('.header-cart')
            if (cartPopup) {
                cartPopup.classList.toggle('active')
            }
        })
    })
}

function initShowMoreBlocks() {
    let showMoreBlocks = document.querySelectorAll('.js-with-spoiler')
    showMoreBlocks.forEach(item => {
        let foundBtnFlag = false
        let childrenArray = [...item.children]
        childrenArray.forEach(childItem => {
            if (foundBtnFlag) {
                childItem.classList.add('d-none')
            }
            else if (!foundBtnFlag && childItem.classList.contains('show-more-btn')) {
                foundBtnFlag = true
                childItem.addEventListener('click', function() {
                    if (this.classList.contains('open')) {
                        let hiddenItems = item.querySelectorAll('.show-text')
                        hiddenItems.forEach(hiddenItem => {
                            hiddenItem.classList.remove('show-text')
                            hiddenItem.classList.add('d-none')
                        })
                        this.classList.remove('open')
                    }
                    else {
                        let hiddenItems = item.querySelectorAll('.d-none')
                        hiddenItems.forEach(hiddenItem => {
                            hiddenItem.classList.remove('d-none')
                            hiddenItem.classList.add('show-text')
                        })
                        this.classList.add('open')
                    }
                    let bufferText = this.getAttribute('data-text')
                    this.setAttribute('data-text', this.innerHTML)
                    this.innerHTML = bufferText
                })
            }
        })
        // item.addEventListener('click', function(e) {
        //     console.log(this.offsetTop, this.parentNode.offsetTop);
        // })
    })
}

function initSearch() {
    let searchInput = document.querySelector('.search__input[data-search]')
    let searchMobileBtn = document.querySelector('.search__btn--mob')
    let searchOverlay = document.querySelector('.search-popup')
    let clearSearch = document.querySelector('.search__icon--clear')

    if (searchInput) {

        searchInput.addEventListener('input', function() {

            if (this.value && searchOverlay && !searchOverlay.classList.contains('open')) {
                searchOverlay.classList.add('open')
                this.parentNode.classList.add('active')
                blockScrollHandler()
            }
        })

        searchMobileBtn.addEventListener('click', function () {
            searchOverlay.classList.add('open')
            this.parentNode.querySelector('.search').classList.add('active')
            blockScrollHandler()
        })

        if (searchOverlay) {
            searchOverlay.addEventListener('click', function(e) {
                if (e.target.classList.contains('search-popup')) {
                    searchOverlay.classList.remove('open')
                    searchInput.parentNode.classList.remove('active')
                    blockScrollHandler(true)
                }
            })
        }

        if (clearSearch) {
            clearSearch.addEventListener('click', function () {
                searchInput.value = ''
            })
        }
    }
}

//REMOVE LATER (use the one below)
function initFilterTabs() {
    let filterGroups = document.querySelectorAll('.filter__group')
    filterGroups.forEach(item => {
        let groupHead = item.querySelector('.filter__head')
        let groupBody = item.querySelector('.filter__body')
        if (item.classList.contains('open') && groupBody) {
            groupBody.style.maxHeight = groupBody.scrollHeight + 'px'
        }
        if (groupHead) {
            groupHead.addEventListener('click', function() {
                if (item.classList.contains('open')) {
                    groupBody.style.maxHeight = 0
                }
                else {
                    groupBody.style.maxHeight = groupBody.scrollHeight + 'px'
                }
                item.classList.toggle('open')
            })
        }
    })
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

function initFilterPopup() {
    let popupTrigger = document.querySelector('.catalog__settings-filter-btn')
    if (popupTrigger) {
        popupTrigger.addEventListener('click', function() {
            let filter = document.querySelector('.catalog__filter')
            if (filter) {
                filter.classList.add('active')
            }
        })
    }

    let closeBtn = document.querySelector('.catalog__filter-close')
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            let filter = document.querySelector('.catalog__filter')
            if (filter) {
                filter.classList.remove('active')
            }
        })
    }
}

function fileInputHandler() {
    let fileInputs = document.querySelectorAll('.site-fileinput:not(.product-popup__fileinput)')
    fileInputs.forEach(item => {
        let dropContainer = item.querySelector('.site-fileinput__img')
        if (dropContainer) {
            document.addEventListener('drop', function(e) {
                if (e.target.classList.contains('site-fileinput__img')) {
                    let fileInput = item.querySelector('input[type="file"]')
                    //проверяем поле на существование
                    if (fileInput) {
                        //присваиваем файл инпуту
                        fileInput.files = e.dataTransfer.files
                        let imgSrc = URL.createObjectURL(fileInput.files[0])
                        dropContainer.classList.add('site-fileinput__img--with-img')
                        dropContainer.setAttribute('style', `background-image: url(${imgSrc})`)
                        let placeholder = dropContainer.querySelector('.avatar__placeholder')
                        if (placeholder) {
                            placeholder.classList.add('d-none')
                        }

                        let avatarControls = item.querySelector('.site-fileinput__delete-btn')
                        if (avatarControls) {
                            avatarControls.classList.remove('d-none')
                        }
                    }

                    e.preventDefault()
                }
            });
            document.addEventListener('dragover', function(e) {
                if (e.target.classList.contains('site-fileinput__img')) {
                    e.preventDefault()
                }
            });
            document.addEventListener('dragenter', function(e) {
                if (e.target.classList.contains('site-fileinput__img')) {
                    e.preventDefault()
                }
            });
        }

        let fileInput = item.querySelector('input[type="file"]')
        if (fileInput) {
            fileInput.addEventListener('change', function () {
                let imgSrc = URL.createObjectURL(fileInput.files[0])
                dropContainer.classList.add('site-fileinput__img--with-img')
                dropContainer.setAttribute('style', `background-image: url(${imgSrc})`)
                let placeholder = dropContainer.querySelector('.site-fileinput__placeholder')
                if (placeholder) {
                    placeholder.classList.add('d-none')
                }
                let avatarControls = item.querySelector('.site-fileinput__delete-btn')
                if (avatarControls) {
                    avatarControls.classList.remove('d-none')
                }
            })
        }

        let avatarDeleteBtn = item.querySelector('.site-fileinput__delete-btn')
        if (avatarDeleteBtn) {
            avatarDeleteBtn.addEventListener('click', function() {
                let fileInput = item.querySelector('input[type="file"]')
                if (fileInput) {
                    fileInput.value = ''
                }
                let placeholder = dropContainer.querySelector('.site-fileinput__placeholder')
                if (placeholder) {
                    placeholder.classList.remove('d-none')
                }

                dropContainer.classList.remove('site-fileinput__img--with-img')
                dropContainer.removeAttribute('style')
            })
        }

    })

}

function initRating() {
    let ratingItems = document.querySelectorAll('.add-rating')
    ratingItems.forEach(item => {
        let ratingStars = item.querySelectorAll('.add-rating__star')
        ratingStars.forEach(starItem => {
            starItem.addEventListener('click', function() {
                ratingStars.forEach(childItem => {
                    if (+childItem.getAttribute('data-score') <= +this.getAttribute('data-score')) {
                        childItem.classList.add('active')
                    }
                    else {
                        childItem.classList.remove('active')
                    }
                })
            })
        })
    })
}

function initSelectProduct() {
    let selectProductItems = document.querySelectorAll('.product-select')
    selectProductItems.forEach(item => {
        let items = item.querySelectorAll('.product-select__list .product-select__item')
        items.forEach(prodItem => {
            prodItem.addEventListener('click', function () {
                let currentProduct = item.querySelector('.product-select__selected .product-select__item')
                if (currentProduct) currentProduct.innerHTML = this.innerHTML
            })
        })
    })
}

function initCookiesPopup() {
    let cookiesPopupBtn = document.querySelector('.cookies-popup__btn')
    if (cookiesPopupBtn) {
        cookiesPopupBtn.addEventListener('click', function () {
            let cookiePopup = document.querySelector('.cookies-popup')
            if (cookiePopup) cookiePopup.classList.add('d-none')
        })
    }
}

function initAccountSidebarBtn() {
    let menuBtn = document.querySelector('.account__sidebar-btn--mobile')
    let sidebarWrap = document.querySelector('.account__sidebar-wrap')

    if (menuBtn && sidebarWrap) {
        menuBtn.addEventListener('click', function() {
            let bufferText = this.innerHTML
            this.innerHTML = this.getAttribute('data-text')
            this.setAttribute('data-text', bufferText)

            sidebarWrap.classList.toggle('active')
        })
    }
}

function initCheckboxSelect() {
    let selectItem = document.querySelectorAll('.checkbox-select')
    selectItem.forEach(item => {
        let valueFlag = false
        if (item.classList.contains('count-only')) {
            valueFlag = true
        }
        let selectOptions = item.querySelectorAll('.checkbox-select__option')
        let selectAllOptions = item.querySelector('.checkbox-select__select-all')
        let selectValue = null
        let currentValueBlock = item.querySelector('.checkbox-select__selected')
        let currentValueBlockVal = item.querySelector('.checkbox-select__selected-value')

        if (currentValueBlock) {
            currentValueBlock.addEventListener('click', function () {
                let dropdown = item.querySelector('.checkbox-select__dropdown')
                dropdown.classList.toggle('open')
            })
        }

        selectOptions.forEach(option => {
            option.addEventListener('click', function () {
                this.classList.toggle('active')
                let activeOptions = item.querySelectorAll('.checkbox-select__option.active')
                activeOptions.forEach((activeOption, index) => {
                    if (index === 0) {
                        selectValue = activeOption.getAttribute('data-value')
                    }
                })

                if (activeOptions.length > 1) {
                    selectValue = selectValue + ' +' + (activeOptions.length - 1)
                }

                if (activeOptions.length > 0) {
                    currentValueBlockVal.innerHTML = valueFlag ? '+' + activeOptions.length : selectValue
                    currentValueBlock.classList.add('has-value')
                }
                else {
                    currentValueBlockVal.innerHTML = ''
                    currentValueBlock.classList.remove('has-value')
                }

            })
        })

        if (selectAllOptions) {
            selectAllOptions.addEventListener('click', function () {
                let activeOptions = item.querySelectorAll('.checkbox-select__option.active')
                if (this.classList.contains('active')) {
                    activeOptions.forEach(option => {
                        option.classList.remove('active')
                    })
                    currentValueBlockVal.innerHTML = ''
                    currentValueBlock.classList.remove('has-value')
                }
                else {
                    selectOptions.forEach(option => {
                        option.classList.add('active')
                    })
                    selectOptions.forEach((activeOption, index) => {
                        if (index === 0) {
                            selectValue = activeOption.getAttribute('data-value')
                        }
                    })
                    if (selectOptions.length > 1) {
                        selectValue = selectValue + ' +' + (selectOptions.length - 1)
                    }

                    currentValueBlockVal.innerHTML = selectValue
                    currentValueBlock.classList.add('has-value')
                }
                this.classList.toggle('active')
            })
        }
    })

    if (selectItem.length > 0) {
        document.addEventListener('click', function (e){
            if (!(e.target.classList.contains('checkbox-select') || e.target.closest('.checkbox-select'))) {
                let dropdowns = document.querySelectorAll('.checkbox-select__dropdown.open')
                dropdowns.forEach(dropdownItem => {
                    dropdownItem.classList.remove('open')
                })
            }
        })
    }
}

function initProductSlider() {
    if ($('.products-block-slider').length > 0) {
        let initFlag = false
        let productsSwiper = null

        function transformSlider() {
            if (!initFlag && window.innerWidth <= 1220) {
                productsSwiper = new Swiper('.products-block-slider ', {
                    loop: false,
                    slidesPerView: 'auto',
                    spaceBetween: 18,
                    pagination: {
                        el: '.products-block-slider__pagination',
                        type: 'bullets',
                        clickable: true,
                    },
                });

                initFlag = true
            }
            else if (initFlag && window.innerWidth > 1220) {
                if (productsSwiper?.length > 1) {
                    productsSwiper.forEach(item => {
                        item.destroy()
                    })
                }
                else {
                    productsSwiper.destroy()
                }
                initFlag = false
            }
        }

        transformSlider()
        window.addEventListener('resize', function() {
            transformSlider()
        })
    }
}

function initBuyBtn() {
    let buyBtns = document.querySelectorAll('.js-buy-btn')
    buyBtns.forEach(item => {
        item.addEventListener('click', function () {
            let flyElement = document.createElement('div')
            flyElement.classList.add('fly-element')
            let counterEle = document.querySelector('.header__counter')

            let productImgBlock = null

            if (this.classList.contains('product-single__buy-btn')) {
                productImgBlock = this.closest('.product-single').querySelector('.product-single-slider .swiper-slide-active')
            }
            else {
                productImgBlock = this.closest('.product-card').querySelector('.product-card__img')
            }

            let productImgEl = productImgBlock.querySelector('img')
            flyElement.style.backgroundImage = `url('${productImgEl.getAttribute('src')}')`;
            console.log($(this).offset(), $(this).offset().left + 'px')
            flyElement.style.top = $(this).offset().top + 'px'
            flyElement.style.left = $(this).offset().left + 'px'
            flyElement.style.width = parseInt(productImgEl.offsetWidth * 0.5) + 'px'
            flyElement.style.height = parseInt(productImgEl.offsetHeight * 0.5) + 'px'

            document.querySelector('body').appendChild(flyElement)
            flyToElement(flyElement, counterEle)
            setTimeout(function() {
                flyElement.remove()
            }, 700)
        })
    })
}

function flyToElement(flyEle, flyToEle) {
    let topTo = $(flyToEle).offset().top + 'px'
    let leftTo = $(flyToEle).offset().left + 'px'
    flyEle.style.top = topTo
    flyEle.style.left = leftTo
    flyEle.style.width = flyToEle.offsetWidth + 'px'
    flyEle.style.height = flyToEle.offsetHeight + 'px'
}

function initEditBlock() {
    let editBlocks = document.querySelectorAll('.edit-block')
    editBlocks.forEach(item => {
        let editValBlock = item.querySelector('.edit-block__value')
        let editBtn = item.querySelector('.edit-block__icon')
        editBtn.addEventListener('click', function () {
            if (item.querySelector('.edit-block__popup')) return

            let editBlockPopup = document.createElement('div')
            editBlockPopup.classList.add('edit-block__popup')
            let editBlockInputWrap = document.createElement('div')
            editBlockInputWrap.classList.add('edit-block__input')
            let editBlockInput = document.createElement('input')
            editBlockInput.setAttribute('type', 'text')
            editBlockInput.value = editValBlock.innerHTML
            let editBlockInputSubmit = document.createElement('div')
            editBlockInputSubmit.classList.add('edit-block__submit')
            editBlockInputSubmit.addEventListener('click', function () {
                editValBlock.innerHTML = editBlockInput.value
                editBlockPopup.remove()
            })

            editBlockInputWrap.appendChild(editBlockInput)
            editBlockInputWrap.appendChild(editBlockInputSubmit)
            editBlockPopup.appendChild(editBlockInputWrap)
            item.appendChild(editBlockPopup)

        })
    })
}

function initLanguageMenu() {
    let block = document.querySelector('.header__languages')
    block.addEventListener('click', (e) => {
        let target = e.target
        if(target.classList.contains('header__languages-item')) {
            document.querySelector('.header__languages-selected').innerHTML = target.innerHTML
        }

        target.closest('.header__languages').classList.toggle('open')

    })
}

function initShowBlock() {
    let btn = document.getElementById('detail-show')
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

document.addEventListener('DOMContentLoaded', function() {

    initLanguageMenu()
    initShowBlock()


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