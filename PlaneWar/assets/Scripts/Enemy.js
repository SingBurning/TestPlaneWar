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
        HP: {
            default: 0,
            type: cc.Integer,
            tooltip: '敌机血量',
        },
        speedMax: 0,

        initSpriteFrame: {
            default: null,
            type: cc.SpriteFrame,
            tooltip: '初始化图像'
        },
    },

    

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.speed = cc.random0To1() * this.speedMax;
        let manager = cc.director.getCollisionManager;
        manager.enabled = true;
    },

    //初始化
    enemyInit: function () {
        if (this.node.group != 'enemy') {
            this.node.group = 'enemy';
        }
        //血量
        this.enemyHP = this.HP;
        //找到node的sprite组件
        let nSprite = this.node.getComponent(cc.Sprite);
        //初始化spriteFrame
        if (nSprite.spriteFrame != this.initSpriteFrame) {
            nSprite.spriteFrame = this.initSpriteFrame;
        }
    },

    //碰撞检测
    onCollisionEnter: function (other, self) {
        if (other.node.group !== 'bullet') {
            return;
        }
        console.log("打中了 "+this.HP + other.node.group);

        
        if (this.HP == 0) {
            // this.HP--;
            this.node.group = 'default';
            let anim = this.getComponent(cc.Animation);
            let animName = this.node.name + '_exploding';
            anim.play(animName);
            anim.on('finished', this.onHandleDestroy, this);
            return;
        }

        if (this.HP > 0) {
            this.HP--;
        }
    },

    start () {

    },

    update (dt) {
        this.node.y -= dt * this.speed;
        //出屏幕，回收节点
        if (this.node.y < -this.node.parent.height/2) {
            this.enemyGroup.destroyEnemy(this.node);
        }
        
    },

    onHandleDestroy: function () {
        this.enemyGroup.destroyEnemy(this.node);
    }
});
