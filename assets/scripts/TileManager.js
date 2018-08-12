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

    onLoad () {
        this.tilePositions = []
        this.tilePositions.push(-this.tileWidth-((this.layout.width)/3) -8);
        this.tilePositions.push(-this.tileWidth-(this.layout.width/3)/2 + 8);
        this.tilePositions.push(0);
        this.tilePositions.push((this.layout.width/2)/3+this.tileWidth - 8);
        this.tilePositions.push(this.layout.width/3+this.tileWidth + 8);

        this.equations = this.shuffle(this.game.getNextEquations(5));
        var offset = 0;
        this.tiles = [];
        for(var i=0; i < this.maxTiles; i++) {
            var newTile = cc.instantiate(this.tilePrefab);
            var startPosition = cc.v2(this.tilePositions[i], this.layout.y);

            newTile.getComponent('tile').id = i;
            newTile.getComponent('tile').equation = this.equations[i];
            newTile.getComponent('tile').canvas = this.canvas;
            newTile.getComponent('tile').game = this.game;

            newTile.setPosition(startPosition);
            this.node.addChild(newTile);
            this.tiles.push(newTile);
        }
        
    },

    start () {
        
    },

    shuffle: function (equations) {
        var total = equations.length;

        var order = [];
        for (var i=0; i < total; i++) {
            order[i] = -1;
        }
        for (var toset=0; toset < total; toset++) {
            var x = Math.floor(Math.random() * 5);
            for (var tocheck=0; tocheck < total; tocheck++) {
                var isfree = true;
                if (order[tocheck] == x) {
                    isfree = false;
                    break;
                }
            }
            if (isfree) {
                order[toset] = x;
            }
            else {
                toset--;
            }
        }
        var returnEquations = [];
        for (var toset=0; toset < total; toset++) {
            returnEquations[toset] = equations[order[toset]];
        }
        return returnEquations;
    },

    // update (dt) {},
});
