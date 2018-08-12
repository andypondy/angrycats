cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // obtain the anchor point of ground level on the y axis
        this.groundY = this.game.ground.y + this.game.ground.height/2 - this.game.bombRadius;   // this.ground.top may also work
        this.backgroundY = this.game.background.y + this.game.background.height/2;   // this.ground.top may also work

        this._pool = new cc.NodePool('BombPoolHandler');
        this._count = 0;
    },

    start () {

    },

    /**
     * Spawn Manager
     */

    getNextBomb: function() {
        if (this.lastBombUsed == this.bombFactory.length) { this.lastBombUsed = 0; }
        return this.bombFactory[this.lastBombUsed++];
    },

    spawnNewBomb: function() {
        // generate a new node in the scene with a preset template
        var newBomb = this._pool.get();
        if (!newBomb) {
            console.log('anand - instantiate new bomb #' + this._count);
            newBomb = cc.instantiate(this.game.bombPrefab);

            // A reference to the game object is temporarily stored on the bomb component
            newBomb.getComponent('bomb').spawnmanager = this;
            newBomb.addComponent('BombPoolHandler');

            this._count++;
        }
        else {
            console.log('anand - get a bomb from the pool ');
        }
        
        var startPosition = this.getNewStartPosition();

        // set drop location
        newBomb.getComponent('bomb').targetY = this.groundY;
        newBomb.getComponent('bomb').targetX = startPosition.x;

        // set math equation
        newBomb.getComponent('bomb').equation = this.game.getNextEquation();

        // put the newly added node under the Canvas node
        this.node.addChild(newBomb);
        // set up a random position for the bomb
        newBomb.setPosition(startPosition);

        newBomb.getComponent('bomb').drop();
    },

    getNewStartPosition: function () {
        var randX = 0;
        // According to the position of the ground level and the main character's jump height, randomly obtain an anchor point of the bomb on the y axis
        var randY = this.backgroundY;
        // according to the width of the screen, randomly obtain an anchor point of bomb on the x axis
        randX = (Math.random() - 0.5) * (this.game.ground.width - this.game.bombRadius);
        // console.log("randX " + randX);
        // return to the anchor point of the bomb
        return cc.v2(randX, randY);
    },

    returnBomb: function (bomb) {
        console.log('anand - return bomb ');
        this._pool.put(bomb);
    }
    // update (dt) {},
});
