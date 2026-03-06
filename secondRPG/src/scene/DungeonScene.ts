import { ColorMatrixFilter, Container, Graphics, Sprite, TextStyle, Application, Text } from "pixi.js";
import type ManageScene from "../base/ManageScene";



class DungeonScene {
    private app: Application;
    private stage: Container;
    private manager: ManageScene;

    private scene: Container;

    private walls: Container;
    private grounds: Container;
    private fires: Container;

    private chart: String[];
    private player: Sprite;


    constructor(stage: Container, app: Application, manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.manager = manager;

        this.manager;

        this.scene = new Container();
        this.stage.addChild(this.scene);

        this.walls = new Container();
        this.grounds = new Container();
        this.fires = new Container();


        this.chart = [];

        this.player = Sprite.from("player");
        this.player.anchor.x = this.player.anchor.y = 0.5;

        this.player.scale.x = this.player.scale.y = 0.5;
    }

    test() {

        this.setBaseGraphic();
        this.setChart();
        this.flow();

    }

    setBaseGraphic() {
        //2:3くらいの画面占有
        const battleContainer: Container = new Container();
        const hourglassContainer: Container = new Container();

        hourglassContainer.y += this.app.screen.height * 2 / 5;


        //配置分配を可視化
        const box1: Graphics = new Graphics().roundRect(0, 0, this.app.screen.width, this.app.screen.height * 2 / 5, 10).fill(0x222222);
        const box2: Graphics = new Graphics().roundRect(0, 0, this.app.screen.width, this.app.screen.height * 3 / 5, 10).fill(0xaaaaaa);

        battleContainer.addChild(box1);
        hourglassContainer.addChild(box2);

        const ground: Sprite = Sprite.from("ground");
        const ground2: Sprite = Sprite.from("ground");

        const wall: Sprite = Sprite.from("wall");
        const wall2: Sprite = Sprite.from("wall");

        ground.anchor.x = 0.5;
        wall.anchor.x = 0.5;

        ground2.anchor.x = 0.5;
        wall2.anchor.x = 0.5;

        ground.width = this.app.screen.width;

        ground.height = this.app.screen.height * 3 / 10 * (2 / 5);

        ground.x = this.app.screen.width / 2;
        ground.y = this.app.screen.height * 3 / 5 * (2 / 5)


        ground2.width = this.app.screen.width;
        ground2.height = this.app.screen.height * 3 / 10 * (2 / 5);

        ground2.x = this.app.screen.width / 2 + this.app.screen.width;
        ground2.y = this.app.screen.height * 3 / 5 * (2 / 5)

        wall.width = this.app.screen.width;

        wall.height = this.app.screen.height * 7 / 10 * (2 / 5);

        wall.x = this.app.screen.width / 2;


        wall2.width = this.app.screen.width;

        wall2.height = this.app.screen.height * 7 / 10 * (2 / 5);

        wall2.x = this.app.screen.width / 2 + this.app.screen.width;

        const filter = new ColorMatrixFilter();

        wall.filters = [filter];
        wall2.filters = [filter];
        filter.brightness(0.7, false);

        this.walls.addChild(wall);
        this.walls.addChild(wall2);

        this.grounds.addChild(ground);
        this.grounds.addChild(ground2);

        battleContainer.addChild(this.walls);
        battleContainer.addChild(this.grounds);

        //test

        const fire: Sprite = Sprite.from("fire");

        fire.anchor.x = fire.anchor.y = 0.5;
        fire.width = this.app.screen.width / 20;
        fire.height = this.app.screen.height * 1 / 8 * (2 / 5);

        fire.x = this.app.screen.width / 3;
        fire.y = this.app.screen.height * 1 / 5 * (3 / 5);

        const fire2: Sprite = Sprite.from("fire");

        fire2.anchor.x = fire2.anchor.y = 0.5;
        fire2.width = this.app.screen.width / 20;
        fire2.height = this.app.screen.height * 1 / 8 * (2 / 5);

        fire2.x = this.app.screen.width / 3 + this.app.screen.width;
        fire2.y = this.app.screen.height * 1 / 5 * (3 / 5);

        const filter2 = new ColorMatrixFilter();

        this.fires.addChild(fire);
        this.fires.addChild(fire2);

        battleContainer.addChild(this.fires);

        fire.filters = [filter2];
        fire2.filters = [filter2];
        filter2.brightness(0.7, false);

        this.scene.addChild(battleContainer);
        this.scene.addChild(hourglassContainer);

    }

    setChart() {
        var test = ["enter", "battle", "battle", "end"];
        test = test.reverse();
        this.chart = test;
    }

    flow() {
        var act = this.chart.pop();
        switch (act) {
            case "enter":
                this.enter();
                break;
            case "battle":
                this.move();
                break;
            case "end":
                this.clear();
                break;
        }

    }

    enter() {
        console.log("aaa")
        this.player.y = this.app.screen.height * 3 / 5 * (2 / 5);
        this.player.x = -100;

        this.scene.getChildAt(0).addChild(this.player);

        const posX: number = this.app.screen.width / 4;
        var flame: number = 0;

        const fn = () => {
            this.player.x += (posX - this.player.x) / 8;

            flame += 1;

            if (flame >= 40) {
                this.player.x = posX;
                this.app.ticker.remove(fn);
                flame = 0;
                this.flow();
            }
        }

        this.app.ticker.add(fn);
    }

    move() {
        console.log("bbb")
        var flame: number = 0;
        const fn = () => {

            this.grounds.x -= this.app.screen.width / 30;
            this.walls.x -= this.app.screen.width / 30;
            this.fires.x -= this.app.screen.width / 30;

            flame += 1;

            if (flame >= 30) {

                this.grounds.x = 0;
                this.walls.x = 0;
                this.fires.x = 0;

                this.app.ticker.remove(fn);
                this.flow();
            }



        }
        this.app.ticker.add(fn);

    }

    battle() {

    }

    rest() {

    }

    clear() {
        var text = new Text('Congrats', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.width / 6 }));
        text.anchor.x = text.anchor.y = 0.5;
        text.x = this.app.screen.width / 2

        text.anchor.x = text.anchor.y = 0.5;

        text.x = this.app.screen.width / 2;
        text.y = this.app.screen.height * 2 / 8;

        this.scene.addChild(text);


        var button: Graphics = new Graphics().roundRect(0, 0, this.app.screen.width / 3, this.app.screen.height / 12, 10).fill(0xffffff);
        const text1 = new Text('home', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: 50 }));
        text1.anchor.x = text1.anchor.y = 0.5;
        text1.x = button.width / 2;
        text1.y = button.height / 2;
        button.addChild(text1);

        button.on('pointerdown',() => this.backHome());

        button.x = this.app.screen.width / 2;
        button.y = this.app.screen.height * 5 / 8;

        button.pivot.set(button.width / 2, button.height / 2);

        button.interactive = true;
        (button as any).buttonMode = true;

        this.scene.addChild(button);





    }

    backHome(){
        this.scene.removeChildren();

        this.manager.startGame();
    }


}

export default DungeonScene;