function saveContactsHandler() {
    let contactsPopup = document.querySelector('.popup[data-popup="shop-contacts"]')
    let saveBtn = contactsPopup.querySelector('[data-save-contacts]')
    saveBtn.addEventListener('click', function() {
        let addressInput = contactsPopup.querySelector(`[data-contacts="address"] input`)
        let addressField = document.querySelector(`[data-field="address"]`)

        if (addressInput.value) {
            addressField.innerHTML = addressInput.value
        }
        else {
            addressField.innerHTML = '-'
        }

        for (let i = 1; i < 3; i++) {
            let telInput = contactsPopup.querySelector(`[data-contacts="tel${i}"] input`)
            let telField = document.querySelector(`[data-field="tel${i}"]`)

            if (telInput.value) {
                telField.innerHTML = ''
                let phoneEle =  document.createElement('span')
                phoneEle.innerHTML = telInput.value
                telField.appendChild(phoneEle)

                let activeValues = contactsPopup.querySelectorAll(`[data-contacts="tel${i}"] .checkbox-select__option.active`)

                activeValues.forEach(item => {
                    let iconEle = document.createElement('a')
                    iconEle.classList.add('icon-link')
                    
                    if (item.getAttribute('data-value') === 'viber') {
                        iconEle.classList.add('viber')
                        iconEle.setAttribute('href', 'viber://chat?number=' + telInput.value.replace('(', '').replace(')', '').replace(/\s/g, ''))
                    }

                    if (item.getAttribute('data-value') === 'wu') {
                        iconEle.classList.add('whatsapp')
                        iconEle.setAttribute('href', 'https://wa.me/' + telInput.value.replace('(', '').replace(')', '').replace(/\s/g, '').replace('+', ''))
                    }

                    if (item.getAttribute('data-value') === 'tg') {
                        iconEle.classList.add('telegram')
                        iconEle.setAttribute('href', 'https://telegram.me/' + telInput.value.replace('(', '').replace(')', '').replace(/\s/g, ''))
                    }

                    telField.appendChild(iconEle)
                })
            }
            else {
                telField.innerHTML = '-'
            }
        }

    })
}

document.addEventListener('DOMContentLoaded', function() {
    saveContactsHandler()
})