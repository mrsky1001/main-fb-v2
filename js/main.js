const effect =
    // Effect 1
    {
        options: {
            shapeColors: ['#FD74FF', '#3771FC', '#7C5CE4', '#542A95', '#ACC7FE'],
            shapeTypes: ['rect', 'polygon', 'circle'],
            totalShapes: 2
        },
        hide: {
            lettersAnimationOpts: {
                duration: () => anime.random(800, 2000),
                delay: () => anime.random(0, 80),
                easing: 'easeInOutExpo',
                opacity: 0,
                translateY: '300%',
                rotateZ: () => anime.random(-5000, 5000)
            },
            shapesAnimationOpts: {
                duration: 350,
                easing: 'easeOutExpo',
                translateX: t => [t.dataset.tx, anime.random(-250, 250)],
                translateY: t => [t.dataset.ty, anime.random(-250, 250)],
                scale: 100,
                rotate: 0,
                opacity: {
                    value: 0,
                    duration: 200,
                    easing: 'linear'
                }
            }
        },
        show: {
            lettersAnimationOpts: {
                duration: 800,
                delay: () => anime.random(0, 75),
                easing: 'easeInOutExpo',
                opacity: [0, 1],
                translateY: ['-300%', '0%'],
                rotate: () => [anime.random(-150, 250), 0]
            },
            shapesAnimationOpts: {
                duration: 2000,
                easing: 'easeOutExpo',
                translateY: t => {
                    const ty = anime.random(-800, 800);
                    t.dataset.ty = ty;
                    return [anime.random(-10, 10), ty];
                },
                scale: t => {
                    const s = randomBetween(0.5, 1);
                    t.dataset.s = s;
                    return [s, s];
                },
                rotate: () => anime.random(-45, 45),
                opacity: {
                    value: [0, 0.9],
                    duration: 600,
                    delay: 300,
                    easing: 'linear'
                }
            }
        }
    };

class Site {
    constructor(el) {
        this.DOM = {};
        this.DOM.el = el;
        this.DOM.bg = this.DOM.el.querySelector('.slide__bg');
        this.DOM.word = this.DOM.el.querySelector('.word');

        this.word = new Word(this.DOM.word, effect.options);


        this.isAnimating = true;
        this.word.show(effect.show).then(() => this.isAnimating = false);
    }

    show() {
        if (this.isAnimating) return;
        this.isAnimating = true;

        this.DOM.bg.style.transform = 'none';
        anime({
            targets: this.DOM.bg,
            duration: 600,
            easing: [0.2, 1, 0.3, 1],
            translateY: ['0%', '-100%'],
            complete: () => {
                this.word.show(effect.show).then(() => this.isAnimating = false);
            }
        })
    }
}

const site = new Site(document.querySelector('.slideshow'));
site.show();
