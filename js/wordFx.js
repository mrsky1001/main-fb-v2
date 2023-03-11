/**
 * wordF2x.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2017, Codrops
 * http://www.codrops.com
 */
{
    // From https://davidwalsh.name/javascript-debounce-function.
    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    // From http://snipplr.com/view/37687/random-number-float-generator/
    function randomBetween(minValue, maxValue, precision) {
        if (typeof (precision) == 'undefined') {
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
    }

    let winsize = {width: window.innerWidth, height: window.innerHeight};

    class Shape {
        constructor(type, letterRect, options) {
            this.DOM = {};
            this.options = {
                shapeTypes: ['circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline'],
                shapeColors: ['#e07272', '#0805b5', '#49c6ff', '#8bc34a', '#1e1e21', '#e24e81', '#e0cd24'],
                shapeFill: true,
                shapeStrokeWidth: 1
            }
            Object.assign(this.options, options);
            this.type = type || this.options.shapeTypes[0];
            if (this.type !== 'random' && !this.options.types.includes(this.type)) return;
            if (this.type === 'random') this.type = this.options.shapeTypes[randomBetween(0, this.options.shapeTypes.length - 1, 0)];
            this.letterRect = letterRect;
            this.init();
        }

        init() {
            this.DOM.el = document.createElementNS('http://www.w3.org/2000/svg', this.type);
            // this.DOM.el.style.opacity = 0;
            this.configureShapeType();

            if (this.options.shapeFill) {
                this.DOM.el.setAttribute('fill', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
            } else {
                this.DOM.el.setAttribute('fill', 'none');
                this.DOM.el.setAttribute('stroke-width', this.options.shapeStrokeWidth);
                this.DOM.el.setAttribute('stroke', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
            }
        }

        configureShapeType() {
            this.DOM.el.style.transformOrigin = `${this.letterRect.left + this.letterRect.width / 2}px ${this.letterRect.top + this.letterRect.height / 2}px`;

            if (this.type === 'circle') {
                const r = 0.5 * this.letterRect.width;
                this.DOM.el.setAttribute('r', r);
                this.DOM.el.setAttribute('cx', this.letterRect.left + this.letterRect.width);
                this.DOM.el.setAttribute('cy', this.letterRect.top + this.letterRect.height);
            } else if (this.type === 'rect') {
                const w = randomBetween(0.05, 0.5, 3) * this.letterRect.width;
                const h = randomBetween(0.05, 0.5, 3) * this.letterRect.height;
                this.DOM.el.setAttribute('width', w);
                this.DOM.el.setAttribute('height', h);
                this.DOM.el.setAttribute('x', this.letterRect.left + (this.letterRect.width - w));
                this.DOM.el.setAttribute('y', this.letterRect.top + (this.letterRect.height - h));
            } else if (this.type === 'polygon') {
                this.DOM.el.setAttribute('points', `${this.letterRect.left} ${this.letterRect.top + this.letterRect.height}, ${this.letterRect.left + this.letterRect.width } ${this.letterRect.bottom - this.letterRect.width}, ${this.letterRect.left + this.letterRect.width} ${this.letterRect.top + this.letterRect.height}`);
                // this.DOM.el.setAttribute('obj-model', {obj: '/home/mrsky1001/devel/github/svelte_daisy_talwind/decorative-letter-animations/js/jj.obj'})
            }
        }

        onResize(letterRect) {
            this.letterRect = letterRect;
            this.configureShapeType();
        }
    }

    class Shape2 {
        constructor(type, options) {
            this.DOM = {};
            this.options = {
                shapeTypes: ['circle', 'rect', 'polygon', 'ellipse', 'line', 'polyline'],
                shapeColors: ['#e07272', '#0805b5', '#49c6ff', '#8bc34a', '#1e1e21', '#e24e81', '#e0cd24'],
                shapeFill: true,
                shapeStrokeWidth: 1
            }
            Object.assign(this.options, options);
            this.type = type || this.options.shapeTypes[0];
            if (this.type !== 'random' && !this.options.types.includes(this.type)) return;
            if (this.type === 'random') this.type = this.options.shapeTypes[randomBetween(0, this.options.shapeTypes.length - 1, 0)];
            this.init();
        }

        init() {
            this.DOM.el = document.createElementNS('http://www.w3.org/2000/svg', this.type);
            // this.DOM.el.style.opacity = 0;
            this.configureShapeType();

            if (this.options.shapeFill) {
                this.DOM.el.setAttribute('fill', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
            } else {
                this.DOM.el.setAttribute('fill', 'none');
                this.DOM.el.setAttribute('stroke-width', this.options.shapeStrokeWidth);
                this.DOM.el.setAttribute('stroke', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
            }
        }

        configureShapeType() {
            this.DOM.el.style.transformOrigin = `100px 100px`;
            const w = randomBetween(0.05, 5, 3);
            const h = randomBetween(0.05, 5, 3);
            const x = randomBetween(0.05, window.outerWidth, 3);
            const y = randomBetween(0.05, window.outerHeight*3, 3);
            const z = randomBetween(0.05, window.outerHeight*3, 3);
            const s = randomBetween(0.05, 20, 3)+200;

            if (this.type === 'circle') {
                const r = 0.5 * 20;
                this.DOM.el.setAttribute('r', r);
                this.DOM.el.setAttribute('cx', x);
                this.DOM.el.setAttribute('cy', y);
            } else if (this.type === 'rect') {
                this.DOM.el.setAttribute('width', w*z);
                this.DOM.el.setAttribute('height', h*z);
                this.DOM.el.setAttribute('x', x*z);
                this.DOM.el.setAttribute('y', y*z);
            } else if (this.type === 'polygon') {
                this.DOM.el.setAttribute('points', `${z*s+10} ${z*s+500}, ${z*s+500} ${z*s+500}, ${z*s+200} ${z*s}`);
                // this.DOM.el.setAttribute('obj-model', {obj: '/home/mrsky1001/devel/github/svelte_daisy_talwind/decorative-letter-animations/js/jj.obj'})
            }
        }

        onResize(letterRect) {
            this.letterRect = letterRect;
            this.configureShapeType();
        }
    }

    class Letter {
        constructor(el, svg, options) {
            this.DOM = {};
            this.DOM.el = el;
            this.DOM.svg = svg;
            this.options = {
                totalShapes: 10
            }
            Object.assign(this.options, options);
            this.rect = this.DOM.el.getBoundingClientRect();
            console.log(this.options.totalShapes)
            this.totalShapes = this.options.totalShapes;
            this.init();
            // this.initEvents();
        }

        init() {
            this.shapes = [];
            for (let i = 0; i <= this.totalShapes - 1; ++i) {
                const shape = new Shape('random', this.rect, this.options);
                this.shapes.push(shape);
                this.DOM.svg.appendChild(shape.DOM.el);
            }
        }

        // initEvents() {
        //     window.addEventListener('resize', debounce(() => {
        //         this.rect = this.DOM.el.getBoundingClientRect();
        //         for (let i = 0; i <= this.totalShapes - 1; ++i) {
        //             const shape = this.shapes[i];
        //             shape.onResize(this.rect);
        //         }
        //     }, 20));
        // }
    }

    class Word {
        constructor(el, options) {
            this.DOM = {shapes: []};
            this.options = {
                shapesOnTop: false
            }
            Object.assign(this.options, options);
            this.init(el);
            // this.initEvents();
        }

        init(el) {
            this.DOM.el = el;
            Array.from(document.getElementsByClassName('shapes')).forEach(e => e.remove())

            this.createSVG();
            this.letters = [];
            // Array.from(this.DOM.el.querySelectorAll('span')).forEach(letter => this.letters.push(new Letter(letter, this.DOM.svg, this.options)));
        }

        // initEvents() {
        //     window.addEventListener('resize', debounce(() => {
        //         winsize = {width: window.innerWidth, height: window.innerHeight};
        //         // this.DOM.svg.setAttribute('width', `${winsize.width}px`);
        //         // this.DOM.svg.setAttribute('height', `${winsize.width}px`);
        //         // this.DOM.svg.setAttribute('viewbox', `0 0 ${winsize.width} ${winsize.height}`);
        //         this.DOM.svg.setAttribute('width', `100%`);
        //         this.DOM.svg.setAttribute('height', `100%`);
        //         this.DOM.svg.setAttribute('viewbox', `0 0 100% 100%`);
        //     }, 20));
        // }

        createSVG() {
            this.DOM.svg = null
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('class', 'shapes');
            this.DOM.svg.setAttribute('width', `100%`);
            this.DOM.svg.setAttribute('height', `100%`);
            // this.DOM.svg.setAttribute('width', `${winsize.width}px`);
            // this.DOM.svg.setAttribute('height', `${winsize.width}px`);
            this.DOM.svg.setAttribute('viewbox', `0 0 100% 100%`);
            // this.DOM.svg.setAttribute('viewbox', `0 0 ${winsize.width} ${winsize.height}`);
            const content = document.getElementsByClassName('content')[0]

            if (this.options.shapesOnTop) {
                this.DOM.el.parentNode.insertBefore(this.DOM.svg, this.DOM.el.nextSibling);
            } else {
                content.insertBefore(this.DOM.svg, content.firstChild);
            }
        }

        show(config) {
            return this.toggle('show', config);
        }

        hide(config) {
            return this.toggle('hide', config);
        }

        toggle(action = 'show', config) {
            this.rect = this.DOM.el.getBoundingClientRect();
            this.shapes = [];
            for (let i = 0; i <= 1000 - 1; ++i) {
                const shape = new Shape2('random', this.options);
                this.shapes.push(shape);
                this.DOM.svg.appendChild(shape.DOM.el);
            }

            return new Promise((resolve, reject) => {
                // const toggleNow = () => {
                //     for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
                //         this.letters[i].DOM.el.style.opacity = action === 'show' ? 1 : 0;
                //     }
                //     resolve();
                // };

                // if (config && Object.keys(config).length !== 0) {
                //     if (config.shapesAnimationOpts) {
                //         for (let i = 0, len = this.letters.length; i <= len - 1; ++i) {
                //             const letter = this.letters[i];
                //             const DOM = this.DOM
                //             setTimeout(function (letter, DOM) {
                //                 return () => {
                //                     console.log(config.shapes)
                //                     config.shapesAnimationOpts.targets = letter.shapes.map(shape => shape.DOM.el);
                //                     anime(config.shapesAnimationOpts);
                //
                //
                //                 }
                //             }(letter, DOM), config.lettersAnimationOpts && config.lettersAnimationOpts.delay ? config.lettersAnimationOpts.delay(letter.DOM.el, i) : 0);
                //         }
                //     }
                //     if (config.lettersAnimationOpts) {
                //         config.lettersAnimationOpts.targets = this.letters.map(letter => letter.DOM.el);
                //         config.lettersAnimationOpts.complete = () => {
                //             if (action === 'hide') {
                //                 for (let i = 0, len = config.lettersAnimationOpts.targets.length; i <= len - 1; ++i) {
                //                     config.lettersAnimationOpts.targets[i].style.transform = 'none';
                //                 }
                //             }
                //             resolve();
                //         };
                //         anime(config.lettersAnimationOpts);
                //     } else {
                //         resolve();
                //     }
                // } else {
                //     resolve();
                // }
            });
        }
    }

    window.Word = Word;
}
