const effect = {
    options: {
        shapeColors: ['#FD74FF', '#3771FC', '#7C5CE4', '#542A95', '#ACC7FE'],
        shapeTypes: ['rect', 'polygon', 'circle'],
        totalShapes: 2
    }, hide: {
        shapesAnimationOpts: {
            duration: 350,
            easing: 'easeOutExpo',
            translateX: t => [t.dataset.tx, anime.random(-250, 250)],
            translateY: t => [t.dataset.ty, anime.random(-250, 250)],
            scale: 1,
            rotate: 0,
            opacity: {
                value: 0,
                duration: 200,
                easing: 'linear'
            }
        }
    }, show: {
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
                const ty = anime.random(-300, 300);
                t.dataset.ty = ty;
                return [anime.random(-20, 10), ty];
            }, scale: t => {
                const s = randomBetween(-1, 1);
                const s2 = randomBetween(-1, 1);
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
        this.DOM.bg = this.DOM.el.querySelector('.slide__bg');
        this.DOM.word = this.DOM.el.querySelector('.active .word');

        this.word = new Word(this.DOM.word, effect.options);
        // this.words.push(this.word)
        this.word.show(effect.show).then();
    }

    // show() {
    //     this.DOM.bg.style.transform = 'none';
    //     anime({
    //         targets: this.DOM.bg,
    //         duration: 600,
    //         easing: [0.2, 1, 0.3, 1],
    //         translateY: ['0%', '-100%'],
    //         complete: () => {
    //             setTimeout(() => {
    //                 this.isAnimate = false
    //                 anime.remove(this.DOM.bg)
    //
    //             }, 100)
    //
    //         }
    //     })
    // }

    reset() {


        if (!this.isAnimate) {
            this.DOM.bg.style.transform = 'none';
            this.isAnimate = true
            this.DOM.word = this.DOM.el.querySelector('.active .word');
            this.word.init(this.DOM.word)
            this.word.show(effect.show);


            setTimeout(() => {
                this.isAnimate = false
            }, 1000)
            // this.words.forEach(w => w.hide(effect.hide));
            // Array.from(document.getElementsByTagName('svg')).forEach(e => e.remove())
            // this.DOM.bg = this.DOM.el.querySelector('.slide__bg');
            // this.DOM.word = this.DOM.el.querySelector('.active .word');
            //
            // const word = new Word(this.DOM.word, effect.options);
            // this.words.push(word)
            // word.show(effect.show).then();

            // this.show()

        }
    }
}

Array.from(document.getElementsByClassName('word')).forEach(v => {
    charming(v);
})

const site = new Site(document.querySelector('.slideshow'))
