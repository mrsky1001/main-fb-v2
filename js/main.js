
const  translateX = (isUp = true) => {

    anime({
        translateX: function(x) {
            console.log(x)

            let r = anime.random(0, 270);
            return isUp?r:-r
        },
        easing: 'easeInOutQuad',
        duration: 1000,
        complete: translateX
    });
}

const translateXUp = translateX(true)
const translateXDown = translateX(false)


const effect = {
    options: {
        shapeColors: ['#FD74FF', '#3771FC', '#7C5CE4', '#542A95', '#ACC7FE'],
        shapeTypes: ['rect', 'polygon', 'circle'],
        totalShapes: 3
    }, wave: {
        shapesAnimationOpts: {
            translateX: function() {
                return anime.random(0, 270);
            },
            easing: 'easeInOutQuad',
            duration: 750,
        }
    }, moveRandom:(isUp)=> {return {
        shapesAnimationOpts: {
            translateX: ()=>  {
                console.log(isUp)
                let r = anime.random(0, 570);
                return isUp?'+='+r:'+=-'+r
            },
            duration:2000,
            easing: 'easeInOutSine',
            complete: translateX
        }
        }
    }, wave2: {
        shapesAnimationOpts: {
            duration: 3500,
            scale: [
                {value: .1, easing: 'easeOutSine', duration: 500},
                {value: 1, easing: 'easeInOutQuad', duration: 1200}
            ],
            delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
        }
    },
    block: {
        shapesAnimationOpts: {
            duration: 3500,
            easing: 'easeOutExpo',
            translateX: t => [t.dataset.tx, anime.random(-250, 250)],
            translateY: t => [t.dataset.ty, anime.random(-250, 250)],
            scale: 1,
            rotate: 0,
            opacity: {
                value: 1,
                duration: 200,
                easing: 'linear'
            }
        }
    },
    show: {
        lettersAnimationOpts: {
            duration: 1200,
            delay: () => anime.random(0, 75),
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            rotate: () => [anime.random(-150, 250), 0]
        }, shapesAnimationOpts: {
            duration: 3000,
            easing: 'easeOutExpo',
            translateY: t => {
                const ty = anime.random(300, 3000);
                t.dataset.ty = ty;
                return [anime.random(-200, 100), ty];
            }, scale: t => {
                const s = randomBetween(0, 1);
                const s2 = randomBetween(0, 1);
                t.dataset.s = s;
                return [s, s2];
            }, rotate: () => anime.random(-45, 45), opacity: {
                value: [0, 0.9], duration: 600, delay: 300, easing: 'linear'
            }
        }
    }
};

class Site {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = el;
        this.words = []
        this.isAnimate = false
        // this.words.forEach(w => w.hide(effect.hide));
        // Array.from(document.getElementsByTagName('svg')).forEach(e => e.remove())
        this.DOM.bg = this.DOM.el.querySelector('.title-section');
        this.DOM.word = this.DOM.el.querySelector('.title-section');

        this.word = new Word(this.DOM.word, effect.options);
        // this.words.push(this.word)
        this.word.show(effect.show)
    }


    reset() {


        if (!this.isAnimate) {
            this.DOM.bg.style.transform = 'none';
            this.isAnimate = true
            this.DOM.word = this.DOM.el.querySelector('.title-section');
            this.word.init(this.DOM.word)
            this.word.show(effect.show);


            setTimeout(() => {
                this.isAnimate = false
            }, 1000)
        }
    }
}

Array.from(document.getElementsByClassName('title-section')).forEach(v => {
    charming(v);
})

const site = new Site(document.querySelector('.start-section'))

document.getElementsByClassName('shapes')[0].addEventListener('click',()=>{
    site.word.animate(effect.wave)
})

window.addEventListener('wheel',(e)=>{
console.log(e.deltaY)
    if(e.deltaY> 0)
    site.word.animate(effect.moveRandom(true))
    else
        site.word.animate(effect.moveRandom(false))

})

