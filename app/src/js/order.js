function initDeliveryMethodHandler() {
    let deliveryInputs = document.querySelectorAll('.make-order-form input[name="delivery"]')
    let optionBlocks = document.querySelectorAll('[data-show="panda"]')
    let popup = document.querySelector('[data-popup="ask-cancel"]')

    popup.querySelector('[data-continue]').addEventListener('click', function () {
        let nextItem = document.querySelector(`.make-order-form input[name="delivery"][value="${popup.getAttribute('data-value')}"]`)
        if (nextItem) {
            nextItem.checked = true
        }
        optionBlocks.forEach(optItem => {
            optItem.classList.add('hide')
        })
    })

    deliveryInputs.forEach(item => {

        item.addEventListener('change', function () {
            if (this.value === 'delivery2') {
                optionBlocks.forEach(optItem => {
                    optItem.classList.remove('hide')
                })
            }
            else {
                optionBlocks.forEach(optItem => {
                    optItem.classList.add('hide')
                })
            }
        })

        item.closest('.site-radio').querySelector('.site-radio__label').addEventListener('click', function(e) {
            let checkedItem = document.querySelector('.make-order-form input[name="delivery"]:checked')
            if (checkedItem.value === 'delivery2') {
                e.preventDefault()
                blockScrollHandler()
                popup.classList.add('open')
                popup.setAttribute('data-value', item.value)
            }
        })
    })
}

document.addEventListener('DOMContentLoaded', function() {
    initDeliveryMethodHandler()
})