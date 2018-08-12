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
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // obtain the anchor point of ground level on the y axis
        this.groundY = this.game.ground.y + this.game.ground.height/2 - this.game.bombRadius;   // this.ground.top may also work
        this.backgroundY = this.game.background.y + this.game.background.height/2;   // this.ground.top may also work        
    },

    start () {

    },

    /**
     * Spawn Manager
     */

    spawnNewBomb: function() {
        // generate a new node in the scene with a preset template
        var newBomb = cc.instantiate(this.game.bombPrefab);
        var startPosition = this.getNewStartPosition();

        // set drop location
        newBomb.getComponent('bomb').targetY = this.groundY;
        newBomb.getComponent('bomb').targetX = startPosition.x;

        // set math equation
        newBomb.getComponent('bomb').equation = this.game.getNextEquation();

        // A reference to the game object is temporarily stored on the bomb component
        newBomb.getComponent('bomb').game = this.game;

        // put the newly added node under the Canvas node
        this.node.addChild(newBomb);
        // set up a random position for the bomb
        newBomb.setPosition(startPosition);
    },

    getNewStartPosition: function () {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the bomb on the y axis
        var randY = this.backgroundY;
        // according to the width of the screen, randomly obtain an anchor point of bomb on the x axis
        randX = (Math.random() - 0.5) * this.game.ground.width;
        // console.log("randX " + randX);
        // return to the anchor point of the bomb
        return cc.v2(randX, randY);
    },

    // update (dt) {},
});
