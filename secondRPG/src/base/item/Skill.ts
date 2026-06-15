import { Container, Graphics } from "pixi.js";

class Skill{
    public size;
    public effect;

    public graphic:Container;
    constructor(size:any,effect:any,afterEffect:any){
        this.size = size;
        this.effect = effect;
        this.effect = afterEffect;

        this.graphic = new Container();
        this.setGraphic()
    }


    setGraphic(){
        var graphic = new Graphics().roundRect(0,0,20,20,5);
        this.graphic.addChild(graphic);
    }

}

export default Skill