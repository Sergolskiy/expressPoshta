function initStepForm() {
    let stepForm = document.querySelectorAll('.step-form')
    stepForm.forEach(form => {
        let steps = form.querySelectorAll('.step-form__step')
        steps.forEach(step => {
            let stepHead = step.querySelector('.step-form__head')
            let stepBody = step.querySelector('.step-form__body')
            if (step.classList.contains('active') && stepBody) {
                stepBody.style.maxHeight = 'initial'
            }

            let nextBtn = step.querySelector('[data-next]')
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    let currentStep = step.getAttribute('data-step')
                    if (!addProductSteps(currentStep)) return
                    step.classList.remove('active')
                    step.classList.add('finish')
                    stepBody.style.maxHeight = stepBody.scrollHeight + 'px'
                    setTimeout(function () {
                        stepBody.style.maxHeight = 0
                    }, 50)


                    let nextStep = form.querySelector(`.step-form__step[data-step="${+currentStep + 1}"]`)
                    if (nextStep) {
                        nextStep.classList.add('active')
                        let nextStepBody = nextStep.querySelector('.step-form__body')
                        if (nextStepBody) nextStepBody.style.maxHeight = nextStepBody.scrollHeight + 'px'
                        setTimeout(function() {
                            if (nextStepBody) nextStepBody.style.maxHeight = 'initial'
                        }, 300)
                    }
                })
            }

            let prevBtn = step.querySelector('[data-prev]')
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    let currentStep = step.getAttribute('data-step')
                    step.classList.remove('active')
                    stepBody.style.maxHeight = stepBody.scrollHeight + 'px'
                    setTimeout(function () {
                        stepBody.style.maxHeight = 0
                    }, 50)

                    let nextStep = form.querySelector(`.step-form__step[data-step="${+currentStep - 1}"]`)
                    if (nextStep) {
                        nextStep.classList.add('active')
                        nextStep.classList.remove('finish')
                        let nextStepBody = nextStep.querySelector('.step-form__body')
                        if (nextStepBody) nextStepBody.style.maxHeight = nextStepBody.scrollHeight + 'px'
                        setTimeout(function() {
                            if (nextStepBody) nextStepBody.style.maxHeight = 'initial'
                        }, 300)
                    }
                })
            }

            let editBtn = step.querySelector('.step-form__edit')
            if (editBtn) {
                editBtn.addEventListener('click', function() {
                    let currentActiveStep = form.querySelector(`.step-form__step.active`)
                    if (currentActiveStep) {
                        currentActiveStep.classList.remove('active')
                        currentActiveStep.classList.remove('finish')
                        let activeStepBody = currentActiveStep.querySelector('.step-form__body')
                        if (activeStepBody) {
                            activeStepBody.style.maxHeight = activeStepBody.scrollHeight + 'px'
                            setTimeout(function () {
                                activeStepBody.style.maxHeight = 0
                            }, 50)
                        }
                    }

                    step.classList.add('active')
                    step.classList.remove('finish')
                    stepBody.style.maxHeight = stepBody.scrollHeight + 'px'
                    setTimeout(function() {
                        if (stepBody) stepBody.style.maxHeight = 'initial'
                    }, 300)
                })
            }
        })
    })
}

