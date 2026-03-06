import { Application, Text, Graphics, Container, Assets, TextStyle, Sprite } from 'pixi.js';
import type ManageScene from '../base/ManageScene';


class TitleScene {

    private stage: Container;
    private app: Application;
    private view: Container;

    private manager: ManageScene;

    constructor(stage: Container, app: Application,manager:ManageScene) {

        this.stage = stage;
        this.view = new Container();
        this.manager = manager;

        this.app = app;

        this.stage.addChild(this.view);

        Assets.add({
            alias: 'DenkiChipFont', // 任意の名前（CSSのfontFamily名になる）
            src: '/secondRPG/resource/font/x8y12pxDenkiChip.woff2',
            data: { family: 'DenkiChipFont' } // 明示的に family 名を指定
        });

    }

    async　setGraphic() {

        var startButton: Container = new Container();
        var continueButton: Container = new Container();

        var button1: Graphics = new Graphics().roundRect(0, 0, this.app.screen.width / 3, this.app.screen.height / 12, 10).fill(0xffffff);
        var button2: Graphics = new Graphics().roundRect(0, 0, this.app.screen.width / 3, this.app.screen.height / 12, 10).fill(0xffffff);

        startButton.addChild(button1);
        continueButton.addChild(button2);

        console.log(this.app.screen);

        await Assets.load('DenkiChipFont');


    
        const text1 = new Text('start', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: 50 }));
        text1.anchor.x = text1.anchor.y = 0.5;
        text1.x = button1.width / 2;
        text1.y = button1.height / 2;
        startButton.addChild(text1);

        const text2 = new Text('continue', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: 50 }));
        text2.anchor.x = text2.anchor.y = 0.5;
        text2.x = button2.width / 2;
        text2.y = button2.height / 2;
        continueButton.addChild(text2);


        await Assets.load({alias:'grass',src:'/secondRPG/resource/img/grass.png'})

        const grass : Sprite= Sprite.from("grass");

        grass.width = this.app.screen.width;
        grass.height = this.app.screen.height;
        
        this.view.addChild(grass);




        startButton.pivot.set(button1.width / 2, button1.height / 2);
        continueButton.pivot.set(button2.width / 2, button2.height / 2);


        startButton.x = this.app.screen.width / 2;
        startButton.y = this.app.screen.height * 5 / 8;

        continueButton.x = this.app.screen.width / 2;
        continueButton.y = this.app.screen.height * 6 / 8;

        startButton.interactive = true;
        continueButton.interactive = true;

        // enable button mode (pointer cursor) using a cast to avoid TypeScript error
        (startButton as any).buttonMode = true;
        (continueButton as any).buttonMode = true;



        startButton.on('pointerdown',() => this.startGame());
        continueButton.on('pointerdown', function(){});

        this.view.addChild(startButton);
        this.view.addChild(continueButton);

        const text3:Text = new Text('second', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.width / 4 }));
        const text4:Text = new Text('RPG', new TextStyle({ fontFamily: 'DenkiChipFont', fontSize: this.app.screen.width / 4 }));

        text3.anchor.x = text3.anchor.y = 0.5;
        text4.anchor.x = text4.anchor.y = 0.5;

        text3.x = this.app.screen.width / 2;
        text3.y = this.app.screen.height*2 / 8;

        text4.x = this.app.screen.width / 2;
        text4.y = this.app.screen.height*3 / 8;


        this.view.addChild(text3);
        this.view.addChild(text4);


    }

    setTest() {
        this.setGraphic();
    }


    startGame(){

        this.view.removeChildren();

        this.manager.load();

        console.log("start!");


    }


}

export default TitleScene;