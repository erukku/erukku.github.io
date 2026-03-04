import type { Application, Container } from "pixi.js";
import TitleScene from "../scene/TitleScene";
import LoadScene from "../scene/LoadScene";


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



}


export default ManageScene;