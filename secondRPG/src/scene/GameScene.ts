import { Container, Application, Graphics, Sprite } from "pixi.js";
import ManageScene from "../base/ManageScene";

class GameScene {

    private app: Application;
    private stage: Container;
    private manager: ManageScene;
    private sceneList: Container[];
    private sceneIndex: number;
    private scene:Container;

    constructor(stage: Container, app: Application, manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.manager = manager;

        this.manager;

        this.sceneList = [];
        this.sceneIndex = 0;

        this.scene = new Container();
        this.stage.addChild(this.scene);


    }


    test() {
        this.setHome();
        this.setEquip();
        this.setSkill();
        this.setDungeon();
        this.setGacha();

        this.setUnderBar();

    }

    setHome() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }

    setEquip() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }

    setSkill() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }

    setDungeon() {
        const scene: Container = new Container();

        //test
        const dungeon = Sprite.from('dungeon1');

        dungeon.eventMode = 'static'; 
        dungeon.cursor = 'pointer';

        dungeon.anchor.x = dungeon.anchor.y = 0.5;
        dungeon.x = this.app.screen.width / 2;
        dungeon.y = this.app.screen.height / 2;

        dungeon.interactive = true;
        (dungeon as any).buttonMode = true;

        dungeon.on('pointerover', () => dungeon.scale = 1.2);
        dungeon.on('pointerout', () => dungeon.scale = 1.0);


        //バトルシーンに移動
        dungeon.on('pointerdown', () => 1);

        scene.addChild(dungeon);
        this.scene.addChild(scene);

    
        scene.visible = false;

        this.sceneList.push(scene);

    }

    setGacha() {
        const scene: Container = new Container();
        this.sceneList.push(scene);
    }
    setUnderBar() {

        for (var i = 0; i < 5; i++) {
            const button: Container = new Container();

            button.interactive = true;
            (button as any).buttonMode = true;

            const box: Graphics = new Graphics().rect(0, 0, this.app.screen.width / 5, this.app.screen.height / 12).stroke({ color: 0x000000, width: 4 }).fill(0xffffff);


            let icon: Sprite = new Sprite();

            switch (i) {
                case 0:
                    icon = Sprite.from('home');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 0;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 1:
                    icon = Sprite.from('sword');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 1;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 2:
                    icon = Sprite.from('skill');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 2;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 3:
                    icon = Sprite.from('dungeon');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 3;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
                case 4:
                    icon = Sprite.from('gacha');
                    button.on('pointerdown', () => {
                        this.sceneList[this.sceneIndex].visible = false;
                        this.sceneIndex = 4;
                        this.sceneList[this.sceneIndex].visible = true;
                        console.log(this.sceneIndex);
                    });
                    break;
            }




            // 位置・サイズを調整（例）
            icon.width = icon.height = Math.min(this.app.screen.width / 8, this.app.screen.height / 16);
            icon.anchor.x = icon.anchor.y = 0.5;
            icon.x = this.app.screen.width / 10;
            icon.y = this.app.screen.width / 12;

            button.x += this.app.screen.width / 5 * i;
            button.y += this.app.screen.height * 11 / 12;

            // ボタンに追加してステージへ
            button.addChild(box);
            button.addChild(icon);
            this.stage.addChild(button);

        }


    }






}

export default GameScene;


