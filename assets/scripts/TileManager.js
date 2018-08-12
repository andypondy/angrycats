var Helpers = require('Helpers');

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
        _maxTiles: 4,
        tileWidth: 86,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.tilePositions = [];
        var zero = this.layout.x - this.layout.width/2 + 10;
        var padding = ((this.layout.width/this._maxTiles) - this.tileWidth)/2;
        var onefourth = (this.layout.width/this._maxTiles);

        this.tiles = [];
        for(var i=0; i < this._maxTiles; i++) {
            var newTile = cc.instantiate(this.tilePrefab);
            var startPosition = cc.v2(zero + padding + onefourth*i, this.layout.y);

            newTile.getComponent('tile').id = i;
            newTile.getComponent('tile').canvas = this.canvas;
            newTile.getComponent('tile').game = this.game;

            newTile.setPosition(startPosition);
            this.node.addChild(newTile);
            this.tiles.push(newTile);
        }
        this.setupAnswers();
    },

    setupAnswers: function () {
        this.equations = this.shuffle(this.game.getNextEquations(this._maxTiles));
        for(var i=0; i < this._maxTiles; i++) {
            var newTile = this.tiles[i];
            newTile.getComponent('tile').setEq(this.equations[i]);
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
            var x = Helpers.getRandomInt(0, total);
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
