import Status from "./Status.js"
import Body from "../../base/Body.js"
import Deck from "../../../card/Deck.js"
import Position from "../../base/Position.js"
import ConvertPos from "../../base/ConvertPos.js"
import AttackInfo from "./AttackInfo.js"
import HpBar from "../../../ui/normal/enemy/HpBar.js"


import DeckShow from "../../../ui/battle/DeckShow.js"
class Enemy{
    constructor(){
        this.status = new Status();

        this.deck = new Deck();
        this.deck.setEBase();

        this.uiContainer = new PIXI.Container();
        this.deckset = new DeckShow(this.uiContainer,"R");
        this.deckset.deckSet(this.deck);

        this.hpBar = new HpBar(this.status.maxHp,this.uiContainer);
        this.hpBar.setGraphic();

        this.position = new Position();
        this.body = new Body();
        this.graphic = new PIXI.Container();
        this.converter = new ConvertPos();

        this.targetGraphic = new PIXI.Graphics();

        this.action = "move";
        this.actionPattern = new Array();
        this.actionFlame = 0;

        this.direction = "R";
        this.breaked = false;

        this.attackInfo = new AttackInfo();
        this.attacking = false;
        this.attackId = 0;
        this.attackFlame = 0;
        this.attackedE = new Array();

        this.cardIndex = 0;

        this.useLock = false;
    }
    setTest(){
        this.graphicMain = new PIXI.Graphics().rect(0,0,30,30).fill(0x222222);
        this.graphicShadow = new PIXI.Graphics().circle(0,0,15).fill(0x000000);
        //this.graphicShadow.scale.y = 0.7;
        //this.graphicShadow.y +=  (1-this.graphicShadow.scale.y)*30

        this.body.setBody(30,10,30);

        this.graphicMain.x -= 15;
        
        this.graphic.addChild(this.graphicShadow);
        this.graphic.addChild(this.graphicMain);

        this.targetGraphic = new PIXI.Graphics().poly([0,0,30,0,15,15]).fill(0x0000ff);
        this.targetGraphic.y = -40;

        this.targetGraphic.visible = false;

        this.graphicMain.addChild(this.targetGraphic);

        this.converter.convert(this);

        this.actionPattern = [["move",50],["attack",50]];
        //this.actionPattern = [["move",50]];
        
    }

    setPos(x,y,z){
        this.position.setPos(x,y,z);
        this.converter.convert(this);
    }

    addPos(x,y,z){
        this.position.addPos(x,y,z);
        this.converter.convert(this);
    }

    think(){
        if(this.actionFlame == 0){
            var num = 0;
            var randomNum = Math.random();

            for(var i = 0;i < this.actionPattern.length;i++){
                var data = this.actionPattern[i];
                num += data[1]/100;
                if(randomNum < num){
                    this.action = data[0];
                    //console.log(this.action);
                    break
                }
            }
        }
        else if(this.actionFlame >= 60){
            if(this.action == "attack" && this.selectCard(0).cardClass == "reload"){
                return 0;
            }
            else{
                console.log(this.action,this.selectCard(0).cardClass);
                this.actionFlame = 0;
                return 0
            }
        }
        this.actionFlame += 1;
    }

    selectCard(index){
        var i = this.deckset.getCardIndex(index);
        var card = this.deck.deck[i];
        return card;
    }

    damage(num){
        this.status.damage(num);
        this.hpBar.damage(num);
        console.log(this.status);
    }

    attack(){
        this.attackData = this.attackInfo.getInfo(0);
        this.attacking = true;   
    }

    destroy(){
        this.graphic.destroy({children : true});
        console.log(this.graphicShadow);
    }
}

export default Enemy;