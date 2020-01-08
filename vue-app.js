var playground = new Vue({
    el: '#playground',
    data: {
        fieldsize: 10,
        cols: 15,
        rows: 13,
        field: null,
        message2: 'field',
        player: null,
        pixelmap: null,

    },
    methods: {
        styleObject: function () {
            return {
                width: this.cols * 16,
                height: this.rows * 16
            }
        },
        isBorder: function(row, col) {


            if (row === 0 || row === this.rows - 1 ) {
                return true;
            } else if (col === 0 || col === this.cols -1) {
                return true;
            }

            return false;
        },
        isBlock: function(row, col) {
            if (col %2 === 0 && row % 2 === 0) {
                return true;
            }

            return false;
        },
        move: function(eventType, event) {

            let player = this.$children.filter(child => child.$options._componentTag === 'player')[0];


            if (eventType ==='keydown') {
                event.preventDefault();
                myGameArea.keys = (myGameArea.keys || []);
                myGameArea.keys[event.keyCode] = (event.type == "keydown");
            }
            if (eventType ==='keyup') {
                myGameArea.keys[event.keyCode] = (event.type == "keydown");
            }

            //player.top += 1;
            //player.left += 1;

        },
        updateGameArea: function () {
            if (this.player === null) {
                this.player = this.$children.filter(child => child.$options._componentTag === 'player')[0];
            }


            var tileHeight = 16;
            var tileWidth = 16;



            //myGameArea.clear();
            // myGamePiece.moveAngle = 0;
            //myGamePiece.speed = 0;

            var oldTop = this.player.top;
            var oldLeft = this.player.left;

            var currentFieldRow = Math.ceil((this.player.top + 6 ) / 16) ;
            var currentFieldCol = Math.ceil((this.player.left) / 16);




            var isRight = false;
            var isDown = false;
            var isLeft = false;
            var isUp = false;

            //left
            if (myGameArea.keys && myGameArea.keys[37]) {
                isLeft = true;
            }

            if (myGameArea.keys && myGameArea.keys[39]) {
                //right
                isRight = true;
            }

            //up
            if (myGameArea.keys && myGameArea.keys[38]) {
                isUp = true;
            }

            //down
            if (myGameArea.keys && myGameArea.keys[40]) {
                isDown = true;
            }


            var newTop = oldTop;
            var newLeft = oldLeft;

            let setNewTop = false;
            let setNewLeft = false;

            let helpLeft = 0;
            let helpTop = 0;

            if (isRight) {

                newLeft++;

                let newFieldRow1 = Math.floor((this.player.top - 6 + 16 ) / 16) ;
                let newFieldRow2 = Math.floor((this.player.top - 6 + 15 + 16) / 16) ;
                let newFieldCol = Math.ceil((newLeft) / 16);


                let newField1 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow1 && child.col === newFieldCol)[0];
                let newField2 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow2 && child.col === newFieldCol)[0];
                if (newField1 && !newField1.isBlock && !newField1.isBorder &&
                    newField2 && !newField2.isBlock && !newField2.isBorder) {
                    //this.player.left = newLeft;
                    setNewLeft = true;
                } else {

                    //TODO
                    if (!newField1.isBlock) {
                        //this.player.top--;
                        helpTop= -1;
                    }
                    if (!newField2.isBlock) {
                        //this.player.top++;
                        helpTop= 1;
                    }

                }
            }

            if (isLeft) {
                let newFieldRow1 = Math.floor((this.player.top - 6 + 16 ) / 16) ;
                let newFieldRow2 = Math.floor((this.player.top - 6 + 15 + 16) / 16) ;

                let newFieldCol = Math.ceil(((newLeft) - 16 ) / 16);

                newLeft--;


                let newField1 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow1 && child.col === newFieldCol)[0];
                let newField2 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow2 && child.col === newFieldCol)[0];
                if (newField1 && !newField1.isBlock && !newField1.isBorder &&
                    newField2 && !newField2.isBlock && !newField2.isBorder) {

                    setNewLeft = true;
                    //this.player.left = newLeft;
                } else {

                    //TODO
                    if (!newField1.isBlock) {
                        //this.player.top--;
                        helpTop= -1;
                    }
                    if (!newField2.isBlock) {
                        //this.player.top++;
                        helpTop= 1;
                    }

                }
            }

            if (isDown) {

                newTop++;

                let newFieldRow = Math.ceil((newTop + 10 ) / 16) ;
                let colPosition1 = (newLeft) - 15;
                let colPosition2 = (newLeft);
                let newFieldCol_1 = Math.ceil((colPosition1 ) / 16);
                let newFieldCol_2 = Math.ceil(((colPosition2) ) / 16);




                // console.log('up');
                // console.log(oldTop, newTop);
                // console.log('currentField:' , currentFieldRow, currentFieldCol);
                // console.log('newField:' , newFieldRow, newFieldCol_1, newFieldCol_2);

                let newField1 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow && child.col === newFieldCol_1)[0];
                let newField2 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow && child.col === newFieldCol_2)[0];
                if (newField1 && !newField1.isBlock && !newField1.isBorder &&
                    newField2 && !newField2.isBlock && !newField2.isBorder) {

                    //this.player.top = newTop;
                    setNewTop = true;
                } else {
                    //TODO
                    if (!newField1.isBlock) {
                        //this.player.left--;
                        helpLeft = -1;
                    }
                    if (!newField2.isBlock) {
                        //this.player.left++;
                        helpLeft = 1;
                    }

                }
            }

            if (isUp) {
                newTop--;

                let newFieldRow = Math.ceil((this.player.top - 6 ) / 16) ;
                let newFieldCol_1 = Math.ceil(((newLeft) - 15 ) / 16);
                let newFieldCol_2 = Math.ceil(((newLeft) ) / 16);



                // console.log('up');
                // console.log(oldTop, newTop);
                // console.log('currentField:' , currentFieldRow, currentFieldCol);
                // console.log('newField:' , newFieldRow, newFieldCol_1, newFieldCol_2);

                let newField1 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow && child.col === newFieldCol_1)[0];
                let newField2 =  this.$children.filter(child => child.$options._componentTag === 'tile' && child.row === newFieldRow && child.col === newFieldCol_2)[0];
                if (newField1 && !newField1.isBlock && !newField1.isBorder &&
                    newField2 && !newField2.isBlock && !newField2.isBorder) {

                    //this.player.top = newTop;
                    setNewTop = true;
                } else {

                    //TODO
                    if (!newField1.isBlock) {
                        //this.player.left--;
                        helpLeft = -1;
                    }
                    if (!newField2.isBlock) {
                        //this.player.left++;
                        helpLeft = 1;
                    }
                }
            }

            //set the help, the normal movement can overrule
            if (helpTop !== 0) {
                this.player.top = this.player.top + helpTop;
            }
            if (helpLeft !== 0) {
                this.player.left = this.player.left + helpLeft;
            }

            if (setNewTop) {
                this.player.top = newTop;

            }
            if (setNewLeft) {
                this.player.left = newLeft;

            }
        }
    },
    created: function () {
        // `this` points to the vm instance
        this.field = [];

        for (let row = 0; row < this.rows; row++) {

            this.field[row] = [];


            for (let col = 0; col < this.cols; col++) {
                this.field[row][col] = {type: 'cell', row: row, col: col};
            }
        }


        setInterval(this.updateGameArea, 20);

    },
    mounted: function () {

    }
});

var myGameArea = {

};
