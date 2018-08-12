cc.Class({
    extends: cc.Component,

    properties: {
        bar: {
            get () {
                return this._bar;
            },
            set (value) {
                this._bar = value;
            }
        },
    },
});
