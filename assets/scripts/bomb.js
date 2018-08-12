// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        // When the distance between the star and main character is less than this value, collection of the point will be completed
        pickRadius: 0,
        dropSpeed: 2,
        targetX: 0,
        targetY: 0,
        equationDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        // initialize drop action
        this.equationDisplay.string = this.equation.id;
    },

    start () {

    },

    drop: function () {
        console.log('anand - drop it like its hot ');
        var dropAction = cc.moveTo(this.dropSpeed, cc.v2(this.targetX, this.targetY)).easing(cc.easeCubicActionInOut());
        this.node.runAction(dropAction);
    },

    update (dt) {
        // check if reached targetY
        if (this.node.position.y < (this.targetY+1)) {
            // console.log("bomb equation " + this.equation);
            // do damage
            this.spawnmanager.game.bombMissed();
            // show animation

            // return to pool
            this.spawnmanager.returnBomb(this.node);
        }
    },
});
