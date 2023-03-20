function elementInViewport(el, upM = 8, downM = 2) {
    const bounds = el.getBoundingClientRect();

    return (
        (bounds.top + window.innerHeight * upM > 0) &&
        (window.innerHeight - bounds.top * downM > 0)
    );
}


document.getElementsByTagName('main')[0].addEventListener("scroll", (e) => {
    if (window.innerWidth < 801) {
        const els = document.querySelectorAll(".card");

        els.forEach(el => {
            const inViewport = elementInViewport(el, -0.1);
            const targets = el.querySelectorAll('.path')

            if (inViewport) {
                el.classList.add('card-hover')

                anime(animationConfig.onHoverSVG(targets).opts)
            } else {
                el.classList.remove('card-hover')
                anime(animationConfig.offHoverSVG(targets).opts)
            }
        })
    } else {
        const articles = document.getElementById("articles");
        const navbar = document.getElementById("navbar");

        const inViewport = elementInViewport(articles, 1, 2);
        if (inViewport) {
            anime(animationConfig.hideEL(navbar).opts)
        } else {
            anime(animationConfig.showEL(navbar).opts)
        }
    }
})