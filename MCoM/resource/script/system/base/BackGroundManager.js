import DefaultDict from "../../util/DefaultDict.js";

class BackGroundManager{
    constructor(scene){
        this.scene = scene;

        this.assets = PIXI.Assets;

        this.bgDict = new DefaultDict();

        this.initAsset();
        this.initBGDictLoad();
    }

    initAsset(){
        this.assets.add({alias:"forest",src:"MCoM/resource/img/bg_forest.png"});
    }

    async initBGDictLoad(){
        this.bgDict["forest"] = await this.assets.load("forest");
        
    }

    async setBG(bg){
        console.log(2);
        if(this.bgDict[bg] == null){
            console.log(4);
            this.scene.stage.bg.texture= await this.assets.load(bg);  
            //console.log(this.scene.stage.bg.scale.x,this.scene.stage.bg.scale.y);
        }
        else{
            console.log(3);
            this.scene.stage.bg.texture = this.bgDict[bg];
        }
        //this.scene.bgGraphic = await new PIXI.Sprite(this.bgDict[bg]);
    }

}

export default BackGroundManager