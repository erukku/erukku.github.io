import type { Application, Container } from "pixi.js";
import TitleScene from "../scene/TitleScene";
import LoadScene from "../scene/LoadScene";
import GameScene from "../scene/GameScene";
import DungeonScene from "../scene/DungeonScene";


class ManageScene{

    private stage:Container;
    private app:Application;
    constructor(stage:Container,app:Application){
        this.stage = stage;
        this.app = app;
    }


    test(){
        const title: TitleScene = new TitleScene(this.stage,this.app,this);
        title.setTest();
    }

    load(){
        const load: LoadScene = new LoadScene(this.stage,this.app,this);
        load.test();
    }

    startGame(){
        const game:GameScene = new GameScene(this.stage,this.app,this);
        game.test();
    }

    startDungeon(){
        const dungeon = new DungeonScene(this.stage,this.app,this);
        dungeon.test();
    }



}


export default ManageScene;