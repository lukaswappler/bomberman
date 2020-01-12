const BombExplosion = Vue.component('bombExplosion', {
    props: ['row', 'col'],
    template: '<div v-bind:style="styleObject()"></div>',
    computed: {

    },
    data: function() {
        return {
            'width': 16,
            'height': 16,
            'bombExplodeRate': 50,
            'tickBackgroundInterval': null,
            'backgroundImage': 'url(\'super_bomberman_tiles.png\')',
            'backgroundPositionPointer': 0,
            'backgroundPosition': null,
            'backgroundPositions': {
                'c': [
                    '-345px -512px',
                    '-362px -512px',
                    '-379px -512px',
                    '-396px -512px',
                    '-345px -529px'
                ],
                't': [
                     '-396px -478px',
                    '-396px -495px',
                    '-379px -495px',
                    '-362px -495px',
                    '-345px -495px'
                ],
                'd': [
                    '-362px -546px',
                    '-379px -546px',
                    '-396px -546px',
                    '-345px -546px',
                    '-328px -495px'
                ],
                'l': [
                    '-345px -478px',
                    '-328px -478px',
                    '-311px -478px',
                    '-294px -478px',
                    '-277px -478px'
                ],
                'r': [
                    '-294px -512px',
                    '-294px -529px',
                    '-294px -546px',
                    '-328px -512px',
                    '-328px -529px'
                ],
            }
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
            console.log('explosion:  changeBackground');


            this.backgroundPosition = this.backgroundPositions[this.explosionType][this.backgroundPositionPointer];

            this.backgroundPositionPointer = this.backgroundPositionPointer + 1;
            //this.backgroundPositionPointer = this.backgroundPositionPointer % this.backgroundExplodePositions.length;

            console.log('animate');

            //animation end
            //destroy explsoion element itself
            if (this.backgroundPositionPointer >= this.backgroundPositions[this.explosionType].length) {
                console.log('stop all');
                clearInterval(this.tickBackgroundInterval);

                this.$destroy();
                //// remove the element from the DOM
                this.$el.parentNode.removeChild(this.$el);
            }

        }
    },
    created: function() {
        console.log('explosion created');
    },
    mounted: function () {
        console.log('explosion mounted');

        this.backgroundPosition = this.backgroundPositions[this.explosionType][this.backgroundPositionPointer];

        this.tickBackgroundInterval = setInterval(() => {
            this.changeBackground();
        }, this.bombExplodeRate);

    }
});