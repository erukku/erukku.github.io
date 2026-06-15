import { Sprite } from "pixi.js";

class Enemy{

    public hp:number = 100;

    private graphic:Sprite;
    constructor(){
        this.graphic = new Sprite();
    }

    setGraphic(){
        this.graphic = Sprite.from("slimeG");
        this.graphic.anchor.x =this.graphic.anchor.y = 0.5;
        this.graphic.width =this.graphic.height = 100; 
    }

    getGraphic(){
        return this.graphic;
    }
}

export default Enemy;