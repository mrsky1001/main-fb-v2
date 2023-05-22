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
const themes = {light: 0, dark: 1}
const themeContainer = document.getElementById('themeContainer')


// function htmlToElement(html) {
//     var template = document.createElement('template');
//     html = html.trim(); // Never return a text node of whitespace as the result
//     template.innerHTML = html;
//     return template.content.firstChild;
// }


function setFillAllSVG(fill, stroke){
    const svgs =Array.from(document.getElementsByClassName("path"))
    svgs.forEach(svg=>{
        svg.setAttribute('fill-off', fill)
        svg. setAttribute('stroke-off', stroke)
    })
}

function setTheme(theme) {
    const lightSVG = '<path fill-off="#fff" stroke-off="#fff" class="path"  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd"></path>'
    const darkSVG = '<path fill-off="#444" stroke-off="#444" class="path" d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>'

    const svgEl = themeContainer.getElementsByTagName("svg")[0]

    if (Number(theme) === themes.dark) {
        const fill ='#fff'
        svgEl.setAttribute('fill', fill)
        svgEl.innerHTML = lightSVG

        setFillAllSVG(fill, fill)
        document.documentElement.setAttribute('theme', 'dark');
    } else {
        const fill ='#444'
        svgEl.setAttribute('fill', fill)
        svgEl.innerHTML = darkSVG

        setFillAllSVG(fill, fill)
        document.documentElement.removeAttribute('theme');
    }
}

setTheme(localStorage.getItem('__foma-blog_theme') ?? themes.light)

themeContainer.onclick = () => {
    const currentTheme = localStorage.getItem('__foma-blog_theme') ?? themes.light

    const newTheme = Number(currentTheme) === themes.light ? themes.dark : themes.light
    localStorage.setItem('__foma-blog_theme', newTheme)
    setTheme(newTheme)
}

