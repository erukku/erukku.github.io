import type { Application, Container } from "pixi.js";
import TitleScene from "../scene/TitleScene";


class ManageScene{

    private stage:Container;
    private app:Application;
    constructor(stage:Container,app:Application){
        this.stage = stage;
        this.app = app;
    }


    test(){
        const title: TitleScene = new TitleScene(this.stage,this.app);
        title.setTest();
    }



}


export default ManageScene;