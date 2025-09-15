class StageShow{

    Scene;
    constructor(scene){
        this.Scene = scene;
        this.bg = null;
    }

    show(){
        var stage = new PIXI.Container();

        var base = new PIXI.Graphics();
        base.moveTo(30,0);
        base.beginFill(0xffee88);
        base.lineStyle(1, 0xaaaaaa);
        base.lineTo(600, 0);
        base.lineTo(630, 80);
        base.lineTo(0, 80);
        base.lineTo(30, 0);
        base.endFill();
        base.lineStyle();

        base.x -= 300 + 15;
        base.y = -80;
        

        this.bg = new PIXI.Sprite("");
        this.bg.anchor.x = 0.5;
        this.bg.anchor.y = 1;

        //this.bg.x -= 600 + 15;
        this.bg.y = -80;

        //this.bg.scale.y = 0.3;
        this.bg.scale.y = 10/2;
        this.bg.scale.x = 0.55;

        this.base = base;
        this.stage = stage;
        stage.addChild(this.bg);
        stage.addChild(base);

        //stage.addChild(this.bg);

        stage.x = 315;
        stage.y = 250;
        //stage.y = 200;
        this.Scene.addChild(stage);
    }
}

export default StageShow;