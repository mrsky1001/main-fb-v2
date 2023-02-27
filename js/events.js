let pageNum = 0

window.addEventListener('wheel', (e) => {
    const nextPage = () => {
        const pageEl = document.getElementById('page-' + pageNum)

        if (pageEl && !site.isAnimate) {
            Array.from(document.getElementsByClassName('active')).forEach(e => e.classList.remove('active'))
            pageEl.classList.add('active')
            site.reset()
        } else if (pageNum > 0) {
            pageNum--
        } else {
            pageNum++
        }
    }

    if (!site.isAnimate)
        if (e.deltaY > 0) {
            pageNum++
            nextPage()
        } else {
            pageNum--
            nextPage()
        }
})