function addProductSteps(step) {
    let currentStep = document.querySelector(`.step-form__step[data-step="${step}"]`)
    let resultBlock = currentStep.querySelector('.step-form__result')
    switch (step) {
        case '1':
            let pickedCategory = document.querySelector('.category-picker input[name="category"]:checked')
            if (!pickedCategory) return false

            let selectedCategory = pickedCategory.parentNode.querySelector('.category-picker__item-name').innerHTML
            let categoryResultLine = document.createElement('div')
            categoryResultLine.classList.add('step-form__result-value')
            categoryResultLine.innerHTML = selectedCategory.replace('<br>', ' ')
            resultBlock.innerHTML = ''
            resultBlock.appendChild(categoryResultLine)
            return true
        case '2':
            let pickedSubCategory = document.querySelector('.subcategory-picker input[name="subcategory"]:checked')
            if (!pickedSubCategory) return false

            let selectedSubCategory = pickedSubCategory.parentNode.querySelector('label').innerHTML
            let subcategoryResultLine = document.createElement('div')
            subcategoryResultLine.classList.add('step-form__result-value')
            subcategoryResultLine.innerHTML = selectedSubCategory.replace('<br>', ' ')
            resultBlock.innerHTML = ''
            resultBlock.appendChild(subcategoryResultLine)
            return true
        case '3':
            let shopName = document.querySelector('.shop-data-form input[name="name"]')?.value
            let shopDesc = document.querySelector('.shop-data-form textarea[name="description"]')?.value
            let shopAddr = document.querySelector('.shop-data-form input[name="address"]')?.value
            let shopCategories = $('.shop-data-form select[name="categories"]').select2("val")

            if (!shopName || !shopDesc || !shopAddr || shopCategories.length === 0) return false

            resultBlock.innerHTML = ''

            let shopNameResultLine = document.createElement('div')
            shopNameResultLine.classList.add('step-form__result-value')
            shopNameResultLine.innerHTML = shopName
            resultBlock.appendChild(shopNameResultLine)

            let shopDescResultLine = document.createElement('div')
            shopDescResultLine.classList.add('step-form__result-value')
            shopDescResultLine.innerHTML = shopDesc
            resultBlock.appendChild(shopDescResultLine)

            let shopAddrResultLine = document.createElement('div')
            shopAddrResultLine.classList.add('step-form__result-value')
            shopAddrResultLine.innerHTML = shopAddr
            resultBlock.appendChild(shopAddrResultLine)

            let shopCategoriesResultLine = document.createElement('div')
            shopCategoriesResultLine.classList.add('step-form__result-tags', 'step-form__result-value')

            shopCategories.forEach(cItem => {
                let tagBlock = document.createElement('div')
                tagBlock.classList.add('tag', 'tag--orange')
                let tagTextBlock = document.createElement('div')
                tagTextBlock.classList.add('tag__text')
                tagTextBlock.innerHTML = cItem

                tagBlock.appendChild(tagTextBlock)
                shopCategoriesResultLine.appendChild(tagBlock)
            })

            resultBlock.appendChild(shopCategoriesResultLine)

            return true
        case '4':
            return true
    }
}

function initProductPopupDelivery(popup) {
    let deliveryRadioInputs = popup.querySelectorAll('.product-popup__delivery-item input[name="delivery"]')

    deliveryRadioInputs.forEach(item => {
        item.addEventListener('change', function() {
            let currActiveCounter = popup.querySelector('.product-popup__delivery-item .product-popup__quantity:not(.disabled)')
            let currActiveSubtitle = popup.querySelector('.product-popup__delivery-item .product-popup__delivery-item-subtitle:not(.disabled)')

            if (currActiveCounter) currActiveCounter.classList.add('disabled')
            if (currActiveSubtitle) currActiveSubtitle.classList.add('disabled')

            let nextActiveCounter = this.closest('.product-popup__delivery-item').querySelector('.product-popup__quantity')
            let nextActiveSubtitle = this.closest('.product-popup__delivery-item').querySelector('.product-popup__delivery-item-subtitle')

            if (nextActiveCounter) nextActiveCounter.classList.remove('disabled')
            if (nextActiveSubtitle) nextActiveSubtitle.classList.remove('disabled')
        })
    })
}

