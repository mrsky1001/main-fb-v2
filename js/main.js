const animeStack = []

Array.from(document.getElementsByClassName('title')).forEach(v => {
    charming(v);
})

const site = new Site(document.querySelector('.start-section'))


let layerY = window.layerY


// window.addEventListener('wheel', (e) => {
//     if (e.layerY !== layerY) {
//         layerY = e.layerY
//
//         if (e.deltaY > 0)
//             site.word.animate(effect.moveRandom(true), undefined, true)
//         else
//             site.word.animate(effect.moveRandom(false), undefined, true)
//     }
//
// })


// const circles = [...document.querySelectorAll('circle')]
// console.log(circles)
setTimeout(() => {
    site.word.animate(animationConfig.wave)
}, 3000)

setInterval(() => {
    site.word.animate(animationConfig.wave)
}, 8000)
//
// window.onmousemove = (e) => {
//     const [x, y] = [e.x, e.y]
//     circles.forEach(item => {
//         console.log(item.position, item.y)
//         // item.x - e.x
//     })
// }