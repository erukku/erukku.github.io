import ManageScene from "./ManageScene.js"

class StartScene{
    constructor(key,app){ 
        console.log("start");
        this.key = key[0];
        this.keyList = key;
        this.app = app;

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
        var startText = new PIXI.Text("start", {fontFamily : 'Arial', fontSize: 100, fill : 0xffffff});
        var configText = new PIXI.Text("config", {fontFamily : 'Arial', fontSize: 50, fill : 0xaaaaaa});

        this.selectList = [[startText,configText]];

        startText.x = 500;
        startText.y = 200;
        
        startText.anchor.x = startText.anchor.y = 0.5;

        configText.x = 500;
        configText.y = 300;

        configText.anchor.x  = configText.anchor.y = 0.5

        this.scene.addChild(startText);
        this.scene.addChild(configText);

        var This = this;

        var fn = function(time){
            This.selectList[0][This.selectNum].style = This.downStyle;

            if(This.keyPrssing("k")){
                This.selectNum += 1;
            }
            else if(This.keyPrssing("i")){
                This.selectNum += 1;
            }
            This.selectNum %= 2;

            if(This.selectNum == 0 && This.keyPrssing("a")){
                This.removeTicker();
                This.manager.changeScene("onway");
            }

            This.selectList[0][This.selectNum].style = This.upStyle;
            
        };
        this.selectFn = fn;
        this.ticker.add(fn);
        
        

    }

    keyPrssing(key){
        return this.key[key];
    }

    setManager(manager){
        this.manager = manager;
        console.log(this.manager);
    }

    removeTicker(){
        this.ticker.remove(this.selectFn);
    }

    destroy(){
        this.scene.destroy();
    }



}
export default StartScene; 