function generateProductImgGrid(product, popup, edit = false) {
    let gridContainer = popup.querySelector('.product-popup__images')
    let deleteIconHtml = `<svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.92838 9.20059L6.6998 2.60059H3.9998H1.2998L2.07123 9.20059H5.92838Z" stroke="white"/>
        <path d="M0.0996094 2.60059H7.89961" stroke="white"/>
        <path d="M5.5 2.60039V1.40039H2.5V2.60039" stroke="white"/>
        </svg>
        `;

    gridContainer.innerHTML = ''
    let filesArray = product.files

    filesArray.forEach((file, index) => {
        let imgSrc = URL.createObjectURL(file)
        let imgWrap = document.createElement('div')
        imgWrap.classList.add('product-popup__image-wrap')
        let imgBlock = document.createElement('div')
        imgBlock.classList.add('product-popup__image')
        imgBlock.setAttribute('style', `background-image: url(${imgSrc})`)

        if (edit && +product.avatarIndex === index) {
            imgBlock.classList.add('active')
        }

        let deleteBtn = document.createElement('div')
        deleteBtn.classList.add('product-popup__image-delete')
        deleteBtn.setAttribute('data-index', index)
        deleteBtn.innerHTML = deleteIconHtml
        imgBlock.appendChild(deleteBtn)
        imgWrap.appendChild(imgBlock)
        gridContainer.appendChild(imgWrap)
    })

    let imgBlocks = gridContainer.querySelectorAll('.product-popup__image')
    imgBlocks.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('product-popup__image-delete')) {
                e.stopPropagation()
            }
            if (!e.target.classList.contains('product-popup__image-delete')) {
                let prevActive = gridContainer.querySelector('.product-popup__image.active')
                if (prevActive) prevActive.classList.remove('active')
                this.classList.add('active')
            }
        })
    })

    let imgBlockDeleteBtns = gridContainer.querySelectorAll('.product-popup__image-delete')
    imgBlockDeleteBtns.forEach(item => {
        item.addEventListener('click', function() {
            let imgItem = this.closest('.product-popup__image-wrap')
            product.files.splice(this.getAttribute('data-index'), 1)
            if (imgItem) imgItem.remove()
        })
    })
}

