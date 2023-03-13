{
    function randomBetween(minValue, maxValue, precision) {
        if (typeof (precision) == 'undefined') {
            precision = 2;
        }
        return parseFloat(Math.min(minValue + (Math.random() * (maxValue - minValue)), maxValue).toFixed(precision));
    }

    let winsize = {width: window.innerWidth, height: window.innerHeight};

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
                this.DOM.el.setAttribute('opacity', '0.1');
            } else {
                this.DOM.el.setAttribute('fill', 'none');
                this.DOM.el.setAttribute('stroke-width', this.options.shapeStrokeWidth);
                this.DOM.el.setAttribute('stroke', this.options.shapeColors[randomBetween(0, this.options.shapeColors.length - 1, 0)]);
            }
        }

        configureShapeType() {
            this.DOM.el.style.transformOrigin = `100px 100px`;
            const e = window.outerWidth / 50
            const w = randomBetween(0.05, e, 3);
            const h = randomBetween(0.05, e, 3);
            const x = randomBetween(window.outerWidth, window.outerWidth, 1);
            const y = randomBetween(window.outerHeight / 2, window.outerHeight, 1);
            const z = randomBetween(window.outerHeight / 2, window.outerHeight, 1);
            const s = randomBetween(0.05, e, 3);
            this.DOM.el.setAttribute('opacity', '0.1');

            if (this.type === 'circle') {
                const r = 0.5 * s;
                this.DOM.el.setAttribute('r', r);
                this.DOM.el.setAttribute('cx', x);
                this.DOM.el.setAttribute('cy', y);
            } else if (this.type === 'rect') {
                this.DOM.el.setAttribute('width', w * 2);
                this.DOM.el.setAttribute('height', h);
                this.DOM.el.setAttribute('x', x);
                this.DOM.el.setAttribute('y', y);
            } else if (this.type === 'polygon') {
                const xx = x / 2
                const d = 300
                this.DOM.el.setAttribute('points', `${xx} ${xx + s}, ${xx + s} ${xx}, ${xx - s} ${xx}`);
                // this.DOM.el.setAttribute('obj-model', {obj: '/home/mrsky1001/devel/github/svelte_daisy_talwind/decorative-letter-animations/js/jj.obj'})
            }
        }

        onResize(letterRect) {
            this.letterRect = letterRect;
            this.configureShapeType();
        }
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
            this.DOM.svg.setAttribute('height', `4000px`);
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

        animate(config) {
            if (!this.isAnimate) {
                this.isAnimate = true

                config.shapesAnimationOpts.targets = this.shapes.map(shape => shape.DOM.el);

                anime(config.shapesAnimationOpts).finished.then(() => {
                    this.isAnimate = false
                });
            }
        }

        toggle(action = 'show', config) {
            if (!this.isAnimate) {
                this.isAnimate = true

                this.letters = Array.from(this.DOM.el.querySelectorAll('span'))
                config.lettersAnimationOpts.targets = this.letters
                anime(config.lettersAnimationOpts);

                this.rect = this.DOM.el.getBoundingClientRect();
                this.shapes = [];
                for (let i = 0; i <= 200 - 1; ++i) {
                    const shape = new Shape2('random', this.options);
                    this.shapes.push(shape);
                    this.DOM.svg.appendChild(shape.DOM.el);
                }

                config.shapesAnimationOpts.targets = this.shapes.map(shape => shape.DOM.el);
                anime(config.shapesAnimationOpts).finished.then(() => {
                    this.isAnimate = false

                });
            }
        }
    }

    window.Word = Word;
}
