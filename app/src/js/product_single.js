function loadAllReviews() {
    //imitate getting ajax results
    let reviewItem = document.querySelector('.product-single__review')
    let showAllTrigger = document.querySelector('.product-single__reviews-link')
    let reviewsList = document.querySelector('.product-single__reviews-list')

    if (reviewItem && showAllTrigger && reviewsList) {
        showAllTrigger.addEventListener('click', function () {
            let ajaxResult = document.createElement('div')
            ajaxResult.style.transition = 'all 0.5s'
            ajaxResult.style.maxHeight = '0'
            ajaxResult.style.overflow = 'hidden'

            for (let i = 0; i < 5; i++) {
                let newEle = reviewItem.cloneNode(true)
                ajaxResult.appendChild(newEle)
            }

            reviewsList.appendChild(ajaxResult)

            ajaxResult.style.maxHeight = ajaxResult.scrollHeight + 'px'
            setTimeout(function () {
                ajaxResult.style.maxHeight = 'initial'
            }, 500)

            this.classList.add('d-none')
        })
    }
}

document.addEventListener('DOMContentLoaded', function() {
    loadAllReviews()
});