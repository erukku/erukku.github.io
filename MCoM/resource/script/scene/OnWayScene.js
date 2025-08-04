import StageShow from "../ui/battle/StageShow.js"
import BattleScene from "./BattleScene.js"
import ConvertPos from "../system/base/ConvertPos.js"

import Route from "../system/base/Route.js"

import Enemy from "../system/battle/enemy/Enemy.js"

class OnWayScene{
    constructor(stage,player,key,app){
        console.log("onway")
        this.appStage = stage;
        this.stageContainer = new PIXI.Container();
        this.appStage.addChild(this.stageContainer);
        this.app = app;

        this.player = player;
        this.player.graphic.zIndex = 1;
        this.key = key[0];
        this.keyList = key;

        this.convertPos = new ConvertPos();
        this.container = new PIXI.Container();
        this.leftWall = new PIXI.Graphics().beginFill(0x111111).drawRect(0, 0, 320, 240).endFill();
        this.rightWall = new PIXI.Graphics().beginFill(0x111111).drawRect(0, 0, 320, 240).endFill();

        this.leftWall.zIndex = 0;
        this.rightWall.zIndex = 0;

        this.leftWall.x = 0;
        this.rightWall.x = 320;

        this.container.addChild(this.leftWall);
        this.container.addChild(this.rightWall);

        this.appStage.addChild(this.container);
        this.transformFlame = 0;
        this.transformFn = null;
        this.ticker = PIXI.Ticker.shared;
        


        this.keyFn = null;

        this.route = new Route(this);
        
    }

    setView(){
        this.stage = new StageShow(this.stageContainer);
        this.stage.show();
        this.stage.stage.scale.x = 1.3;
        this.stage.stage.scale.y = 0.1;

        this.baseStage = new PIXI.Container();
        this.baseStage.sortableChildren = true;
        this.baseStage.y = 210;

        this.player.position.setPos(50,0,0);
        this.convertPos.convert(this.player);
        this.baseStage.addChild(this.player.graphic);
        this.container.addChild(this.baseStage);

        var This = this;
        this.keyFn = function(time){
            This.event();
        }

        this.ticker.add(this.keyFn);
        /*
        var This = this;
        this.transformFn = function(time){This.transformGround()};
        this.ticker.add(this.transformFn);
        */

        this.route.setRoute(1);
        this.route.setGraphic();
    }

