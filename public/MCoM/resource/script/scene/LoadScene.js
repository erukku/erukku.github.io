import LoadDict from "../util/LoadDict.js"
class LoadScene {
    constructor(scene,manager){
        this.scene = scene;
        this.manager = manager;

        this.load = new LoadDict();

        this.ticker = PIXI.Ticker.shared;
        this.fn = null;
    }

    startLoad(){
        this.load.testLoad();
        this.container = new PIXI.Container();

        this.scene.addChild(this.container);

        var perGraphic = new PIXI.Text(`${0}%`, {fontFamily : 'Arial', fontSize: 100, fill : 0x000000});
        this.container.addChild(perGraphic);

        perGraphic.x = 20;
        perGraphic.y = 180;
        this.container.zIndex = 10**5 + 10;
        //perGraphic.anchor.x = perGraphic.anchor.y = 0.5;

        var perNum = this.load.loadPer
        
        const This = this;
        
        var fn = function(time){
            perNum = This.load.loadPer;
            perGraphic.text = `${perNum}%`;
            if(perNum == 100){
                This.ticker.remove(This.fn);
                This.scene.removeChild(This.container);
                This.manager.changeScene("onway");
            }
        };
        this.fn = fn;
        
        this.ticker.add(this.fn);
        
    }

    destroy(){
        this.container.destroy();
    }
}

export default LoadScene;