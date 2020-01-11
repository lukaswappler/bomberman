Vue.component('tile', {
    props: ['col', 'row', 'isBorder', 'isBlock'],
    template: '<div v-bind:style="styleObject()"></div>',
    computed: {

    },
    methods: {
        styleObject: function () {
            const row = this.row;
            const col = this.col;

            const posLeft = col * 16;
            const posTop = row * 16;

            var background;
            if (this.isBorder) {
                background = 'url(\'super_bomberman_tiles.png\')  -294px -461px';
            } else if (this.isBlock) {
                background = 'url(\'super_bomberman_tiles.png\')  -294px -461px';
            } else {
                background = 'url(\'super_bomberman_tiles.png\')  -328px -461px';
            }

            return {

                'image-rendering': 'optimizeSpeed',
                'image-rendering': '-moz-crisp-edges',
                'image-rendering': '-o-crisp-edges',
                'image-rendering': '-webkit-optimize-contrast',
                'image-rendering': 'pixelated',
                'image-rendering': 'optimize-contrast',
                '-ms-interpolation-mode': 'nearest-neighbor',

                'z-index': 100,
                position: 'absolute',
                //background: 'url(\'super_bomberman_tiles.png\')  -277px -461px',
                //background: 'url(\'super_bomberman_tiles.png\')  -294px -461px',
                background: background ,
                height: 16,
                width: 16,
                'top': posTop,
                'left': posLeft
            }
        },
        addBomb: function() {
            console.log('addBomb');
            console.log(this.$el);


            let bomb = Vue.extend(Bomb);
            let instance = new bomb();
            instance.$mount();

            this.$el.appendChild(instance.$el);

            //new Bomb();
        }

    },
    created: function() {
        console.log('tile created');
    },
    mounted: function () {
        console.log('tile mounted');
        this.$on('dropBombEvent', this.addBomb);

    }
});