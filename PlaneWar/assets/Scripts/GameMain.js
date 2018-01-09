// Learn cc.Class:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/class/index.html
// Learn Attribute:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/reference/attributes/index.html
// Learn life-cycle callbacks:
//  - [Chinese] http://www.cocos.com/docs/creator/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/editors_and_tools/creator-chapters/scripting/life-cycle-callbacks/index.html

let pause = false;

cc.Class({
    extends: cc.Component,

    properties: {
        pause: cc.Button,
        scoreNum: cc.Label,
        bombNum: cc.Label,
        bomb: cc.Node,
        back_1: cc.Node,
        back_2: cc.Node,

        pauseSprite: {
            default: [],
            type: cc.SpriteFrame,
            tooltip: '暂停按钮图片组',
        },

        hero: {
            default: null,
            type: require('Hero'),
        },

        bulletGroup: require('./BulletGroup'),
        enemyGroup: require('./EnemyGroup'),
        ufoGroup: require('./UFOGroup'),
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.initState();
        this.enemyGroup.startAction();
        this.bulletGroup.startAction();
        this.ufoGroup.startAction();
    },

    start () {

    },

    initState: function () {
        D.commonConstant.pauseState = false;
        D.commonConstant.bombAmount = 0;
        D.commonConstant.gameScore = 0;
    },

    handlePause:function () {
        if (D.commonConstant.pauseState) {
            this.pause.normalSprite = this.pauseSprite[0];
            this.pause.pressedSprite = this.pauseSprite[1];
            this.pause.hoverSprite = this.pauseSprite[1];
            //恢复暂停
            cc.director.resume();
            this.hero.onDrag();
            return D.commonConstant.pauseState = !D.commonConstant.pauseState
        }

        this.pause.normalSprite = this.pauseSprite[2];
        this.pause.pressedSprite = this.pauseSprite[3];
        this.pause.hoverSprite = this.pauseSprite[3];
        //暂停
        cc.director.pause();
        this.hero.offDrag();
        return D.commonConstant.pauseState = !D.commonConstant.pauseState;
    },

    bombClick: function () {
        if (D.commonConstant.bombAmount > 0) {
            D.commonConstant.bombAmount--;
            this.bombNum.string = String(D.commonConstant.bombAmount);
            this.romoveEnemy();
        }else{
            console.log("没有炸弹...");
        }
    },

    romoveEnemy: function () {
        let enemyArr = new Array(...this.enemyGroup.node.children);
        for (let i = 0; i < enemyArr.length; i++) {
            enemyArr[i].getComponent('Enemy').explodingAnim();
        }
    },

    getUfoBomb: function () {
        
        if (D.commonConstant.bombAmount < 3) {
            D.commonConstant.bombAmount++;

            this.bombNum.string = String(D.commonConstant.bombAmount);
        }
    },

    //分数
    changeScore: function (score) {
        D.commonConstant.gameScore += score;
        this.scoreNum.string = D.commonConstant.gameScore.toString();
    }

    // update (dt) {},
});
