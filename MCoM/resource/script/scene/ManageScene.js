import StartScene from "./StartScene.js"
import BattleScene from "./BattleScene.js"
import OnWayScene from "./OnWayScene.js"
import EndScene from "./EndScene.js"

import Player from "../system/battle/player/Player.js"

class ManageScene{
    constructor(stage,key,app){
        this.stage = stage;
        this.key = key[0];
        this.keyList = key;
        this.app = app;

        this.now = 0;

        this.changeFlame = 0;
        this.changeFn = null;

        this.leftWall = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 320, 360).endFill();
        this.rightWall = new PIXI.Graphics().beginFill(0xffffff).drawRect(0, 0, 320, 360).endFill();

        this.leftWall.zIndex = 10**5;
        this.rightWall.zIndex = 10**5;

        this.leftWall.x = -320;
        this.rightWall.x = 640;

        this.stage.addChild(this.leftWall);
        this.stage.addChild(this.rightWall);

        this.ticker = PIXI.Ticker.shared; 
    }

    start(){
        var start = new StartScene(this.keyList,this.app);
        start.setStart()
        start.setManager(this);

        //console.log(start.manager);
        this.stage.addChild(start.scene);

        this.now = start;

        console.log("1")
    }

    changeScene(type){
        if(type == "onway"){
            var This = this;

            var fn = function(time){
                This.wallClose(type);
            }
            this.changeFn = fn;

            this.ticker.add(fn);
            /*
            this.now.destroy();
            var player = new Player();
            player.setTest();
            var battle = new BattleScene(player,this.key,this.key);
            battle.setTestBattle();
            battle.manager  = this;
            this.stage.addChild(battle.scene);
            */


        }

        else if(type == "end"){
            var This = this;

            var fn = function(time){
                This.wallClose(type);
            }
            this.changeFn = fn;

            this.ticker.add(fn);
        }
    }

    wallClose(type){
        if(this.changeFlame < 30){
            this.leftWall.x += 320/30;
            this.rightWall.x -= 320/30;
            this.changeFlame += 1;
        }
        else{
            this.changeFlame = 0;
            this.ticker.remove(this.changeFn);
            this.changeFn = null;

            this.ticker.addOnce(this.betweenSet(type));
        }
    }

    betweenSet(type){
        this.now.destroy();
        this.now = null;

        if(type == "battle"){
            /*
            var player = new Player();
            player.setTest();
            var battle = new BattleScene(player,this.keyList,this.keyList,this.app);
            battle.setTestBattle();
            battle.manager  = this;
            this.stage.addChild(battle.scene);

            this.now = battle;

            var This = this;
            var fn = function(time){
                This.wallOpen();
            }
            this.changeFn = fn;
            this.ticker.add(fn);

            */

        }

        if(type == "onway"){
            
            
            var player = new Player();
            player.setTest();

            var onWay = new OnWayScene(this.stage,player,this.keyList,this.app); 
            onWay.setView();
            onWay.manager = this;
            //this.stage.addChild(onWay.scene);

            this.now = onWay;

            var This = this;
            var fn = function(time){
                This.wallOpen();
            }
            this.changeFn = fn;
            this.ticker.add(fn);
            
        }
        else if(type == "end"){
            var end = new EndScene();
            end.setStart();
            this.stage.addChild(end.scene);
            this.now = end;

            var This = this;
            var fn = function(time){
                This.wallOpen();
            }
            this.changeFn = fn;
            this.ticker.add(fn);
        }
    }

    wallOpen(){
        if(this.changeFlame < 30){
            this.leftWall.x -= 320/30;
            this.rightWall.x += 320/30;
            this.changeFlame += 1;
        }
        else{
            this.changeFlame = 0;
            this.ticker.remove(this.changeFn);
            this.changeFn = null;
        }
    }

}

export default ManageScene