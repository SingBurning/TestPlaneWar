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
        bullet: cc.Prefab,
        hero: cc.Node,
        rate: cc.Integer,
        bulletCount: {
            default: 10,
            type: cc.Integer
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //创建子弹对象池
        this.getBulletPool();
        //设置定时器，每隔0.2s创建一个新的子弹
        this.schedule(function () {
            this.startShoot(this.bulletPool)
        }.bind(this),this.rate);
        window.pool = this.bulletPool;
    },

    start () {

    },

    //对象池
    getBulletPool: function(){
        this.bulletPool = new cc.NodePool();
        for (let i = 0; i < this.bulletCount; ++i) {
            //创建节点，复制预制体
            let newBullet = cc.instantiate(this.bullet);
            //通过putInPool 接口放入对象池
            this.bulletPool.put(newBullet);
        }
    },

    //获取飞机位置
    getBulletPosition: function(){
        let heroP = this.hero.getPosition();
        return cc.p(heroP.x, heroP.y+50);
    },

    startShoot: function(pool){
        let newNode = null;
        if (pool.size() > 0) {
            newNode = pool.get();
            this.node.addChild(newNode);
            let pos = this.getBulletPosition();
            newNode.setPosition(pos);
            newNode.getComponent('Bullet').bulletGroup = this;
        }
    }
    // update (dt) {},
});
