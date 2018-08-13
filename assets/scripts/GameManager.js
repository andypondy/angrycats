cc.Class({
    extends: cc.Component,

    properties: {
        refToSpawnManager: require('SpawnManager'),
        refToTileManager: require('TileManager'),
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
        enemyHealth: {
            default: null,
            type: cc.Node
        },
        level: 1,
        catHP: 100,
        catDamage: 20,
        maxBombs: 4,
        bombRadius: 50,
        _maxEquations:4,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.currentBombs = 0;
        this.schedule(this.runGame, 2);

        this.currentEquation = 0;
        this.equations = [];

        // generate 5 equations to begin with
        for (var i=0; i < this._maxEquations; i++) {
            this.createMathEquation(this.difficulty);
        }
        // this.debugEq(this.equations);

        this.refToSpawnManager.game = this;
        this.refToTileManager.game = this;

        this.enemyHealthComponent = this.enemyHealth.getComponent('Health');
    },

    runGame: function () {
        // check if there are too many bombs on screen
        if (this.currentBombs < this.maxBombs) {
            this.refToSpawnManager.spawnNewBomb();
            this.currentBombs++;
        }
    },
    bombMissed: function (equation) {
        // do some damage to Player

        // mark equation as missed
        this.equations[equation.id].status = "missed";
        this.refToTileManager.setupAnswers();
        
        this.bombDestroyed();
    },

    bombDefused: function (equation) {
        // do some damage to Boss
        this.enemyHealthComponent.takeDamage(this.catDamage);

        // mark equation as solved
        this.equations[equation.id].status = "solved";
        this.refToTileManager.setupAnswers();

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
        var eq = "" + x + " + " + y;
        var equation = {x:x, y:y, answer:answer, eq: eq, id:this.equations.length, status:"incomplete"};
        this.equations.push(equation);
        return equation;
    },

    getNextEquation: function () {
        this.createMathEquation();
        return this.equations[this.currentEquation++];
    },

    getNextEquations: function (howmany) {
        var returnEquations = [];
        for(var i=0; i < this.equations.length; i++) {
            if (this.equations[i].status == "incomplete") {
                returnEquations.push(this.equations[i]);
            }
            if (returnEquations.length == howmany) {
                break;
            }
        }
        if (returnEquations.length < howmany) {
            for(var i=returnEquations.length; i < howmany; i++) {
                returnEquations.push(this.createMathEquation(this.difficulty));
            }
        }
        // this.debugEq(returnEquations);
        return returnEquations;
    },

    start () {
    },

    // update (dt) {},

    debugEq: function(equations) {
        for(var i=0; i < equations.length; i++) {
            console.log('anand - eq:  ' + equations[i].x + "+" + equations[i].y + "=" + equations[i].answer + ", status=" + equations[i].status);
        }
    },

    onEnable: function () {
        cc.director.getCollisionManager().enabled = true;
        // cc.director.getCollisionManager().enabledDebugDraw = true;
    },

    onDisable: function () {
        cc.director.getCollisionManager().enabled = false;
        // cc.director.getCollisionManager().enabledDebugDraw = false;
    },

});
