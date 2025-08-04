class StageShow{

    Scene;
    constructor(scene){
        this.Scene = scene;
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
        

        this.base = base;
        this.stage = stage;
        stage.addChild(base);

        stage.x = 315;
        stage.y = 250;
        //stage.y = 200;
        this.Scene.addChild(stage);
    }
}

export default StageShow;