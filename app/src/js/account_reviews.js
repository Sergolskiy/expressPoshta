function reviewsHandler() {
    let reviewItems = document.querySelectorAll('.account-reviews__tab table tbody tr')
    let popup = document.querySelector('[data-popup="review"]')

    reviewItems.forEach(item => {
        let reviewTextBlock = item.querySelector('[data-review]')
        if (reviewTextBlock.innerHTML.toString().length > 140) {
            reviewTextBlock.classList.add('text-overflow')
            let showBtn = document.createElement('div')
            showBtn.innerHTML = 'Читати повністю'
            showBtn.classList.add('btn')
            showBtn.style.width = '154px'
            showBtn.style.maxWidth = '100%'
            showBtn.setAttribute('data-review-show', '')
            let parentBlock = item.querySelector('[data-manage]')
            parentBlock.appendChild(showBtn)

            showBtn.addEventListener('click', function() {
                popup.classList.add('open')
                blockScrollHandler()
                popup.querySelector('.review__rating').innerHTML = item.querySelector('[data-rating]').innerHTML
                popup.querySelector('.review__text').innerHTML = item.querySelector('[data-review]').innerHTML
                popup.querySelector('.review__author').innerHTML = item.querySelector('[data-author]').innerHTML

                let imgBlock = item.querySelector('[data-img]')
                if (imgBlock) {
                    popup.querySelector('.review__img').classList.remove('hide')
                    popup.querySelector('.review__img').style.backgroundImage = imgBlock.querySelector('.responsive-table__review-img').style.backgroundImage
                }
                else {
                    popup.querySelector('.review__img').classList.add('hide')
                    popup.querySelector('.review__img').style.backgroundImage = ''
                }
            })
        }

    })
}

document.addEventListener('DOMContentLoaded', function() {
    reviewsHandler()
})