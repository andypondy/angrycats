cc.Class({
    extends: cc.Component,

    properties: {
        canvas: cc.Node,
        followSpeed: 2500,
        answerDisplay: {
            default: null,
            type: cc.Label
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.answerDisplay.string = this.id;
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

    reset: function () {
        this.isDragged = false;
        this.node.setPosition(this.startPosition);
    },

    setEq: function (equation) {
        this.equation = equation;
        this.answerDisplay.string = this.equation.answer;
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
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // console.log("oldPos " + oldPos + ", newPos" + newPos + ", this.moveToPos " + this.moveToPos);
        if (newPos == oldPos) {
            console.log('positions are equal ');
        }
        // set new position
        this.node.setPosition(newPos);
    },
});
