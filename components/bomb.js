const Bomb = Vue.component('bomb', {
    props: [],
    template: '<div v-bind:style="styleObject()"></div>',
    computed: {

    },
    data: function() {
        return {
            'width': 16,
            'height': 16,
            'bombTickRate': 200,
            'backgroundImage': 'url(\'super_bomberman_tiles.png\')',
            'backgroundPositionPointer': 0,
            'backgroundPosition': '-379px -563px',
            'backgroundPositions': [
                '-379px -563px',
                '-396px -563px',
                '-413px -563px',
                '-396px -563px',
            ]
        }
    },
    methods: {
        styleObject: function () {
            const row = this.row;
            const col = this.col;

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
            this.backgroundPositionPointer = this.backgroundPositionPointer + 1;
            this.backgroundPositionPointer = this.backgroundPositionPointer % this.backgroundPositions.length;

            this.backgroundPosition = this.backgroundPositions[this.backgroundPositionPointer];
        }
    },
    created: function() {
        console.log('bomb created');
    },
    mounted: function () {
        console.log('bomb mounted');

        setInterval(() => {
            this.changeBackground();
        }, this.bombTickRate);
    }
});