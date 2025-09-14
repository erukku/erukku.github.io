import Status from "./Status.js"
import Body from "../../base/Body.js"
import Deck from "../../../card/Deck.js"
import Position from "../../base/Position.js"
import ConvertPos from "../../base/ConvertPos.js"
import AttackInfo from "./AttackInfo.js"
import MagicInfo from "./MagicInfo.js"
import ItemInfo from "./ItemInfo.js"
import Animation from "./Animation.js"

import HpBar from "../../../ui/normal/player/HpBar.js"
import DeckShow from "../../../ui/battle/DeckShow.js"

class Player{
    constructor(){
        console.log("player");
        this.status = new Status();

        this.uiContainer = new PIXI.Container();
        this.deck = new Deck();
        this.deck.setBase();

        this.deckset = new DeckShow(this.uiContainer,"L",this);
        this.deckset.deckSet(this.deck);

        this.position = new Position();
        this.body = new Body();
        this.graphic = new PIXI.Container();

        this.hpContainer = new PIXI.Container();
        this.hpBar = new HpBar(this.status.maxHp,this.hpContainer);
        this.hpContainer.x = 50;
        this.hpContainer.y = 50;
        this.hpBar.setGraphic();
        this.uiContainer.addChild(this.hpContainer);

        

        this.converter = new ConvertPos();
        this.jumping = false;
        this.jumpFlame = 0;

        this.direction = "R";

        this.attackInfo = new AttackInfo();
        this.magicInfo = new MagicInfo();
        this.itemInfo = new ItemInfo();
        this.attacking = false;
        this.attackId = 0;
        this.attackFlame = 0;
        this.attackedE = new Array();

        this.actionNow = null;


        this.ticker = PIXI.Ticker.shared;

        this.breaked = false;

        this.assets = PIXI.Assets;

        this.cardIndex = 0;

        this.animation = new Animation(this);
        
    }

    setTest(){
        this.assets.add({alias:"player",src:"MCoM/resource/img/player.png"});

        //this.graphicMain = new PIXI.Graphics().rect(0,0,30,30).fill(0xbbbbbb);
        
        this.graphicMain = new PIXI.Graphics();
        //var image = PIXI.Assets.load("./resource/img/player.png");

        (async () => {
            this.graphicMain = new PIXI.Sprite(await this.assets.load("player"));
            this.graphic.addChild(this.graphicMain);
            
            this.graphicMain.anchor.x = this.graphicMain.anchor.y = 0.5;
            this.graphicMain.anchor.set(0.5,0.7);
            this.graphicMain.scale.set(0.5,0.5);
            
            
            console.log(this.graphicMain.width);
        })();
        
        
        //this.graphicMain = new PIXI.Graphics().rect(-15,-15,0,0).fill(0xbbbbbb);
        //this.graphicShadow = new PIXI.Graphics().circle(15,30,15).fill(0x000000);
        this.graphicShadow = new PIXI.Graphics().circle(0,0,15).fill(0x000000);
        //this.graphicShadow.scale.y = 0.7;
        //this.graphicShadow.y +=  (1-this.graphicShadow.scale.y)*30

        this.body.setBody(30,10,30);
        this.graphicMain.x -= 15;
        //this.graphicShadow.y += 60;
        
        this.graphic.addChild(this.graphicShadow);
        
        
      

        this.position.setPos(50,50,0);
        this.converter.convert(this);
        
        this.animation.setTest();
    }   

    testImage(){
        
        this.graphicMain = new PIXI.Sprite(this.loader.resource["player"].texture);
    }

    loadTest(){
        this.assets.add({alias:"player",src:"./resource/img/player.png"});
        this.assets.add({alias:"player2",src:"./resource/img/player2.png"});
        this.assets.add({alias:"player3",src:"./resource/img/player3.png"});

    }

    moveX(num){             
        this.position.x += num;
        this.animation.setStatus("walk");
        if(num > 0){
            this.direction = "R";
            if(this.graphicMain.scale.x < 0){
                this.graphicMain.scale.x *= -1;
            }
        }
        else if(num < 0){
            this.direction = "L";
            if(this.graphicMain.scale.x > 0){
                this.graphicMain.scale.x *= -1;
            }
        }

        if(this.position.x < 0){
            this.position.x = 0;
        }
        else if(this.position.x > 630){
            this.position.x = 630;
        }
        this.converter.convert(this);
    }

    moveY(num){
        this.position.y += num;
        this.animation.setStatus("walk");
        if(this.position.y < 0){
            this.position.y = 0;
        }
        else if(this.position.y > 100){
            this.position.y = 100;
        }
        this.converter.convert(this);
    }

    jump(){
        this.animation.setStatus("jump");
        if(this.jumping){

        }
        else{
            this.jumping = true;
            var This = this;
            this.jumpingFn = function(time){
                var hight = 20-This.jumpFlame*2;
                if(This.jumpFlame == 20){

                    This.ticker.remove(This.jumpingFn);
                    This.jumping = false;
                    This.jumpFlame  = 0;
                    return 0;
                }
                else if(This.jumpFlame < 10){
                }
                else{
                    hight = -(2*This.jumpFlame - 18);
                }
                This.position.z += hight;
                This.converter.convert(This);
                This.jumpFlame += 1
                //console.log(This.position.z);
            }
            this.ticker.add(this.jumpingFn);
        }
    }

    attack(){
        var cardIndex = this.deckset.getCardIndex();
        var card = this.deck.deck[cardIndex];

        this.animation.setStatus("attack");

        console.log(cardIndex,card.cardClass);

        switch(card.cardClass){
            case "attack":
                this.attackData = this.attackInfo.getInfo(0);
                break;

            case "magic":
                this.attackData = this.magicInfo.getInfo(0);
                break;

            case "item":
                this.attackData = this.itemInfo.getInfo(0);
                break;

            case "special":
                0
                break;
        }

        //console.log(this.attackData);

        this.attackData.shift();
        this.attacking = true;

    }

    getAttackInfo(index){
        var card = this.deck.deck[index];
        var data = null;
        switch(card.cardClass){
            case "attack":
                data = this.attackInfo.getInfo(0);
                break;

            case "magic":
                data = this.magicInfo.getInfo(0);
                break;

            case "item":
                data = this.itemInfo.getInfo(0);
                break;

            case "special":
                0
                break;
        }

        return data;

    }

    heal(num){
        this.status.heal(num);
        this.hpBar.heal(num);

    }
    
    damage(num){
        this.status.damage(num);
        this.hpBar.damage(num);
        //console.log(this.status);
    }
}

export default Player;