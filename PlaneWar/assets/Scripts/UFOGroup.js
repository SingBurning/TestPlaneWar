
const ufoG = cc.Class({
    name: 'ufoG',
    properties:{
        name: '',
        prefab: cc.Prefab,
        freq: 0,
        poolAmount: 0,
        delayMax: {
            default: 0,
            tooltip: '最大延时',
        },
        delayMin: {
            default: 0,
            tooltip: '最小延时'
        },
    }
})

cc.Class({
    extends: cc.Component,

    properties: {
        ufoG: {
            default: [],
            type: ufoG,
        }
    },

    onLoad () {
        D.common.batchInitNodePool(this, this.ufoG);
        // this.startAction();
    },

    startAction: function () {
        for (let i = 0; i < this.ufoG.length; i++) {
            let ufoName = this.ufoG[i].name;
            let freq = this.ufoG[i].freq;
            this[ufoName] = function (k) {
                let delay = Math.random() *(this.ufoG[k].delayMax - this.ufoG[k].delayMin) + this.ufoG[k].delayMin;
                this.scheduleOnce(function () {
                    this.genNewUfo(this.ufoG[k]);
                }.bind(this), delay);
            }.bind(this, i);

            //外层定时器，循环掉落
            this.schedule(this[ufoName], freq);
            
        }
    },

    //生成ufo
    genNewUfo: function (ufoInfo) {
        let poolName = ufoInfo.name + 'Pool';
        let newNode = D.common.genNewNode(this[poolName], ufoInfo.prefab, this.node);
        let pos = this.getNewEnemyPosition(newNode);
        newNode.setPosition(pos);
        newNode.getComponent('UFO').ufoGroup = this;
    },

    //随机生成位置
    getNewEnemyPosition: function (newEnemy) {
        var randX = cc.randomMinus1To1() * (this.node.parent.width / 2 - newEnemy.width / 2);
        var randY = this.node.parent.height / 2 + newEnemy.height / 2;
        return cc.v2(randX, randY);
    },
    
    //销毁
    destroyUfo: function (node) {
        D.common.putBackPool(this, node);
    },
    // update (dt) {},
});
