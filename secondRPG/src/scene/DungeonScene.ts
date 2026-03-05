import { ColorMatrixFilter, Container, Graphics, Sprite, type Application } from "pixi.js";
import type ManageScene from "../base/ManageScene";


class DungeonScene{
    private app: Application;
    private stage: Container;
    private manager: ManageScene;

    private scene:Container;


    constructor(stage: Container, app: Application, manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.manager = manager;

        this.manager;

        this.scene = new Container();
        this.stage.addChild(this.scene);
    }

    test(){

        this.setBaseGraphic();
        
    }

    setBaseGraphic(){
        //2:3くらいの画面占有
        const battleContainer:Container = new Container();
        const hourglassContainer:Container = new Container();
        
        hourglassContainer.y += this.app.screen.height*2/5;


        //配置分配を可視化
        const box1:Graphics = new Graphics().roundRect(0,0,this.app.screen.width,this.app.screen.height*2/5,10).fill(0x222222);
        const box2:Graphics = new Graphics().roundRect(0,0,this.app.screen.width,this.app.screen.height*3/5,10).fill(0xaaaaaa);

        battleContainer.addChild(box1);
        hourglassContainer.addChild(box2);

        const ground:Sprite = Sprite.from("ground");
        const wall:Sprite = Sprite.from("wall");

        //ground.anchor.x = ground.anchor.y = 0.5;
        //wall.anchor.x = wall.anchor.y = 0.5;

        ground._anchor.x = 0.5;
        wall.anchor.x = 0.5;

        ground.width = this.app.screen.width;
        //ground.height = this.app.screen.height* 2/5  *(2 / 5);
        ground.height = this.app.screen.height* 3/10  *(2 / 5);

        ground.x =  this.app.screen.width/2;
        ground.y = this.app.screen.height* 3/5  *(2 / 5)

        wall.width = this.app.screen.width;
        //wall.height = this.app.screen.height* 3/5  *(2 / 5);
        wall.height = this.app.screen.height* 7/10  *(2 / 5);

        wall.x =  this.app.screen.width/2;

        const filter = new ColorMatrixFilter();

        wall.filters = [filter];
        filter.brightness(0.7, false);

        battleContainer.addChild(wall);
        battleContainer.addChild(ground);

        //test

        const fire:Sprite = Sprite.from("fire");

        fire.anchor.x = fire.anchor.y = 0.5;
        fire.width = this.app.screen.width/6;
        fire.height = this.app.screen.height* 1/10  *(2 / 5);

        fire.x = this.app.screen.width/3;
        fire.y = this.app.screen.height* 1/5  *(3 / 5);

        const filter2 = new ColorMatrixFilter();

        battleContainer.addChild(fire);

        fire.filters = [filter2];
        filter2.brightness(0.7, false);

        this.scene.addChild(battleContainer);
        this.scene.addChild(hourglassContainer);

    }

}

export default DungeonScene;