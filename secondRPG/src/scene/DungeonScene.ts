import { ColorMatrixFilter, Container, Sprite, TextStyle, Application, Text, Texture, Graphics } from "pixi.js";
import type ManageScene from "../base/ManageScene";
import Enemy from "../base/Enemy";
import type Player from "../base/Player";
import type Player from "../base/Player";



class DungeonScene {
    private app: Application;
    private stage: Container;
    private manager: ManageScene;

    private scene: Container;

    private walls: Container;
    private grounds: Container;
    private fires: Container;

    private enemys: Container;

    private chart: String[];
    private player: Player;


    constructor(stage: Container, app: Application,player:Player ,manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.player = player;
        this.manager = manager;

        this.manager;

        this.scene = new Container();
        this.stage.addChild(this.scene);

        this.walls = new Container();
        this.grounds = new Container();
        this.fires = new Container();

        this.enemys = new Container();


        this.chart = [];


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

        const hour: Sprite = Sprite.from("grass");

        hour.width = this.app.screen.width*1.2;
        hour.height = this.app.screen.height*1.2;

        hour.anchor.x = 0.5;
        hour.x= this.app.screen.width/2;

        //hour.scale.x = 1.2;




        this.scene.getChildAt(1).addChild(hour);
        hour.y -= this.app.screen.height*1/2;

        // create a sprite from the gradient texture and use it as a mask
        const maskTexture = createGradientTexture(hour.width, hour.height*3/5);
        const maskSprite = new Sprite(maskTexture);
        maskSprite.x = 0;
        maskSprite.y = 0;
        this.scene.getChildAt(1).addChild(maskSprite);
        hour.mask = maskSprite;


        function createGradientTexture(w: number, h: number) {
            const canvas = document.createElement('canvas');
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                // Fallback: return an empty texture if 2D context is unavailable
                return Texture.EMPTY;
            }
            const gradient = ctx.createLinearGradient(0, 0, 0, h*1/3); // 上から下へ
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');   // 不透明
            gradient.addColorStop(1, 'rgba(255, 255, 255, 1)');   // 透明
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, w, h*1/3);

            //ctx.fillStyle = 0x000000;
            ctx.fillRect(0, h*1/3, w, h);
            return Texture.from(canvas);
        }

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
                this.setBattle();
                break;
            case "end":
                this.clear();
                break;
        }

    }

    enter() {
        console.log("aaa")
        
        this.player.graphic.y = this.app.screen.height * 3 / 5 * (2 / 5);
        this.player.graphic.x = -100;

        this.scene.getChildAt(0).addChild(this.player.graphic);

        const posX: number = this.app.screen.width / 4;
        var flame: number = 0;

        const fn = () => {
            this.player.graphic.x += (posX - this.player.graphic.x) / 8;
            flame += 1;

            if (flame >= 40) {
                this.player.graphic.x = posX;
                this.app.ticker.remove(fn);
                flame = 0;
                this.flow();
            }
        }

        this.app.ticker.add(fn);
    }

    move(target: String = "null") {
        var moveList: Container[] = [this.grounds, this.walls, this.fires];
        var flame: number = 0;
        console.log(target);

        switch (target) {
            case "enemy":
                moveList.push(this.enemys);
                break;
            case "event":
                break;
        }

        moveList = moveList.reverse();

        const fn = () => {

            for (var i = 0; i < moveList.length; i++) {
                moveList[i].x -= this.app.screen.width / 30;
            }

            flame += 1;

            if (flame >= 30) {

                this.grounds.x = 0;
                this.walls.x = 0;
                this.fires.x = 0;

                this.app.ticker.remove(fn);
                switch (target) {
                    case "enemy":
                        this.enemys.x = 0;
                        this.startBattle();
                        break;
                    case "event":
                        break;
                    case "null":
                        this.flow();
                        break
                }
            }


        }
        this.app.ticker.add(fn);

    }

    setBattle() {
        //test
        const enemy: Enemy = new Enemy();
        enemy.setGraphic();

        const container: Container = new Container();
        container.addChild(enemy.getGraphic());

        this.enemys.addChild(container);
        //this.enemys.x = this.app.screen.width/2;
        container.y = this.app.screen.height * 3 / 5 * (2 / 5);

        this.scene.addChild(this.enemys);

        container.x = this.player.graphic.x + this.app.screen.width * 3 / 2;

        this.move("enemy");

    }

    startBattle() {
        //test
        this.enemys.removeChildren();

        this.flow();
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

        button.on('pointerdown', () => this.backHome());

        button.x = this.app.screen.width / 2;
        button.y = this.app.screen.height * 5 / 8;

        button.pivot.set(button.width / 2, button.height / 2);

        button.interactive = true;
        (button as any).buttonMode = true;

        this.scene.addChild(button);





    }

    backHome() {
        this.scene.removeChildren();

        this.manager.startGame(this.player);
    }


}

export default DungeonScene;