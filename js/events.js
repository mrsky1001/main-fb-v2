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

window.addEventListener('mousemove', (e) => {
    w = window.innerWidth
    h = window.innerHeight
    var offsetX = 0.5 - e.pageX / w, /* where e.pageX is our cursor X coordinate */
        offsetY = 0.5 - e.pageY / h,
        offsetPoster = 20, /* custom value for animation depth */
        transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px) rotateX(' + (-offsetY * offsetPoster) + 'deg) rotateY(' + (offsetX * (offsetPoster * 2)) + 'deg)',
        dy = e.pageY - h / 2,
        dx = e.pageX - w / 2,
        theta = Math.atan2(dy, dx), /* get angle in radians */
        angle = theta * 180 / Math.PI; /* convert rad in degrees */

    // Array.from(document.getElementsByTagName('polygon')).forEach(s => s.style.transform = transformPoster)
    /* apply transform to $poster */
    // Array.from(document.getElementsByTagName('svg')).forEach(s => s.children.transform = transformPoster);

    /* parallax foreach layer */
    /* loop thought each layer */
    /* get custom parallax value */
    /* apply transform */
    // $layer.each(function() {
    //     var $this = $(this),
    //         offsetLayer = $this.data('offset') || 0, /* get custom parallax value, if element docent have data-offset, then its 0 */
    //         transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)’;
    //
    //     $this.css('transform', transformLayer);
    // });
});