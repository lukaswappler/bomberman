const Bomb = Vue.component('bomb', {
    props: ['row', 'col'],
    template: '<div v-bind:style="styleObject()"></div>',
    computed: {

    },
    data: function() {
        return {
            'width': 16,
            'height': 16,
            'bombRadius': 3,
            'bombTickRate': 200,
            'bombExplodeRate': 100,
            'bombExplosionTimer': 2000,
            'tickBackgroundInterval': null,
            'exploadeBackgroundInterval': null,
            'backgroundImage': 'url(\'super_bomberman_tiles.png\')',
            'backgroundPositionPointer': 0,
            'backgroundPosition': '-379px -563px',
            'backgroundPositions': [
                '-379px -563px',
                '-396px -563px',
                '-413px -563px',
                '-396px -563px',
            ],
            'backgroundExplodePositions': [
                '-345px -512px',
                '-362px -512px',
                '-379px -512px',
                '-396px -512px',
                '-345px -529px'
            ]
        }
    },
    methods: {
        styleObject: function () {

            return {
                'image-rendering': 'optimizeSpeed',
                'image-rendering': '-moz-crisp-edges',
                'image-rendering': '-o-crisp-edges',
                'image-rendering': '-webkit-optimize-contrast',
                'image-rendering': 'pixelated',
                'image-rendering': 'optimize-contrast',
                '-ms-interpolation-mode': 'nearest-neighbor',

                'background-image': this.backgroundImage,
                'background-position': this.backgroundPosition,
                height: this.height,
                width: this.width
            }
        },
        changeBackground: function() {
            console.log('changeBackground');

            this.backgroundPositionPointer = this.backgroundPositionPointer + 1;
            this.backgroundPositionPointer = this.backgroundPositionPointer % this.backgroundPositions.length;

            this.backgroundPosition = this.backgroundPositions[this.backgroundPositionPointer];
        },
        changeExplodeBackground: function() {
            this.backgroundPosition = this.backgroundExplodePositions[this.backgroundPositionPointer];

            this.backgroundPositionPointer = this.backgroundPositionPointer + 1;
            //this.backgroundPositionPointer = this.backgroundPositionPointer % this.backgroundExplodePositions.length;





            //animation end
            //destroy bomb itself
            if (this.backgroundPositionPointer >= this.backgroundExplodePositions.length) {
                clearInterval(this.exploadeBackgroundInterval);

                this.$destroy();

                //// remove the element from the DOM
                this.$el.parentNode.removeChild(this.$el);


                //trigger explosions in radius
                console.log('row', this.row);
                console.log('col', this.col);

                console.log(this);


            }

        }
    },
    created: function() {
        console.log('bomb created');
    },
    mounted: function () {
        console.log('bomb mounted');

        console.log('row', this.row);
        console.log('col', this.col);

        this.tickBackgroundInterval = setInterval(() => {
            this.changeBackground();
        }, this.bombTickRate);

        setTimeout(function() {
            //stop ticker background
            clearInterval(this.tickBackgroundInterval);

            this.backgroundPositionPointer = 0;



            //trigger explosion
            if (this.playground) {

                for (var i = 1; i <= this.bombRadius; i++) {
                    let center = this.playground.$children.filter(child => child.$options._componentTag === 'tile' && child.row === this.row  && child.col ===this.col)[0];

                    console.log('XX: ', i);

                    let top = this.playground.$children.filter(child => child.$options._componentTag === 'tile' && child.row === this.row - i && child.col ===this.col)[0];
                    let down = this.playground.$children.filter(child => child.$options._componentTag === 'tile' && child.row === this.row + i && child.col ===this.col)[0];
                    let left = this.playground.$children.filter(child => child.$options._componentTag === 'tile' && child.row === this.row && child.col ===this.col - i)[0];
                    let right = this.playground.$children.filter(child => child.$options._componentTag === 'tile' && child.row === this.row && child.col ===this.col + i)[0];

                    center.$emit('bombExplosion','c');
                    if (top) {
                        top.$emit('bombExplosion',  (i === this.bombRadius ? 't' : 'tt'));
                    }

                    if (down) {
                        down.$emit('bombExplosion',  (i === this.bombRadius ? 'd' : 'dd'));
                    }

                    if (left) {
                        left.$emit('bombExplosion',  (i === this.bombRadius ? 'l' : 'll'));
                    }
                    if (right) {
                        right.$emit('bombExplosion',  (i === this.bombRadius ? 'r' : 'rr'));
                    }
                }

                this.$destroy();

                //// remove the element from the DOM
                this.$el.parentNode.removeChild(this.$el);
            }

            //explode
            /*
            this.exploadeBackgroundInterval = setInterval(() => {
                this.changeExplodeBackground();
            }, this.bombExplodeRate);
            */

        }.bind(this), this.bombExplosionTimer);

    }
});