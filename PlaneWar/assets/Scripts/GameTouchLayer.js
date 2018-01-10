
cc.Class({
    extends: cc.Component,

    properties: {

        hero: {
            default: null,
            type: cc.Node
        }
    },

    onLoad () {
        this.onDrag();
    },

    onDrag: function () {
        this.node.on("touchmove", this.dragMove, this);
        this.node.on("touchstart",this.touchStart, this);
    },

    offDrag: function () {
        this.node.off('touchmove', this.dragMove, this);
    },

    touchStart: function (event) {
        var startPosv = event.getLocation();
        var startPos = this.hero.parent.convertToNodeSpaceAR(startPosv);

        this.startX = startPos.x;
        this.startY = startPos.y;
        
    },

    dragMove: function (event) {
        var locationv = event.getLocation();
        var location = this.hero.parent.convertToNodeSpaceAR(locationv);
        //飞机不移出屏幕 
        var minX = -this.hero.parent.width/2+this.hero.width/2;
        var maxX = -minX;
        var minY = -this.hero.parent.height/2+this.hero.height/2;
        var maxY = -minY;

        if (location.x< minX){
            location.x = minX;
        }
        if (location.x>maxX){
            location.x = maxX;
        }
        if (location.y< minY){
            location.y = minY;
        }
        if (location.y> maxY){
            location.y = maxY;
        }

        var posX = location.x - this.startX;
        var posY = location.y - this.startY; 
            
        // this.hero.setPosition(location);
        let heroX = this.hero.x + posX;
        let heroY = this.hero.y + posY;

        console.log(heroY + "   "+maxY);
        if (heroX < minX) {
            heroX = minX;
        }else if (heroX > maxX) {
            heroX = maxX;
        }

        if (heroY < minY) {
            heroY = minY;
        }else if (heroY > maxY) {
            heroY = maxY;
        }
        this.hero.x = heroX;
        this.hero.y = heroY; 

        this.startX = location.x;
        this.startY = location.y;
    },

    // start () {

    // },

    // update (dt) {},
});
