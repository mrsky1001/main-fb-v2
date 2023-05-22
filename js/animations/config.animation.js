const colors = ['#FD74FF', '#3771FC', '#7C5CE4', '#542A95', '#ACC7FE']
const animationConfig = {
    options: {
        shapeColors: colors,
        shapeTypes: ['rect', 'polygon', 'circle'],
        totalShapes: 3
    },
    showEL: (targets, time = 200) => ({
        name: 'showEL',
        opts: {
            targets: targets,
            opacity: 1,
            easing: 'easeInOutSine',
            duration: time,
        }
    }), hideEL: (targets, time = 200) => ({
        name: 'hideEL',
        opts: {
            targets: targets,
            opacity: 0,
            easing: 'easeInOutSine',
            duration: time,
        }
    }),
    onHoverSVG: (targets) => ({
        name: 'onHoverSVG',
        opts: {
            targets: targets,
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutSine',
            stroke: "#fd74ff",
            fill: "#fd74ff",
            duration: 500,
            delay: function (el, i) {
                return i * 250
            },
        }
    }), offHoverSVG: (targets, fill = "#333", stroke = "#333") => ({
        name: "offHoverSVG",
        opts: {
            targets: targets,
            strokeDashoffset: [
                anime.setDashoffset,
                0
            ],
            easing: "easeInOutSine",
            stroke: function (el, i) {
                return el.getAttribute('stroke-off') ?? stroke
            },
            fill: function (el, i) {
                return el.getAttribute('fill-off') ?? fill
            },
            duration: 500,
            delay: function (el, i) {
                return i * 250;
            }
        }
    }),
    wave: {
        name: 'wave',
        opts: {
            translateX: () => {
                let r = anime.random(-50, 50);
                return '+=' + r
            }, translateY: () => {
                let r = anime.random(-50, 50);
                return '+=' + r
            },
            rotate: () => {
                let r = anime.random(-5, 5);
                return '+=' + r
            },
            direction: 'alternate',
            loop: true,
            duration: 8000,
            easing: 'easeInOutSine',

        }
    },
    // moveRandom: (isUp) => {
    //     return {
    //         name: 'moveRandom',
    //         opts: {
    //             translateX: () => {
    //                 let r = anime.random(200, 570);
    //                 return isUp ? '+=' + r : '+=-' + r
    //             }, translateY: () => {
    //                 let r = anime.random(200, 570);
    //                 return isUp ? '+=' + r : '+=-' + r
    //             },
    //             rotate: () => {
    //                 let r = anime.random(-4, 4);
    //                 return isUp ? '+=' + r : '+=' + r
    //             },
    //             duration: 5000,
    //             easing: 'easeInOutSine',
    //
    //         }
    //     }
    // },
    // wave2: {
    //     name: 'wave2',
    //     opts: {
    //         duration: 3500,
    //         scale: [
    //             {value: .1, easing: 'easeOutSine', duration: 500},
    //             {value: 1, easing: 'easeInOutQuad', duration: 1200}
    //         ],
    //         delay: anime.stagger(200, {grid: [14, 5], from: 'center'})
    //     }
    // },
    // block: {
    //     name: 'block',
    //     opts: {
    //         duration: 3500,
    //         easing: 'easeOutExpo',
    //         translateX: t => [t.dataset.tx, anime.random(-250, 250)],
    //         translateY: t => [t.dataset.ty, anime.random(-250, 250)],
    //         scale: 1,
    //         rotate: 0,
    //         opacity: {
    //             value: 1,
    //             duration: 200,
    //             easing: 'linear'
    //         }
    //     }
    // },
    showShapes: {
        name: 'show',
        lettersAnimationOpts: {
            duration: 1200,
            delay: () => anime.random(0, 75),
            easing: 'easeInOutExpo',
            opacity: [0, 1],
            translateY: ['-100%', '0%'],
            // rotate: () => [anime.random(-150, 250), 0]
        }, opts: {
            duration: 4000,
            easing: 'easeOutExpo',
            translateX: t => [t.dataset.tx, anime.random(-1500, 2500)],
            translateY: t => [t.dataset.ty, anime.random(-250, 250)],
            scale: 1,
            // translateY: t => {
            //     const ty = anime.random(100, 300);
            //     t.dataset.ty = ty;
            //     return [anime.random(100, 600), ty];
            // },
            // }, scale: t => {
            //     const s = randomBetween(0, 1);
            //     const s2 = randomBetween(0, 1);
            //     t.dataset.s = s;
            //     return [s, s2];
            // },
            // rotate: () => anime.random(-50, 62),
            opacity: {
                value: [0, 0.9], duration: 600, delay: 300, easing: 'linear'
            }
        }
    }
};
