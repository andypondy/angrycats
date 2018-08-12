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
        tilePrefab: {
            default: null,
            type: cc.Prefab
        },
        layout: {
            default: null,
            type: cc.Node
        },
        canvas: cc.Node,
        maxTiles: 5,
        tileWidth: 43,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        var tilePositions = [];
        tilePositions.push(-this.tileWidth-((this.layout.width)/3));
        tilePositions.push(-this.tileWidth-(this.layout.width/3)/2);
        tilePositions.push(0);
        tilePositions.push(this.layout.width/3+this.tileWidth);
        tilePositions.push((this.layout.width/2)/3+this.tileWidth);

        var offset = 0;
        for(var i=0; i < this.maxTiles; i++) {
            var newTile = cc.instantiate(this.tilePrefab);
            console.log(i + '-tilePositions[i] ' + (tilePositions[i]) );
            var startPosition = cc.v2(tilePositions[i], this.layout.y);

            newTile.getComponent('tile').id = i;
            newTile.getComponent('tile').canvas = this.canvas;
            newTile.getComponent('tile').game = this.game;

            newTile.setPosition(startPosition);
            this.node.addChild(newTile);
        }

    },

    // update (dt) {},
});
