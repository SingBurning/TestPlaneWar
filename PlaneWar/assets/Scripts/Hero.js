// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

cc.Class({
    extends: cc.Component,

    properties: {
        bulletGroup: {
            default: null,
            type: require('BulletGroup'),
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //监听拖动事件
        this.node.on('touchmove', this.onHandleHeroMove, this);
        //获取碰撞检测系统
        let manager = cc.director.getCollisionManager();
        //开启碰撞检测系统
        manager.enabled = true;
    },

    // start () {

    // },
    //hero拖动
    onHandleHeroMove: function (event) {
        //世界坐标
        let position = event.getLocation();
        //转换本地坐标
        let location = this.node.parent.convertToNodeSpaceAR(position);
        this.node.setPosition(location);
    },

    //碰撞组件
    onCollisionEnter: function (other, self) {
        console.log(other.world);
        if (other.node.name == 'DoubleBullet') {
            this.bulletGroup.changeBullet(other.node.name);
        }
    }

    // update (dt) {},
});