function generateProductCard(product, index) {
    let productsList = document.querySelector('.added-products__list')

    let productCard = document.createElement('div')
    productCard.classList.add('added-product')

    let productCardTop = document.createElement('div')
    productCardTop.classList.add('added-product__top')
    let productCardTopText = document.createElement('div')
    productCardTopText.classList.add('added-product__top-text')
    productCardTopText.innerHTML = (index + 1) + ' товар'
    let productCardTopLine = document.createElement('div')
    productCardTopLine.classList.add('added-product__top-line')
    let productCardTopEdit = document.createElement('div')
    productCardTopEdit.classList.add('added-product__top-edit')
    let editIcon = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.4414 1L14.9769 4.53553L5.92153 13.5909L2.26722 13.7097L2.386 10.0554L11.4414 1Z" stroke="#2D2D2D"/>
        <path d="M11.5 4.21387L6 9.71387" stroke="#2D2D2D"/>
        </svg>`
    productCardTopEdit.innerHTML = editIcon
    productCardTopEdit.addEventListener('click', function() {
        let popup = document.querySelector('.product-popup')
        popup.classList.add('open')
        popup.setAttribute('data-product-index', index)
        blockScrollHandler(false)
        setProductPopup(popup, product)
    })

    productCardTop.appendChild(productCardTopText)
    productCardTop.appendChild(productCardTopLine)
    productCardTop.appendChild(productCardTopEdit)
    productCard.appendChild(productCardTop)

    let productCardWrap = document.createElement('div')
    productCardWrap.classList.add('added-product__wrapper')
    let productCardWrapLeft = document.createElement('div')
    productCardWrapLeft.classList.add('added-product__left')
    let productCardWrapRight = document.createElement('div')
    productCardWrapRight.classList.add('added-product__right')

    productCardWrap.appendChild(productCardWrapLeft)
    productCardWrap.appendChild(productCardWrapRight)
    productCard.appendChild(productCardWrap)

    let productCardImg = document.createElement('div')
    productCardImg.classList.add('added-product__img')
    if (product.files.length !== 0) {
        let imgSrc = URL.createObjectURL(product.files[product.avatarIndex])
        productCardImg.setAttribute('style', `background-image: url(${imgSrc})`)
    }

    productCardWrapLeft.appendChild(productCardImg)

    if (product.files.length > 1) {
        let productCardImgText = document.createElement('div')
        productCardImgText.classList.add('added-product__img-count')
        productCardImgText.innerHTML = '+' + (product.files.length - 1) + ' фото'
        productCardWrapLeft.appendChild(productCardImgText)
    }

    let productCardName = document.createElement('div')
    productCardName.classList.add('added-product__title')
    productCardName.innerHTML = product.name

    let productCardPriceLine = document.createElement('div')
    productCardPriceLine.classList.add('added-product__price-line')

    let productCardPrice = document.createElement('div')
    productCardPrice.classList.add('added-product__current-price')
    let currentPrice = product.price
    if (product.discount) {
        currentPrice = parseInt('' + currentPrice * ((100 - parseInt(product.discount)) / 100))
        productCardPrice.innerHTML = currentPrice + 'грн'
        let productCardPriceOld = document.createElement('div')
        productCardPriceOld.classList.add('added-product__old-price')
        productCardPriceOld.innerHTML = product.price + 'грн'
        productCardPriceLine.appendChild(productCardPrice)
        productCardPriceLine.appendChild(productCardPriceOld)
    }
    else {
        productCardPrice.innerHTML = currentPrice + 'грн'
        productCardPriceLine.appendChild(productCardPrice)
    }

    // let productCardNDS = document.createElement('div')
    // productCardNDS.classList.add('added-product__nds')
    // productCardNDS.innerHTML = product.nds + '% НДС'
    // productCardPriceLine.appendChild(productCardNDS)

    if (product.bonus) {
        let productCardLabel = document.createElement('div')
        productCardLabel.classList.add('added-product__label', 'added-product__label--pink')

        let productCardLabelIcon = document.createElement('div')
        productCardLabelIcon.classList.add('added-product__label-icon')
        productCardLabelIcon.innerHTML = `<svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.72726 1.27271V6.72725" stroke="#584659" stroke-linecap="round"/>
            <path d="M8.72656 6.27271V11.7273" stroke="#584659" stroke-linecap="round"/>
            <path d="M6.45456 4L1.00001 4" stroke="#584659" stroke-linecap="round"/>
            <path d="M11.4541 9L5.99956 9" stroke="#584659" stroke-linecap="round"/>
        </svg>`

        let productCardLabelText = document.createElement('div')
        productCardLabelText.classList.add('added-product__label-text')
        productCardLabelText.innerHTML = 'Діють бонуси'

        productCardLabel.appendChild(productCardLabelIcon)
        productCardLabel.appendChild(productCardLabelText)
        productCardPriceLine.appendChild(productCardLabel)
    }

    let productCardDesc = document.createElement('div')
    productCardDesc.classList.add('added-product__description')
    productCardDesc.innerHTML = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas pharetra ex libero, a lacinia arcu elementum vel. Praesent rhoncus tortor ut ante pretium sollicitudin. Phasellus semper, est eu placerat scelerisque, mauris odio dapibus nibh, at venenatis tellus tellus non elit.'

    let productCardComponents = document.createElement('div')
    productCardComponents.classList.add('added-product__block')
    let productCardComponentsTitle = document.createElement('div')
    productCardComponentsTitle.classList.add('added-product__block-title')
    productCardComponentsTitle.innerHTML = 'Склад продукту'

    let productCardComponentsList = document.createElement('div')
    productCardComponentsList.classList.add('added-product__props-list')

    product.components.forEach(componentItem => {
        let productCardComponent = document.createElement('div')
        productCardComponent.classList.add('added-product__prop')
        productCardComponent.innerHTML = componentItem
        productCardComponentsList.appendChild(productCardComponent)
    })

    productCardComponents.appendChild(productCardComponentsTitle)
    productCardComponents.appendChild(productCardComponentsList)

    let productCardSizes = document.createElement('div')
    productCardSizes.classList.add('added-product__block')
    let productCardSizesTitle = document.createElement('div')
    productCardSizesTitle.classList.add('added-product__block-title')
    productCardSizesTitle.innerHTML = 'Розміри'

    let productCardSizesList = document.createElement('div')
    productCardSizesList.classList.add('added-product__props-list')

    product.sizes.forEach(sizeItem => {
        let productCardSize = document.createElement('div')
        productCardSize.classList.add('added-product__prop')
        productCardSize.innerHTML = sizeItem
        productCardSizesList.appendChild(productCardSize)
    })

    productCardSizes.appendChild(productCardSizesTitle)
    productCardSizes.appendChild(productCardSizesList)

    let productCardDelivery = document.createElement('div')
    productCardDelivery.classList.add('added-product__block')
    let productCardDeliveryTitle = document.createElement('div')
    productCardDeliveryTitle.classList.add('added-product__block-title')
    productCardDeliveryTitle.innerHTML = 'Доставка'
    let productCardDeliveryLine = document.createElement('div')
    productCardDeliveryLine.classList.add('added-product__block-row')
    productCardDelivery.appendChild(productCardDeliveryTitle)
    productCardDelivery.appendChild(productCardDeliveryLine)
    let productCardDeliveryValue = document.createElement('div')
    productCardDeliveryValue.classList.add('added-product__delivery')
    productCardDeliveryValue.innerHTML = product.delivery + ' - ' + product.count + 'шт'
    productCardDeliveryLine.appendChild(productCardDeliveryValue)

    if (product.giftpack) {
        let productCardLabel = document.createElement('div')
        productCardLabel.classList.add('added-product__label', 'added-product__label--blue')

        let productCardLabelIcon = document.createElement('div')
        productCardLabelIcon.classList.add('added-product__label-icon')
        productCardLabelIcon.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6.5" y="5.76074" width="5" height="6" stroke="#584659"/>
            <rect x="1.5" y="5.76074" width="5" height="6" stroke="#584659"/>
            <rect x="0.5" y="-0.5" width="12" height="2" transform="matrix(1 0 0 -1 0 5.21582)" stroke="#584659"/>
            <path d="M6.2998 3.26074L6.2998 5.26074" stroke="#584659" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2.40125 3.57117L1.44238 2.6123L3.31493 0.739754L6.14635 3.57117" stroke="#584659" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M10.006 3.57117L10.9648 2.6123L9.09229 0.739754L6.26088 3.57117" stroke="#584659" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>`

        let productCardLabelText = document.createElement('div')
        productCardLabelText.classList.add('added-product__label-text')
        productCardLabelText.innerHTML = 'Є подарункова упаковка'

        productCardLabel.appendChild(productCardLabelIcon)
        productCardLabel.appendChild(productCardLabelText)
        productCardDeliveryLine.appendChild(productCardLabel)
    }

    let productCardEvent = document.createElement('div')
    productCardEvent.classList.add('added-product__block')
    let productCardEventTitle = document.createElement('div')
    productCardEventTitle.classList.add('added-product__block-title')
    productCardEventTitle.innerHTML = 'Подія'
    let productCardEventText = document.createElement('div')
    productCardEventText.classList.add('added-product__block-text')
    productCardEventText.innerHTML = product.events.join(', ')
    productCardEvent.appendChild(productCardEventTitle)
    productCardEvent.appendChild(productCardEventText)

    let productCardFor = document.createElement('div')
    productCardFor.classList.add('added-product__block')
    let productCardForTitle = document.createElement('div')
    productCardForTitle.classList.add('added-product__block-title')
    productCardForTitle.innerHTML = 'Для кого'
    let productCardForText = document.createElement('div')
    productCardForText.classList.add('added-product__block-text')
    productCardForText.innerHTML = product.for.join(', ')
    productCardFor.appendChild(productCardForTitle)
    productCardFor.appendChild(productCardForText)


    productCardWrapRight.appendChild(productCardName)
    productCardWrapRight.appendChild(productCardPriceLine)
    productCardWrapRight.appendChild(productCardDesc)
    productCardWrapRight.appendChild(productCardComponents)
    productCardWrapRight.appendChild(productCardSizes)
    productCardWrapRight.appendChild(productCardDelivery)
    productCardWrapRight.appendChild(productCardEvent)
    productCardWrapRight.appendChild(productCardFor)

    productCard.setAttribute('data-index', index)

    if (product.status === 'new') {
        productsList.appendChild(productCard)
    }
    else {
        let editedProduct = productsList.querySelector(`[data-index="${index}"]`)
        if (editedProduct) {
            editedProduct.replaceWith(productCard)
        }
    }

}

