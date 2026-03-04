import { Application, Assets, Container, Graphics, Ticker } from "pixi.js";
import type App from "../../../nazo/js/app";
import type ManageScene from "../base/ManageScene";


class LoadScene {


    private app:Application;
    private stage:Container;
    private manager:ManageScene
    private ticker: Ticker;
    private fn: Function | undefined;

    private view: Container;

    constructor(stage:Container,app:Application,manager:ManageScene) {

        this.app = app;
        this.stage = stage;
        this.manager = manager;

        this.view = new Container();
        this.stage.addChild(this.view);


        this.ticker = Ticker.shared;
        this.fn = undefined;

        this.ticker;
        this.fn;

    }

    setBundle() {
        Assets.addBundle('title', {
            player: '/secondRPG/resource/img/player.png',
            silmeG: '/secondRPG/resource/img/slimeG.png',
            silmeR: '/secondRPG/resource/img/slimeR.png',
            silmeGL: '/secondRPG/resource/img/slimeGL.png',
            skelton: '/secondRPG/resource/img/skelton.png'
        });

        Assets.addBundle('icon', {
            home: '/secondRPG/resource/img/home.png',
            sword: '/secondRPG/resource/img/sword.png',
            skill: '/secondRPG/resource/img/skill.png',
            dungeon: '/secondRPG/resource/img/dungeon.png',
            gacha: '/secondRPG/resource/img/gacha.png'
        });
        Assets.addBundle('dungeon', {
            dungeon1: '/secondRPG/resource/img/dungeon1.png',
        });
    }

    test() {
        this.setBundle();
        this.setProgressBar();
    }

    async setProgressBar() {
        const screenW = this.app.screen.width;
        const screenH = this.app.screen.height;

        // 1. プログレスバーの外枠（グレー）
        const outerBar = new Graphics()
            .roundRect(0, 0, screenW * 0.6, 20, 10)
            .fill(0x333333);
        outerBar.x = screenW / 2 - outerBar.width / 2;
        outerBar.y = screenH / 2;
        this.view.addChild(outerBar);

        // 2. プログレスバーの中身（白）
        const innerBar = new Graphics()
            .roundRect(0, 0, screenW * 0.6, 20, 10)
            .fill(0xffffff);
        innerBar.x = outerBar.x;
        innerBar.y = outerBar.y;
        innerBar.scale.x = 0; // 最初は長さゼロ
        this.view.addChild(innerBar);



        // 3. ロード実行（進捗に合わせて scale.x を更新）
        await Assets.loadBundle(['title','icon','dungeon'], (progress) => {
            innerBar.scale.x = progress;
        });

        // 4. ロード完了後にバーを消してボタンを表示
        this.view.removeChild(outerBar, innerBar);
        
        this.manager.startGame();
    }


}

export default LoadScene;