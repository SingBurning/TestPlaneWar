
cc.Class({
    extends: cc.Component,

    properties:()=>( {
        gamemain:{
            default: null,
            type:require('GameMain')
        },

        bulletGroup: {
            default: null,
            type: require('BulletGroup'),
        },

        touchLayer: {
            default: null,
            type: require('GameTouchLayer')
        },

        gameoverSound: cc.AudioClip,
    }),

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //监听拖动事件
        // this.onDrag();
        //获取碰撞检测系统
        let manager = cc.director.getCollisionManager();
        //开启碰撞检测系统
        manager.enabled = true;
    },

    // start () {

    // },
    //拖动监听
    onDrag: function () {
        this.node.on('touchmove', this.onHandleHeroMove, this);
    },

    //移出监听
    offDrag: function () {
        this.node.off("touchmove", this.onHandleHeroMove, this);
    },
    //hero拖动
    onHandleHeroMove: function (event) {
        //世界坐标
        let position = event.getLocation();
        //转换本地坐标
        let location = this.node.parent.convertToNodeSpaceAR(position);

        let minX = -this.node.parent.width / 2 + this.node.width / 2;
        let maxX = -minx;
        let minY = -this.node.parent.height / 2 + this.node.height / 2;
        let maxY = -minY;
        if (location.x < minX) {
            location.x = minX;
        }else if(location.x > maxX){
            location.x = maxX;
        }
        else if(location.y > maxY){
            location.y = maxY;
        }
        else if(location.Y < maxY){
            location.y = maxY;
        }
        this.node.setPosition(location);
    },

    //碰撞组件
    onCollisionEnter: function (other, self) {
        // console.log(other.node);
        if (other.node.name == 'DoubleBullet') {
            this.bulletGroup.changeBullet(other.node.name);
        }

        if (other.node.name == 'BombBullet') {
            this.gamemain.getUfoBomb();
        }

        if (other.node.group == 'enemy') {
            // console.log(other.node);
            let anim = this.getComponent(cc.Animation);
            let animName = this.node.group + '_exploding';
            anim.play(animName);
            cc.audioEngine.play(this.gameoverSound);
            anim.on('finished', this.onHandleDestroy, this);
            // this.node.destroy();
        }
    },

    onHandleDestroy: function () {
        // this.node.destroy();
        this.touchLayer.offDrag();
        this.offDrag();
        cc.director.pause();
        this.node.destroy();
        cc.director.loadScene('EndScene');
    }

    // update (dt) {},
});
