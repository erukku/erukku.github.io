import DefaultDict from "../../../util/DefaultDict.js";
import Player from "./Player.js";

class Animation{
    constructor(player){
        this.player = player;
        this.graphic = this.player.graphicMain;

        this.flame = 0;

        this.assets = PIXI.Assets;

        //stand,walk,jump,attack,damaged,heal
        this.status = "stand";
        this.animationData = null;
        this.animationDataArray = new Array();
        this.animationFlameDict= new DefaultDict(new Array());
        this.animationLoadDict = new DefaultDict(null);


        this.ticker = PIXI.Ticker.shared;
    }

    setTest(){
        this.initAsset();
        this.initAnimationFlameDict();
        this.initAnimationLoadDict();
        this.setStatus("wait");

        this.setAnimationArray();
        this.nextAnimationData();

        var This = this;
        this.keyFn = function(time){
            This.updateAnimation();
        }
        this.ticker.add(This.keyFn);
    }

    initAsset(){
        this.assets.add({alias:"player2",src:"MCoM/resource/img/player2.png"});
        this.assets.add({alias:"player3",src:"MCoM/resource/img/player3.png"});
        this.assets.add({alias:"breaked",src:"MCoM/resource/img/p_breaked.png"});
        this.assets.add({alias:"walk1",src:"MCoM/resource/img/p_walk1.png"});
        this.assets.add({alias:"walk2",src:"MCoM/resource/img/p_walk2.png"});
        this.assets.add({alias:"walk3",src:"MCoM/resource/img/p_walk3.png"});
        this.assets.add({alias:"walk4",src:"MCoM/resource/img/p_walk4.png"});

    }

    

    setStatus(status){
        if(this.status == status){
            return 0;
        }
        this.status = status;
        this.setAnimationArray();
        this.nextAnimationData();
        this.flame = 0;
    }


    initAnimationFlameDict(){
        this.animationFlameDict["wait"] = [["player",60]];
        this.animationFlameDict["walk"] = [["walk1",5],["walk2",10],["walk3",15],["walk4",20]];
        this.animationFlameDict["stand"] = [["player",60]];
        this.animationFlameDict["jump"] = [["player",60]];
        this.animationFlameDict["breaked"] = [["breaked",60]];
        this.animationFlameDict["damaged"] = [["player",60]];
        this.animationFlameDict["heal"] = [["player",60]];


        this.animationFlameDict["attack"] = [["player2",10],["player3",60]];

    }

    initAnimationLoadDict(){
        (async () => {
            this.animationLoadDict["player"] = await this.assets.load("player");
            this.animationLoadDict["player2"] = await this.assets.load("player2");
            this.animationLoadDict["player3"] = await this.assets.load("player3");
            this.animationLoadDict["breaked"] = await this.assets.load("breaked");
            this.animationLoadDict["walk1"] = await this.assets.load("walk1");
            this.animationLoadDict["walk2"] = await this.assets.load("walk2");
            this.animationLoadDict["walk3"] = await this.assets.load("walk3");
            this.animationLoadDict["walk4"] = await this.assets.load("walk4");
            
        })();
        
        /*

        */
    }

    nextAnimationData(){
        this.animationData = this.animationDataArray.shift();
        this.player.graphicMain.texture = this.getAnimationGraphic();
    }

    setAnimationArray(){
        this.animationDataArray = new Array();
        for(var i = 0;i < this.animationFlameDict[this.status].length;i++){
            this.animationDataArray.push(this.animationFlameDict[this.status][i]);
        }
        
    }

    getAnimationGraphic(){
        return this.animationLoadDict[this.animationData[0]]
    }


    updateAnimation(){
        //console.log(this.status,10);
        if(this.animationData[1] == this.flame){
            if(this.animationDataArray.length == 0){
                if(this.status == "walk"){
                    this.setAnimationArray();
                    this.nextAnimationData();
                    this.player.graphicMain.texture = this.getAnimationGraphic();   
                    this.flame = 0;
                    return 0; 
                }

                this.status = "wait";
                this.setAnimationArray();
                this.nextAnimationData();
                this.player.graphicMain.texture = this.getAnimationGraphic();
            }
            else{
                this.nextAnimationData();
                this.player.graphicMain.texture = this.getAnimationGraphic();
            }

            this.flame = 0;
        }

        else{
            this.flame += 1;
        }
    }

}

export default Animation