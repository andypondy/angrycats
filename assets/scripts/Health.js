cc.Class({
    extends: cc.Component,

    properties: {
        maxHealth:0,
        healthbar: {
            default: null,
            type: cc.Node
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initialWidth = this.healthbar.width;
    },

    start () {
        this.reset();
    },

    takeDamage: function (damageValue) {
        this.currentHealth -= damageValue;
        if (this.currentHealth < 0) this.currentHealth = 0;
        console.log('anand -  [', damageValue, this.currentHealth, this.maxHealth, this.initialWidth );
        this.healthbar.width = (this.currentHealth/this.maxHealth) * this.initialWidth;
    },

    reset: function () {
        this.currentHealth = this.maxHealth;
        console.log('anand -  [', this.currentHealth, this.maxHealth, this.initialWidth );
        this.healthbar.width = this.initialWidth;
    },

    // update (dt) {},
});
