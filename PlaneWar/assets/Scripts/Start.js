
cc.Class({
    extends: cc.Component,

    properties: {
        startButton:{
            default: null,
            type: cc.Button,
        },
        buttonSound:{
            default: null,
            url: cc.AudioClip
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.preloadScene('GameScene');
    },

    start () {

    },

    startGame: function(){
        cc.audioEngine.play(this.buttonSound);
        cc.director.loadScene('GameScene');
    }

    // update (dt) {},
});
