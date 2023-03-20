{
    function randomBetween(minValue, maxValue, precision) {
        if (typeof (precision) == 'undefined') {
            precision = 2;
        }

        return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue).toFixed(precision);
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
            // this.DOM.el.style.transformOrigin = `100px 100px`;
            const maxH = document.body.getElementsByTagName('main')[0].scrollHeight
            const e = 40

            console.log()
            const w = randomBetween(0.05, e, 3);
            const h = randomBetween(0.05, e, 3);
            const x = randomBetween(document.body.offsetWidth / 2, document.body.offsetWidth, 1);
            const y = randomBetween(0, maxH, 1);
            const s = randomBetween(0.5, e, 1);
            this.DOM.el.setAttribute('opacity', '0.1');

            if (this.type === 'circle') {
                this.DOM.el.setAttribute('r', s * 0.8);
                this.DOM.el.setAttribute('cx', x);
                this.DOM.el.setAttribute('cy', y);
            } else if (this.type === 'rect') {
                this.DOM.el.setAttribute('width', w * 2);
                this.DOM.el.setAttribute('height', h * 2);
                this.DOM.el.setAttribute('x', x);
                this.DOM.el.setAttribute('y', y);
            } else if (this.type === 'polygon') {
                const r = (Math.random() * 2 > 0 ? 1 : -1)
                const xx = y * 0.7
                const ss1 = s * 0.5
                const ss2 = r * s * 0.9

                this.DOM.el.setAttribute('points', `${xx} ${xx - ss1}, ${xx + ss1} ${xx}, ${xx - ss2} ${xx}`);
                // this.DOM.el.setAttribute('obj-model', {obj: '/home/mrsky1001/devel/github/svelte_daisy_talwind/decorative-letter-animations/js/jj.obj'})
            }
        }

        onResize(letterRect) {
            this.letterRect = letterRect;
            this.configureShapeType();
        }
    }


    class Animation {
        constructor(el, options, config) {
            this.DOM = {};
            this.options = {};

            this.animeStack = [];

            Object.assign(this.options, options);
            this.init(el, config);
        }

        init(el, config) {
            this.DOM.el = el;
            this.createSVG();

            this.letters = Array.from(this.DOM.el.querySelectorAll('span'))
            config.lettersAnimationOpts.targets = this.letters
            anime(config.lettersAnimationOpts);

            this.rect = this.DOM.el.getBoundingClientRect();
            this.shapes = [];
            for (let i = 0; i <= 150 - 1; ++i) {
                const shape = new Shape2('random', this.options);
                this.shapes.push(shape);
                this.DOM.svg.appendChild(shape.DOM.el);
            }

            config.opts.targets = this.shapes.map(shape => shape.DOM.el);
            anime(config.opts)
        }

        createSVG() {
            this.DOM.svg = null
            this.DOM.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            this.DOM.svg.setAttribute('id', 'shapes');
            this.DOM.svg.setAttribute('class', 'shapes');
            this.DOM.svg.setAttribute('width', `100%`);
            this.DOM.svg.setAttribute('height', `100%`);
            this.DOM.svg.setAttribute('viewbox', `0 0 100% 100%`);
            const content = document.getElementsByClassName('container')[0]

            content.insertBefore(this.DOM.svg, content.firstChild);
        }

        show(config) {
            return this.toggle('show', config);
        }

        hide(config) {
            return this.toggle('hide', config);
        }

        animate(config, shapes, isForceAnimate) {
            if (!this.isAnimate) {
                this.isAnimate = true

                config.opts.targets = shapes ?? this.shapes.map(shape => shape.DOM.el);

                this.animeStack.forEach(a => {
                    a.pause()
                })

                const animation = anime(config.opts)
                animation.name = config.name

                if (!this.animeStack.find(a => a.name === animation.name))
                    this.animeStack.push(animation)

                animation.finished.then(() => {
                    this.isAnimate = false

                    const idx = this.animeStack.findIndex(a => a.name === config.name)
                    this.animeStack.splice(idx, 1)
                });

            }
        }
    }


    const el = document.querySelector('.start-section .title')
    window.Animation = new Animation(el, animationConfig.options, animationConfig.showShapes);
}
