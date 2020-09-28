Vue.component('player', {
    template: '<div class="player" v-bind:style="styleObject()"></div>',

    data: function() {
        return {
            'top': 6,
            'left': 16,
            'backgroundChangeFrequency': 8,
            'backgroundImage': 'super_bomberman_players.png',
            'backgroundPosition': '-106px -46px',
            'lastMove': null,
            'lastMoveCount': 0,
            'last' : {
                'right' : null,
                'left' : null,
                'top' : null,
                'down' : null,
            },
            'backgroundPositions': {
                right: [
                    '-106px -46px',
                    '-122px -46px',
                    '-138px -46px'
                ],
                left: [
                    '-3px -43px',
                    '-19px -43px',
                    '-36px -43px'
                ],
                down: [
                    '-56px -46px',
                    '-71px -46px',
                    '-87px -46px'
                ],
                up: [
                    '-56px -20px',
                    '-73px -20px',
                    '-89px -20px'
                ]
            }
        };
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

                position: 'absolute',
                'background-image':  'url(\'' + this.backgroundImage + '\')',
                'background-position': this.backgroundPosition,
                height: 26,
                width: 16,
                'z-index': 10000,
                'top': this.top,
                'left': this.left
            };
        },
        changeBackground: function(direction) {
            let backgroundPosition = this.backgroundPositions[direction];

            if (this.lastMove === direction) {
                this.lastMoveCount++;
                //change img only after a number of moves
                if (this.lastMoveCount > this.backgroundChangeFrequency) {
                    this.lastMoveCount = 0;
                    this.last[direction]++;

                    this.last[direction] = this.last[direction] % backgroundPosition.length;
                    this.backgroundPosition = backgroundPosition[this.last[direction]];
                }

            } else {
                this.last[direction] = 0;
                this.backgroundPosition = backgroundPosition[0];
            }

            this.lastMove = direction;
        }
    },
    watch: {
        top: function(newValue, oldValue) {

            if (newValue > oldValue) {
                //down
                this.changeBackground('down');
            } else {
                //up
                this.changeBackground('up');
            }
        },
        left: function(newValue, oldValue) {

            if (newValue > oldValue) {
                //right
                this.changeBackground('right');
            } else {
                //left
                this.changeBackground('left');
            }
        }
    }
});