function saveProductHandler(products, index, popup) {
    let productName = popup.querySelector('[data-product="name"]')?.value
    let productPrice = popup.querySelector('[data-product="price"]')?.value
    let productCurrency = popup.querySelector('[data-product="currency"]')?.value
    let productDiscount = popup.querySelector('[data-product="discount"]')?.value
    let productBonus = popup.querySelector('[data-product="bonus"]')?.value
    // let productNDS = popup.querySelector('[data-product="nds"]')?.value
    let productDesc = popup.querySelector('[data-product="desc"]')?.value
    let productComponents = $('select[data-product="components"]').select2("val")
    let productSizes = $('select[data-product="sizes"]').select2("val")
    let productDelivery = popup.querySelector('[name="delivery"]:checked')?.value
    let productCount = popup.querySelector('[name="delivery"]:checked').closest('.product-popup__delivery-item').querySelector('.product-popup__quantity-input')?.value
    let productGiftPack = popup.querySelector('[data-product="giftpack"]')?.value
    let productFor = popup.querySelector('[data-product="for"]').querySelectorAll('.checkbox-select__option.active')
    let productEvents = popup.querySelector('[data-product="event"]').querySelectorAll('.checkbox-select__option.active')
    let productAvatarIndex = popup.querySelector('.product-popup__image.active .product-popup__image-delete')?.getAttribute('data-index')

    // if (!productName || !productPrice || !productCurrency || !productNDS || !productDesc) return false
    if (!productName || !productPrice || !productCurrency || !productDesc) return false

    products[index].name = productName
    products[index].price = productPrice
    products[index].currency = productCurrency
    products[index].discount = productDiscount ? productDiscount : false
    products[index].bonus = productBonus ? true : false
    // products[index].nds = productNDS
    products[index].description = productDesc
    products[index].components = productComponents.length ? productComponents : []
    products[index].sizes = productSizes.length ? productSizes : []
    products[index].delivery = productDelivery
    products[index].count = productCount
    products[index].giftpack = productGiftPack ? true : false
    products[index].for = productFor.length ? [...productFor].map(item => { return item.getAttribute('data-value')}) : []
    products[index].events = productEvents.length ? [...productEvents].map(item => { return item.getAttribute('data-value')}) : []
    products[index].avatarIndex = productAvatarIndex.length ? productAvatarIndex : []


    console.log(products[index])

    generateProductCard(products[index], index)
    products[index].status = 'created'
    return true
}

