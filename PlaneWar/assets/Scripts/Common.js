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
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        D.common = this;
    },

    start () {

    },

    //批量处理对象池
    batchInitNodePool: function (that, objArray) {
        for (let i = 0; i < objArray.length; i++) {
            let objInfo = objArray[i];
            this.initNodePool(that, objInfo);
        }
    },

    //初始化对象池
    initNodePool: function (that, objInfo) {
        let name = objInfo.name;
        let poolName = name + 'Pool';
        console.log(poolName);
        
        that[poolName] = new cc.NodePool();
        //创建对象，放入池中
        for (let i = 0; i < objInfo.poolAmount; i++) {
            let newNode = cc.instantiate(objInfo.prefab);
            that[poolName].put(newNode);
        }
    },

    //生成节点
    genNewNode: function (pool, prefab, nodeParnet) {
        let newNode = null;
        if (pool.size() > 0) {
            newNode = pool.get();
        }else{
            newNode = cc.instantiate(prefab);
        }
        nodeParnet.addChild(newNode);
        return newNode;
    },

    //销毁节点
    putBackPool: function (that, node) {
        console.log(node);
        
        let poolName = node.name + 'Pool';
        that[poolName].put(node);
    }

    // update (dt) {},
});
