function elementInViewport(el) {
    const bounds = el.getBoundingClientRect();
    return (
        (bounds.top * 8 - window.innerHeight > 0) &&
        (window.innerHeight - bounds.top * 2 > 0)
    );
}


if (window.innerWidth < 801)
    document.getElementsByTagName('main')[0].addEventListener("scroll", (e) => {
        const els = document.querySelectorAll(".card");

        els.forEach(el => {
            const inViewport = elementInViewport(el);
            const targets = el.querySelectorAll('.path')

            if (inViewport) {
                el.classList.add('card-hover')

                anime(animationConfig.onHoverSVG(targets).opts)
            } else {
                el.classList.remove('card-hover')
                anime(animationConfig.offHoverSVG(targets).opts)
            }
        })
    })