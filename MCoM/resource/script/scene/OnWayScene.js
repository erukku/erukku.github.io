import StageShow from "../ui/battle/StageShow.js"
import BattleScene from "./BattleScene.js"
import ShopScene from "./ShopScene.js"
import EventScene from "./EventScene.js"
import LoadScene from "./LoadScene.js"

import ConvertPos from "../system/base/ConvertPos.js"

import Route from "../system/base/Route.js"
import BackGroundManager from "../system/base/BackGroundManager.js"

import Enemy from "../system/battle/enemy/Enemy.js"
import ShopShow from "../ui/shop/ShowShow.js"


import Window from "../ui/window/Window.js"
import Message from "../ui/window/Message.js"

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


        this.assets = PIXI.Assets;

        this.seat = new PIXI.Sprite();
        this.base = new PIXI.Graphics().rect(0,0,640,240).fill(0x000000).endFill();
        this.bgBase = new PIXI.Graphics().rect(0,0,640,480).fill(0x8b4513).endFill();

        
        //this.leftWall = new PIXI.Graphics().beginFill(0x111111).drawRect(0, 0, 320, 240).endFill();
        //this.rightWall = new PIXI.Graphics().beginFill(0x111111).drawRect(0, 0, 320, 240).endFill();
        this.leftWall = new PIXI.Sprite();
        this.rightWall = new PIXI.Sprite();

        this.bgL = new PIXI.Sprite();
        this.bgR = new PIXI.Sprite();

        //this.leftWall.scale.x =this.leftWall.scale.y = 0.7;
        //this.rightWall.scale.x =this.rightWall.scale.y = 0.7;

        this.leftWall.scale.y = 1.05;
        this.rightWall.scale.y = 1.05;


        //this.leftWall.anchor.x =this.leftWall.anchor.y = 0.5;
        //this.rightWall.anchor.x =this.rightWall.anchor.y = 0.5;

        this.bgL.texture = this.assets.cache.get('forestL');
        this.bgR.texture = this.assets.cache.get('forestR');
        this.leftWall.texture = this.assets.cache.get('cover');
        this.rightWall.texture = this.assets.cache.get('cover');
        this.seat.texture = this.assets.cache.get('seat');
        
        this.leftWall.zIndex = 0;
        this.rightWall.zIndex = 0;

        this.leftWall.x = 0;
        this.rightWall.x = 320;

        this.bgL.scale.x = this.bgL.scale.y = 0.5;
        this.bgL.scale.x = -0.5;
        this.bgR.scale.x = this.bgR.scale.y = 0.5;

        this.bgL.x = 40;
        this.bgL.y = 170;

        this.bgR.x = 600;
        this.bgR.y = 170;

        this.base.y = 250;

        this.seat.scale.x = 1;
        //this.seat.y = 100;
        this.seat.y = 120;

        this.bgManager = new BackGroundManager(this);
        this.bgGraphic = new PIXI.Sprite();

        //this.container.addChild(this.bgGraphic);

        this.stageContainer.addChild(this.bgBase);
        this.container.addChild(this.base);
        this.container.addChild(this.bgL);
        this.container.addChild(this.bgR);

        this.container.addChild(this.seat);
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

        /*
        var window = new Window(this.container);
        window.graphicContainer.zIndex = 10000;
        window.graphicContainer.x = 150;
        window.graphicContainer.y = 50;
        window.initWindow(150,400);

        var message = new Message(window);
        message.setMessage([1,"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"]);
        message.startMessage();
        */

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

        console.log(1)
        this.bgManager.setBG("forest");
        /*
        var This = this;
        this.transformFn = function(time){This.transformGround()};
        this.ticker.add(this.transformFn);
        */

        this.route.setRoute(4);
        this.route.initAsset();
        this.route.initRootIconDict();
        this.route.setGraphic();

        this.route.setContainer(this.appStage);
    }

    transformGround(){
        if(this.transformFlame < 30){
            this.stage.stage.scale.x = 1.3 - (this.transformFlame+1)/100;
            this.stage.stage.scale.y = 0.1 + 0.9*(this.transformFlame/29);

            this.stage.bg.scale.y = 0.5 * (1+0.001*this.transformFlame) / (0.1 + 0.9*(this.transformFlame/29));


            this.baseStage.y = 210 + 10*(this.transformFlame/29);
            this.player.position.setPos(50,50 * (this.transformFlame/29),0);
            this.convertPos.convert(this.player);

            this.e1.setPos(300,20 * (this.transformFlame/29),0);
            this.e2.setPos(350,50 * (this.transformFlame/29),0);
            this.e3.setPos(400,80 * (this.transformFlame/29),0);

            this.seat.y += 1.5;

            this.transformFlame += 1;
        }
        else{
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);
            this.transformFn = null;

            this.ticker.remove(this.keyFn);

            var enemys = [this.e1,this.e2,this.e3];

            this.player.deckset.deckSet(this.player.deck);
            var battle = new BattleScene(this.player,enemys,this.baseStage,this.keyList,this,this.app);
            battle.setTest();
        }
        
    }

    backOnWay(){
        if(this.route.route[this.route.now[0]][this.route.now[1]] != "battle"){
            this.transformFlame = 30;
        }
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

            this.stage.bg.scale.y = 0.5 * (1) / (1 - 0.9*(this.transformFlame/29));


            this.baseStage.y = 220 - 10*(this.transformFlame/29);
            this.player.position.setPos(50,50 - 50 * (this.transformFlame/29),0);
            this.convertPos.convert(this.player);
            this.transformFlame += 1;

            
            this.seat.y -= 1.5;
            
            
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
            else if(nextEvent == "shop"){
                this.route.removeContainer(this.appStage);
                
                this.testShop();

                this.ticker.remove(this.keyFn);

            }
            else if(nextEvent == "event"){
                this.route.removeContainer(this.appStage);
                
                this.testEvent();

                this.ticker.remove(this.keyFn);
            }
            else if(nextEvent == "end"){
                this.removeTicker();
                this.manager.changeScene("end");

            }
        }

        if(this.keyPrssing("i") && this.transformFn == null){
            this.route.addCount(-1);

        }
        if(this.keyPrssing("k") && this.transformFn == null){
            this.route.addCount(1);
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

    testShop(){
        var This = this;
        this.transformFn = function(time){This.wallOpen("shop")};
        this.ticker.add(this.transformFn);
    }

    testEvent(){
        var This = this;
        this.transformFn = function(time){This.wallOpen("event")};
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
            this.player.moveX(0);
            this.leftWall.x -= 320/30;
            this.rightWall.x += 320/30;
            this.transformFlame += 1;
        }
        else{
            this.player.animation.setStatus("wait");
            this.transformFlame = 0;
            this.ticker.remove(this.transformFn);
            this.transformFn = null;

            if(type == "battle"){
                this.player.position.setPos(50,0,0);

                this.appStage.addChild(this.player.uiContainer);

                //this.e1.uiContainer.x = 640;
                this.appStage.addChild(this.e1.uiContainer);
                //this.e2.uiContainer.x = 640;
                this.appStage.addChild(this.e2.uiContainer);
                //this.e3.uiContainer.x = 640;
                this.appStage.addChild(this.e3.uiContainer);

                var This = this;
                this.transformFn = function(time){This.transformGround()};
                this.ticker.add(this.transformFn);
            }
            else if(type == "shop"){
                var shop = new ShopScene(this.player,null,this.baseStage,this.keyList,this)
                shop.setTest();
            }
            else if(type == "event"){
                var event = new EventScene(this.player,null,this.baseStage,this.keyList,this)
                event.setTest();
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