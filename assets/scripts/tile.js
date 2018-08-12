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
        canvas: cc.Node,
        followSpeed: 200,
        answerDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        this.answerDisplay.string = this.id
        this.startPosition = this.node.getPosition();

        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isDragged = false;
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            // check if this tile was touched
            if (self.node.getBoundingBoxToWorld().contains(touchLoc)) {
                self.moveToPos = self.canvas.convertToNodeSpaceAR(touchLoc);
                self.isDragged = true;
            }
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            if (self.isDragged) {
                var touches = event.getTouches();
                var touchLoc = touches[0].getLocation();
                if (!self.node.getBoundingBoxToWorld().contains(touchLoc)) {
                    self.moveToPos = self.canvas.convertToNodeSpaceAR(touchLoc);
                }
            }
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            if (self.isDragged) {
                self.isDragged = false; // when touch ended, stop moving
                var returnToStart = cc.moveTo(0.3, self.startPosition);
                self.node.runAction(returnToStart);
            }
        }, self.node);
    },

    start () {

    },

    update (dt) {
        if (!this.isDragged) {
            return;
        }
        if (this.node.getBoundingBox().contains(this.moveToPos)) {
            return;
        }
        var oldPos = this.node.getPosition();
        // get move direction
        var direction = this.moveToPos.sub(oldPos).normalize();
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(2500 * dt));
        // console.log("oldPos " + oldPos + ", newPos" + newPos + ", this.moveToPos " + this.moveToPos);
        if (newPos == oldPos) {
            console.log('positions are equal ');
        }
        // set new position
        this.node.setPosition(newPos);
    },
});
