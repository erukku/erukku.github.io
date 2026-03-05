import type { Application, Container } from "pixi.js";
import type ManageScene from "../base/ManageScene";


class BattleScene{
    private app: Application;
    private stage: Container;
    private manager: ManageScene;


    constructor(stage: Container, app: Application, manager: ManageScene) {
        this.app = app;
        this.stage = stage;
        this.manager = manager;

        this.manager;
    }

    test(){
        
    }

}

export default BattleScene;