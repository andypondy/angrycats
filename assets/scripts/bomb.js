var Helpers = require('Helpers');

cc.Class({
    extends: cc.Component,

    properties: {
        // When the distance between the star and main character is less than this value, collection of the point will be completed
        pickRadius: 0,
        dropSpeed: 0,
        targetX: 0,
        targetY: 0,
        equationDisplay: {
            default: null,
            type: cc.Label
        },
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
    },
    
    setEq: function (equation) {
        this.equation = equation;
        this.equationDisplay.string = this.equation.eq;

        var randomIdx = Helpers.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
    },

    drop: function () {
        var dropAction = cc.moveTo(this.dropSpeed, cc.v2(this.targetX, this.targetY));//.easing(cc.easeCubicActionInOut());
        this.node.runAction(dropAction);
    },

    update (dt) {
        // check if reached targetY
        if (this.node.position.y < (this.targetY+1)) {
            // console.log("bomb equation " + this.equation);
            // do damage
            this.spawnmanager.game.bombMissed(this.equation);
            // show animation

            // return to pool
            this.spawnmanager.returnBomb(this.node);
        }
    },

    onCollisionEnter: function (other, self) {
        if (other.node.group === 'tile') {
            var tile = other.node.getComponent('tile');
            // check answer 
            console.log('anand - someone banged me ' + tile.id);
            if (tile.equation.answer == this.equation.answer) {
                tile.reset();
                console.log('anand - that was the correct answer ');
                // inform game manager
                this.spawnmanager.game.bombDefused(this.equation);

                // show animation

                // return to pool
                this.spawnmanager.returnBomb(this.node);
            }
        }
    },

});
