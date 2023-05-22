
[...(document.querySelectorAll('.cards > .row > a, .nav-item > a, #themeContainer .theme-btn'))].forEach(img => {

    img.onmouseenter = () => {
        const targets = img.querySelectorAll('.path')

        anime(animationConfig.onHoverSVG(targets).opts)
    }

    img.onmouseleave = () => {
        const targets = img.querySelectorAll('.path')
        anime(animationConfig.offHoverSVG(targets).opts)
    }
})
