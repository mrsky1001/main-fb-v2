const barsBtn = document.getElementById('bars-btn')
const navbar = document.getElementById('navbar')

barsBtn.onclick = () => {
    navbar.classList.add('show');
    anime(animationConfig.showEL(navbar).opts)
}

navbar.onclick = () => {
    anime(animationConfig.hideEL(navbar).opts).finished.then(() => {
        setTimeout(() => {
            navbar.classList.remove('show');
        }, 500)
    })
}