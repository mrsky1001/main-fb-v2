Array.from(document.querySelectorAll('.cards > .row > a, .NavItem > a')).forEach(img => {
    const targets = img.querySelectorAll('.path')

    img.onmouseenter = () => {
        anime(animationConfig.onHoverSVG(targets).opts)
    }

    img.onmouseleave = () => {
        anime(animationConfig.offHoverSVG(targets).opts)
    }
})
