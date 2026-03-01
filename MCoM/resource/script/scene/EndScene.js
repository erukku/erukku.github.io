import ManageScene from "./ManageScene.js"

class EndScene{
    constructor(){ 


        this.scene = new PIXI.Container();
        this.ticker =  PIXI.Ticker.shared;

        this.selectFn = 0;
        this.selectNum = 0;
        this.manager = 0;

        this.keyLock = false;


        this.upStyle = new PIXI.TextStyle({
            fontSize: 100,
            fill : 0xffffff
        });

        this.downStyle = new PIXI.TextStyle({
            fontSize: 50,
            fill : 0xaaaaaa
        });
    }

    setStart(){
        var endText = new PIXI.Text("End", {fontFamily : 'Arial', fontSize: 100, fill : 0xffffff});

        endText.x = 500;
        endText.y = 200;
        
        endText.anchor.x = endText.anchor.y = 0.5;

        this.scene.addChild(endText);
        

        
        


    }

    setManager(manager){
        this.manager = manager;
        console.log(this.manager);
    }

    destroy(){
        this.scene.destroy();
    }



}
export default EndScene; 