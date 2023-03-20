setTimeout(() => {
    const shortNav = document.getElementById('shortNav')
    const nav = document.getElementById('navbar')
    const front = document.getElementById('parallaxFront')

    Animation.animate(animationConfig.showEL([shortNav, nav, front], 1000), [shortNav, nav, front])
}, 1000)

setTimeout(() => {
    Animation.animate(animationConfig.wave)
}, 3000)

setInterval(() => {
    Animation.animate(animationConfig.wave)
}, 8000)