function setProductPopup(popup, product, clear = false) {
    let productNameInput = popup.querySelector('[data-product="name"]')
    let productPriceInput = popup.querySelector('[data-product="price"]')
    let productCurrencyInput = popup.querySelector('[data-product="currency"]')
    let productDiscountInput = popup.querySelector('[data-product="discount"]')
    let productBonusInput = popup.querySelector('[data-product="bonus"]')
    // let productNDSInput = popup.querySelector('[data-product="nds"]')
    let productDescInput = popup.querySelector('[data-product="desc"]')
    let productComponentsSelect = $('select[data-product="components"]')
    let productSizesSelect = $('select[data-product="sizes"]')
    let productDeliveryInput = popup.querySelector('[name="delivery"]')
    let productCountInputs = popup.querySelectorAll('.product-popup__delivery-item .product-popup__quantity-input')
    let productGiftPackInput = popup.querySelector('[data-product="giftpack"]')
    let productForSelect = popup.querySelector('[data-product="for"]')
    let productEventsSelect = popup.querySelector('[data-product="event"]')
    let productImagesBlock = popup.querySelector('.product-popup__images')

    productNameInput.value = clear ? '' : product.name
    productPriceInput.value = clear ? '' : product.price
    productCurrencyInput.value = clear ? productCurrencyInput.querySelector('option').text : product.currency
    productDiscountInput.value = clear ? '' : product.discount
    // productBonusInput.checked = clear ? false : product.bonus
    productBonusInput.checked = true
    // productNDSInput.value = clear ? '' : product.nds
    productDescInput.value = clear ? '' : product.description
    productGiftPackInput.checked = clear ? false : product.giftpack

    let forSelectItems = productForSelect.querySelectorAll('.checkbox-select__option, .checkbox-select__select-all')
    let forSelectCurrentVal = productForSelect.querySelector('.checkbox-select__selected-value')
    let forSelectCurrentBlock = productForSelect.querySelector('.checkbox-select__selected')
    let eventSelectItems = productEventsSelect.querySelectorAll('.checkbox-select__option, .checkbox-select__select-all')
    let eventSelectCurrentVal = productEventsSelect.querySelector('.checkbox-select__selected-value')
    let eventSelectCurrentBlock = productEventsSelect.querySelector('.checkbox-select__selected')

    if (clear) {
        productComponentsSelect.val(null).trigger('change')
        productSizesSelect.val(null).trigger('change')

        productDeliveryInput.checked = true
        let currActiveCounter = popup.querySelector('.product-popup__delivery-item .product-popup__quantity:not(.disabled)')
        let currActiveSubtitle = popup.querySelector('.product-popup__delivery-item .product-popup__delivery-item-subtitle:not(.disabled)')

        if (currActiveCounter) currActiveCounter.classList.add('disabled')
        if (currActiveSubtitle) currActiveSubtitle.classList.add('disabled')

        let nextActiveCounter = productDeliveryInput.closest('.product-popup__delivery-item').querySelector('.product-popup__quantity')
        let nextActiveSubtitle = productDeliveryInput.closest('.product-popup__delivery-item').querySelector('.product-popup__delivery-item-subtitle')

        if (nextActiveCounter) nextActiveCounter.classList.remove('disabled')
        if (nextActiveSubtitle) nextActiveSubtitle.classList.remove('disabled')

        productCountInputs.forEach(item => {
            item.value = 1
        })

        forSelectItems.forEach(item => {
            item.classList.remove('active')
        })
        if (forSelectCurrentVal) forSelectCurrentVal.innerHTML = ''
        if (forSelectCurrentBlock) forSelectCurrentBlock.classList.remove('has-value')

        eventSelectItems.forEach(item => {
            item.classList.remove('active')
        })
        if (eventSelectCurrentVal) eventSelectCurrentVal.innerHTML = ''
        if (eventSelectCurrentBlock) eventSelectCurrentBlock.classList.remove('has-value')

        productImagesBlock.innerHTML = ''
    }
    else {
        productComponentsSelect.val(product.components).trigger('change')
        productSizesSelect.val(product.sizes).trigger('change')

        let deliveryInput = popup.querySelector(`input[name="delivery"][value="${product.delivery}"]`)
        if (deliveryInput) {
            deliveryInput.checked = true

            let currActiveCounter = popup.querySelector('.product-popup__delivery-item .product-popup__quantity:not(.disabled)')
            let currActiveSubtitle = popup.querySelector('.product-popup__delivery-item .product-popup__delivery-item-subtitle:not(.disabled)')

            if (currActiveCounter) currActiveCounter.classList.add('disabled')
            if (currActiveSubtitle) currActiveSubtitle.classList.add('disabled')

            let nextActiveCounter = deliveryInput.closest('.product-popup__delivery-item').querySelector('.product-popup__quantity')
            let nextActiveSubtitle = deliveryInput.closest('.product-popup__delivery-item').querySelector('.product-popup__delivery-item-subtitle')

            if (nextActiveCounter) {
                nextActiveCounter.classList.remove('disabled')
                nextActiveCounter.value = +product.count
            }
            if (nextActiveSubtitle) nextActiveSubtitle.classList.remove('disabled')
        }

        forSelectItems.forEach(item => {
            if (product.for.includes(item.getAttribute('data-value'))) {
                item.classList.add('active')
            }
            else {
                item.classList.remove('active')
            }
        })
        if (forSelectCurrentBlock) forSelectCurrentBlock.classList.add('has-value')

        let forSelectValue = ''
        let activeForOptions = productForSelect.querySelectorAll('.checkbox-select__option.active')
        activeForOptions.forEach((activeOption, index) => {
            if (index === 0) {
                forSelectValue = activeOption.getAttribute('data-value')
            }
        })

        if (activeForOptions.length > 1) {
            forSelectValue = forSelectValue + ' +' + (activeForOptions.length - 1)
        }
        if (forSelectCurrentVal) forSelectCurrentVal.innerHTML = forSelectValue

        eventSelectItems.forEach(item => {
            if (product.events.includes(item.getAttribute('data-value'))) {
                item.classList.add('active')
            }
            else {
                item.classList.remove('active')
            }
        })
        if (eventSelectCurrentBlock) eventSelectCurrentBlock.classList.add('has-value')

        let eventSelectValue = ''
        let activeEventOptions = productEventsSelect.querySelectorAll('.checkbox-select__option.active')
        activeEventOptions.forEach((activeOption, index) => {
            if (index === 0) {
                eventSelectValue = activeOption.getAttribute('data-value')
            }
        })

        if (activeEventOptions.length > 1) {
            eventSelectValue = eventSelectValue + ' +' + (activeEventOptions.length - 1)
        }
        if (eventSelectCurrentVal) eventSelectCurrentVal.innerHTML = eventSelectValue

        generateProductImgGrid(product, popup, true)
    }
}

