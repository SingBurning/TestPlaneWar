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

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    handlePause:function () {
        if (pause) {
            this.pause.normalSprite = this.pauseSprite[0];
            this.pause.pressedSprite = this.pauseSprite[1];
            this.pause.hoverSprite = this.pauseSprite[1];
            return pause = !pause
        }

        this.pause.normalSprite = this.pauseSprite[2];
        this.pause.pressedSprite = this.pauseSprite[3];
        this.pause.hoverSprite = this.pauseSprite[3];
        return pause = !pause;
    }

    // update (dt) {},
});
