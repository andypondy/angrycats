cc.Class({
    extends: cc.Component,

    properties: {
        refToSpawnManager: require('SpawnManager'),
        bombPrefab: {
            default: null,
            type: cc.Prefab
        },
        ground: {
            default: null,
            type: cc.Node
        },
        background: {
            default: null,
            type: cc.Node
        },
        level: 1,
        catHealth: 100,
        maxBombs: 4,
        bombRadius: 50,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.refToSpawnManager.game = this;
        this.currentBombs = 0;
        this.schedule(this.runGame, 2);

        this.currentEquation = 0;
        this.equations = [];

        // generate 5 equations to begin with
        for (var i=0; i < 5; i++) {
            this.createMathEquation(this.difficulty);
        }
    },

    runGame: function () {
        // check if there are too many bombs on screen
        if (this.currentBombs < this.maxBombs) {
            this.refToSpawnManager.spawnNewBomb();
            this.currentBombs++;
        }
    },
    bombMissed: function () {
        // do some damage to Boss

        this.bombDestroyed();
    },

    bombDestroyed: function () {
        this.currentBombs--;
    },

    /**
     * Math Manager
     */
    createMathEquation: function (difficulty) {
        var x = Math.ceil(Math.random() * 10);
        var y = Math.ceil(Math.random() * 10);

        var answer = x + y;

        //generate unique id
        var id = "" + x + " + " + y;
        this.equations.push({x:x, y:y, answer:answer, id:id, status:"incomplete"});
        return this.equations[this.equations.length -1];
    },

    getNextEquation: function () {
        this.createMathEquation();
        return this.equations[this.currentEquation++];
    },

    getNextEquations: function (howmany) {
        returnEquations = [];
        for(var i=0; i < howmany; i++) {
            if (this.equations[this.currentEquation + i].status == "incomplete") {
                returnEquations.push(this.equations[this.currentEquation + i]);
            }
        }
        if (returnEquations.length < howmany) {
            for(var i=returnEquations.length; i < howmany; i++) {
                returnEquations.push(this.createMathEquation(this.difficulty));
            }
        }
    },

    start () {
    },

    // update (dt) {},
});
