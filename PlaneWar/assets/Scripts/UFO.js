

cc.Class({
    extends: cc.Component,

    properties: {
        speedMax: 0,
        speedMin: 0,
    },

    onLoad () {
        //随机速度
        this.speed = Math.random() * (this.speedMax - this.speedMin + 1) + this.speedMin;
        let manager = cc.director.getCollisionManager();
        manager.enabled = true;
    },

    //检测碰撞
    onCollisionEnter: function (other, self) {
        this.ufoGroup.destroyUfo(this.node);
    },

    update (dt) {
        this.node.y -= dt * this.speed;
        //出屏幕后回收
        if (this.node.y < -this.node.parent.height / 2) {
            this.ufoGroup.destroyUfo(this.node);
        }
    },
});