    transformGround(){
        if(this.transformFlame < 30){
            this.stage.stage.scale.x = 1.3 - (this.transformFlame+1)/100;
            this.stage.stage.scale.y = 0.1 + 0.9*(this.transformFlame/29);


            this.baseStage.y = 210 + 10*(this.transformFlame/29);
            this.player.position.setPos(50,50 * (this.transformFlame/29),0);
            this.convertPos.convert(this.player);

            this.e1.setPos(300,20 * (this.transformFlame/29),0);
            this.e2.setPos(350,50 * (this.transformFlame/29),0);
            this.e3.setPos(400,80 * (this.transformFlame/29),0);

            this.transformFlame += 1;
        }
        else{
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);
            this.transformFn = null;

            this.ticker.remove(this.keyFn);

            var enemys = [this.e1,this.e2,this.e3];
            var battle = new BattleScene(this.player,enemys,this.baseStage,this.keyList,this);
            battle.setTest();
        }
        
    }

    backOnWay(){
        var This = this;
        var fn = function(time){
            This.transformLine();
        } 
        this.transformFn = fn;
        this.ticker.add(fn);

        this.route.addCount(0);
        this.route.movePlayerIcon();
    }

    
    transformLine(){
        if(this.transformFlame < 30){
            this.stage.stage.scale.x = 1.0 + (this.transformFlame+1)/100;
            this.stage.stage.scale.y = 1 - 0.9*(this.transformFlame/29);


            this.baseStage.y = 220 - 10*(this.transformFlame/29);
            this.player.position.setPos(50,50 - 50 * (this.transformFlame/29),0);
            this.convertPos.convert(this.player);
            this.transformFlame += 1;
        }
        else{
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);

            var This = this;
            this.transformFn = function(time){
                This.wallClose();    
            };

            this.ticker.add(this.transformFn);

        }
        
    }

    keyPrssing(key){
        return this.key[key];
    }

    event(){
        if(this.keyPrssing("a") && this.transformFn == null){
            var nextEvent = this.route.selectWay();
            //console.log(this.ticker.FPS);
            if(nextEvent == "battle"){
                this.route.removeContainer(this.appStage);
                this.testBattle();
                this.player.deckset.deckInit();

                this.ticker.remove(this.keyFn);
            }
            else if(nextEvent == "end"){
                this.removeTicker();
                this.manager.changeScene("end");

            }
        }

        if(this.keyPrssing("i") && this.transformFn == null){
            this.route.addCount(1);

        }
        if(this.keyPrssing("k") && this.transformFn == null){
            this.route.addCount(-1);
        }

        /*
        if(this.keyPrssing("a") && this.transformFn == null){

            this.player.position.setPos(50,0,0);

            this.appStage.addChild(this.player.uiContainer);

            var This = this;
            this.transformFn = function(time){This.transformGround()};
            this.ticker.add(this.transformFn);
        }
        else if(this.keyPrssing("s") && this.transformFn == null){

            this.e1 = new Enemy();
            this.e2 = new Enemy();
            this.e3 = new Enemy();

            this.e1.setTest();
            this.e2.setTest();
            this.e3.setTest();

            this.e1.setPos(300,0,0);
            this.e2.setPos(350,0,0);
            this.e3.setPos(400,0,0);

            this.baseStage.addChild(this.e1.graphic);
            this.baseStage.addChild(this.e2.graphic);
            this.baseStage.addChild(this.e3.graphic);

            var This = this;
            this.transformFn = function(time){This.wallOpen()};
            this.ticker.add(this.transformFn);
        }
        */
        if(this.keyPrssing("d") && this.transformFn == null){
            this.route.setContainer(this.appStage);
        }
        else if(this.keyPrssing("f") && this.transformFn == null){
            this.route.removeContainer(this.appStage);
        }

        
    }

    testBattle(){
        this.e1 = new Enemy();
        this.e2 = new Enemy();
        this.e3 = new Enemy();

        this.e1.setTest();
        this.e2.setTest();
        this.e3.setTest();

        this.e1.setPos(300,0,0);
        this.e2.setPos(350,0,0);
        this.e3.setPos(400,0,0);

        this.baseStage.addChild(this.e1.graphic);
        this.baseStage.addChild(this.e2.graphic);
        this.baseStage.addChild(this.e3.graphic);

        var This = this;
        this.transformFn = function(time){This.wallOpen("battle")};
        this.ticker.add(this.transformFn);
    }

    wallClose(){
        if(this.transformFlame < 30){
            this.leftWall.x += 320/30;
            this.rightWall.x -= 320/30;
            this.transformFlame += 1;
        }
        else{
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);
            this.transformFn = null;
            this.appStage.removeChild(this.player.uiContainer);
            this.ticker.add(this.keyFn);
            
        }
    }


    wallOpen(type){
        if(this.transformFlame < 30){
            this.leftWall.x -= 320/30;
            this.rightWall.x += 320/30;
            this.transformFlame += 1;
        }
        else{
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);
            this.transformFn = null;

            if(type == "battle"){
                this.player.position.setPos(50,0,0);

                this.appStage.addChild(this.player.uiContainer);

                var This = this;
                this.transformFn = function(time){This.transformGround()};
                this.ticker.add(this.transformFn);
            }
        }
    }

    setManager(manager){
        this.manager = manager;
        console.log(this.manager);
    }

    removeTicker(){
        this.ticker.remove(this.transformFn);
        this.ticker.remove(this.keyFn);
    }

    destroy(){
        this.stageContainer.destroy();
    }


}

export default OnWayScene;