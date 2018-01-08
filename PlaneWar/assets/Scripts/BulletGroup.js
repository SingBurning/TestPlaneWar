// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

//子弹生成位置
const bulletPosition = cc.Class({
    name: 'bulletPosition',
    properties: {
        positionX:{
            default: '',
            tooltip: '子弹相对Hero的位置'
        }
    }
});

//无限时长子弹
const infiniteBullet = cc.Class({
    name: 'infiniteBullet',
    properties: {
        name: '',
        rate: 0,
        poolAmount: 0,
        prefab: cc.Prefab,
        position: {
            default: [],
            type: bulletPosition,
            tooltip: '子弹位置'
        }
    }
});

//有限时长子弹
const finiteBullet = cc.Class({
    extends: infiniteBullet,
    name: 'finiteBullet',
    properties: {
        //持续时长
        duration: 0,
        ufoBulletName: ''
    }
})


cc.Class({
    extends: cc.Component,

    // properties: {
    //     bullet: cc.Prefab,
    //     hero: cc.Node,
    //     rate: cc.Integer,
    //     bulletCount: {
    //         default: 10,
    //         type: cc.Integer
    //     }
    // },

    properties:() => ({
        infiniteBullet: {
            default: null,
            type: infiniteBullet,
            tooltip: '无限子弹',
        },

        finiteBullet: {
            default: [],
            type: finiteBullet,
            tooltip: '有限子弹',
        },
        hero: cc.Node,
    }),




    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // //创建子弹对象池
        // this.getBulletPool();
        // //设置定时器，每隔0.2s创建一个新的子弹
        // this.schedule(function () {
        //     this.startShoot(this.bulletPool)
        // }.bind(this),this.rate);
        // window.pool = this.bulletPool;

        //初始化对象池
        D.common.initNodePool(this, this.infiniteBullet);
        D.common.batchInitNodePool(this, this.finiteBullet);
        this.startAction();
    },

    //发射子弹，定时器
    startAction: function(){
        this.startShoot = function () {
            this.genNewBullet(this.infiniteBullet);
        }.bind(this);
        //定时器 创建发射子弹的对象
        this.schedule(this.startShoot, this.infiniteBullet.rate);
    },

    //生成子弹
    genNewBullet: function (bulletInfo) {
        let poolName = bulletInfo.name + "Pool";
        for(let i = 0; i < bulletInfo.position.length; i++){
            let newNode = D.common.genNewNode(this[poolName], bulletInfo.prefab, this.node);
            let pos = this.getBulletPosition(bulletInfo.position[i].positionX);
            newNode.setPosition(pos)
        }
    },

    start () {

    },

    

    //获取飞机位置
    getBulletPosition: function(positionStr){
        let heroP = this.hero.getPosition();
        let newV2_x = heroP.x + eval(positionStr);
        let newV2_y =  heroP.y;
        return cc.p(newV2_x, newV2_y);
    },

    //销毁子弹
    destroyBullet: function (node) {
        //bullet中是由bulletGroup调用，所以当前this为bulletGroup
        D.common.putBackPool(this, node);
    },

    //更换子弹
    changeBullet: function (ufoBulletName) {
        this.unschedule(this.startShoot);
        for (let i = 0; i < this.finiteBullet.length; i++) {
            let startDoubleShoot = function (i) {
                this.genNewBullet(this.finiteBullet[i])
            }.bind(this, i);
            //设置延时，当一个定时器走完，另一个延时结束，开始执行
            this.schedule(startDoubleShoot, this.finiteBullet[i].rate, this.finiteBullet[i].duration);
            let delay = this.finiteBullet[i].rate * this.finiteBullet[i].duration;
            this.schedule(this.startShoot, this.infiniteBullet.rate, cc.macro.REPEAT_FOREVER, delay);
        }
    },


    // //对象池
    // getBulletPool: function(){
    //     this.bulletPool = new cc.NodePool();
    //     for (let i = 0; i < this.bulletCount; ++i) {
    //         //创建节点，复制预制体
    //         let newBullet = cc.instantiate(this.bullet);
    //         //通过putInPool 接口放入对象池
    //         this.bulletPool.put(newBullet);
    //     }
    // },

    // startShoot: function(pool){
    //     let newNode = null;
    //     if (pool.size() > 0) {
    //         newNode = pool.get();
    //         this.node.addChild(newNode);
    //         let pos = this.getBulletPosition();
    //         newNode.setPosition(pos);
    //         newNode.getComponent('Bullet').bulletGroup = this;
    //     }
    // }
    // update (dt) {},
});
