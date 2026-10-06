import { Container, Graphics } from "pixi.js";

class Orb{
    public size;
    public color;
    public after;
    public graphic:Container;

    constructor(size:any,color:String,after:String) {
        this.size = size;
        this.color = color;
        this.after = after;

        this.graphic = new Container();
        this.setGraphic();
    }

    setGraphic(){
        //test

        

        switch(this.color){
            case "r":
                var orb = new Graphics().circle(0,0,30-2).fill(0xff0000);
                break
            case "g":
                var orb = new Graphics().circle(0,0,30-2).fill(0x00ff00);
                break
            case "b":
                var orb = new Graphics().circle(0,0,30-2).fill(0x0000ff);
                break
            default:
                var orb = new Graphics().circle(0,0,30-2).fill(0xff0000);
                break
            
        }

        this.graphic.addChild(orb);

    }
}

export default Orb