function initProductPopup() {
    let productPopupTrigger = document.querySelector('[data-add-product]')
    let productPopup = document.querySelector('.product-popup')
    let products = []
    let currentProductIndex = +productPopup.getAttribute('data-product-index') || 0

    if (productPopupTrigger && productPopup) {
        productPopupTrigger.addEventListener('click', function() {
            productPopup.classList.toggle('open')
            blockScrollHandler(false)

            if (products.length > 0) setProductPopup(productPopup, [], true)

            products.push({
                files: [],
                status: 'new',
            })
            // set empty current product when we push "add product" button
            currentProductIndex = products.length - 1
        })

        //setup close popup event listeners
        let popupCloseTrigger = document.querySelector('.product-popup__close')
        let confirmClose = document.querySelector('[data-add-product-close]')
        let askPopup = document.querySelector(`[data-popup="ask-cancel"]`)

        if (popupCloseTrigger && askPopup) {
            popupCloseTrigger.addEventListener('click', function() {
                askPopup.classList.add('open')
            })
            document.addEventListener('click', function (e){
                if (e.target.classList.contains('product-popup')) {
                    askPopup.classList.add('open')
                }
            })
        }

        if (confirmClose) {
            confirmClose.addEventListener('click', function() {
                //delete product if not saved yet
                if (products[currentProductIndex].status === 'new') products.splice(currentProductIndex, 1)
                askPopup.classList.remove('open')
                productPopup.classList.remove('open')
                blockScrollHandler(true)
            })
        }

        //setup delivery choice logic
        initProductPopupDelivery(productPopup)

        productPopup.addEventListener('click', function (e){
            if (e.target.classList.contains('sidebar-popup') || e.target.classList.contains('sidebar__close-icon') || e.target.closest('.sidebar__close-icon')) {
                blockScrollHandler(true)
                productPopup.classList.remove('open')
            }
        })

        let uploadBlock = productPopup.querySelector('.product-popup__fileinput')
        if (uploadBlock) {
            let fileInput = uploadBlock.querySelector('input[type="file"]')

            fileInput.addEventListener('change', function() {
                console.log(fileInput.files);
                [...fileInput.files].forEach(file => {
                    if (products[currentProductIndex].files.length < 15) {
                        products[currentProductIndex].files.push(file)
                    }
                })
                generateProductImgGrid(products[currentProductIndex], productPopup)
            })
        }

        //saving the product
        let saveTrigger = productPopup.querySelector('[data-save-product]')
        if (saveTrigger) {
            saveTrigger.addEventListener('click', function() {
                console.log(77777777777777);
                console.log(products, currentProductIndex);
                if (!saveProductHandler(products, currentProductIndex, productPopup)) {
                    return
                }
                askPopup.classList.remove('open')
                productPopup.classList.remove('open')
                blockScrollHandler(true)
            })
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initStepForm()
    initProductPopup()
});