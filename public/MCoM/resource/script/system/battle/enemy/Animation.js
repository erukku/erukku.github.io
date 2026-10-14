import DefaultDict from "../../../util/DefaultDict.js";


class Animation{
    constructor(enemy){
        this.enemy = enemy;
        this.graphic = this.enemy.graphicMain;

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

        this.enemy.direction = "L";

        this.setAnimationArray();
        this.nextAnimationData();

        var This = this;
        this.keyFn = function(time){
            This.updateAnimation();
        }
        this.ticker.add(This.keyFn);
    }

    initAsset(){
        this.assets.add({alias:"slime",src:"MCoM/resource/img/slime.png"});
        this.assets.add({alias:"slime1",src:"MCoM/resource/img/slime1.png"});
        this.assets.add({alias:"slime2",src:"MCoM/resource/img/slime2.png"});
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
        this.animationFlameDict["wait"] = [["slime",60]];
        this.animationFlameDict["move"] = [["slime",60]];
        this.animationFlameDict["breaked"] = [["slime",60]];

        this.animationFlameDict["attack"] = [["slime",10],["slime1",20],["slime2",60]];

    }

    initAnimationLoadDict(){
        (async () => {
            this.animationLoadDict["slime"] = await this.assets.load("slime");
            this.animationLoadDict["slime2"] = await this.assets.load("slime2");
            this.animationLoadDict["slime1"] = await this.assets.load("slime1");
            
        })();
        
        /*

        */
    }

    nextAnimationData(){
        this.animationData = this.animationDataArray.shift();
        this.enemy.graphicMain.texture = this.getAnimationGraphic();
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

        if(this.enemy.direction == "L"){
            if(this.enemy.graphicMain.scale.x > 0){
                this.enemy.graphicMain.scale.x *= -1;
            }
        }
        else if(this.enemy.direction == "R"){
            if(this.enemy.graphicMain.scale.x < 0){
                this.enemy.graphicMain.scale.x *= -1;
            }
        }

        if(this.animationData[1] == this.flame){
            if(this.animationDataArray.length == 0){
                if(this.status == "move"){
                    this.setAnimationArray();
                    this.nextAnimationData();
                    this.enemy.graphicMain.texture = this.getAnimationGraphic();   
                    this.flame = 0;
                    return 0; 
                }

                this.status = "wait";
                this.setAnimationArray();
                this.nextAnimationData();
                this.enemy.graphicMain.texture = this.getAnimationGraphic();
            }
            else{
                this.nextAnimationData();
                this.enemy.graphicMain.texture = this.getAnimationGraphic();
            }

            this.flame = 0;
        }

        else{
            this.flame += 1;
        }
    }

    delete(){
        this.ticker.remove(this.keyFn);
        //this.destroy();
    }
}

export default Animation