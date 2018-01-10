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
        newScore: {
            default: null,
            type: cc.Label,
        },

        historyScore: {
            default: null,
            type: cc.Label,
        },

        restartBtn: {
            default: null,
            type: cc.Button,
        },

        quitBtn: {
            default: null,
            type: cc.Button,
        },

        buttonSound: {
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.newScore.string = D.commonConstant.gameScore ? D.commonConstant.gameScore.toString() : '0';
    },

    restartGame: function () {
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene("GameScene");
    },

    quiteGame: function () {
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('StartScene');
    }

    // update (dt) {},
});
