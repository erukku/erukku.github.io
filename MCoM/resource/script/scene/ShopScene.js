
import CardBase from "../card/CardBase.js"
import HpBar from "../ui/normal/player/HpBar.js"
import Deck from "../card/Deck.js"
import DeckShow from "../ui/battle/DeckShow.js"
import StageShow from "../ui/battle/StageShow.js"
import Player from "../system/battle/player/Player.js"
import RandomInt from "../util/RandomInt.js"
import ShopShow from "../ui/shop/ShowShow.js"

class ShopScene{
    constructor(player,enemyList,stage,key,onWay,app){
        this.player = player;

        this.itemSell = new Array();
        this.itemNum = 8;
        this.itemSoldOut = new Array();
        for(var i = 0;i < this.itemNum;i++){
            this.itemSoldOut.push(false);
        }

        this.keys = key[0];
        this.keyList = key;

        this.onWay = onWay;
        this.stage = stage;

        this.random = new RandomInt();

        this.endFlag = false;

        this.hol = 0;
        this.var = 0;

        this.ticker = PIXI.Ticker.shared;
        this.ticker.maxFPS = 60;

        this.flame = 0;
        this.inputflame = -100;
    }

    setTest(){
        var This = this;
        this.keyFn = function(time){
            This.turn();
        }
        this.ticker.add(this.keyFn);

        this.shopUi = new ShopShow(this.stage,this.player);

        this.prepareItem();
        this.shopUi.setBase(this.itemSell);

        this.cersor = [0,0];
        this.cersorLog = new Array();
    }

    shopEnd(){
        this.ticker.remove(this.keyFn);
        this.onWay.backOnWay();
    }

    turn(){
        this.flame += 1;
        //console.log("flame",this.flame)
        if(this.endFlag == true){
            this.shopUi.delete();

            this.player.deckset.initScale();
            this.shopEnd();
        }

        
        if(this.inputflame < this.flame){
            this.input();
        }
        this.shopUi.setCersorPos(this.cersor[0],this.cersor[1]);
        this.shopUi.draw();
        
    }

    input(){
        if(this.keyPressing("j")){
            this.cersorX(-1);
            this.inputflame = this.flame + 6;
        }
        if(this.keyPressing("l")){
            this.cersorX(1);
            this.inputflame = this.flame + 6;
        }
        if(this.keyPressing("k")){
            this.cersorY(1);
            this.inputflame = this.flame + 6;
        }
        if(this.keyPressing("i")){
            this.cersorY(-1);
            this.inputflame = this.flame + 6;
        }
        if(this.keyPressing("a")){
            this.enter();
            this.inputflame = this.flame + 6;
        }
    }

    cersorX(num){
        this.cersor[0] += num;
        if(this.cersor[0] < 0){
            this.cersor[0] = 0;
        }
        else if(this.cersor[0] > 4){
            this.cersor[0] = 4;
        }
    }

    cersorY(num){
        this.cersor[1] += num;
        if(this.cersor[1] < 0){
            this.cersor[1] = 0;
        }
        else if(this.cersor[1] > 1){
            this.cersor[1] = 1;
        }
    }

    enter(){
        if(this.cersor[0] == 4){
            this.endFlag = true;
        }
        else{
            //仮　price無視
            if(this.cersor[0] != 4 && this.canbuy() && (this.itemSoldOut[this.cersor[0] + 4*this.cersor[1]] == false)){
                this.player.money -= this.itemSell[this.cersor[0] + 4*this.cersor[1]][1];
                this.shopUi.updateMoney();
                this.shopUi.visibleSoldOut(this.cersor[0] + 4*this.cersor[1]);

                this.player.deck.addCard(this.itemSell[this.cersor[0] + 4*this.cersor[1]][0]);
                
                this.itemSoldOut[this.cersor[0] + 4*this.cersor[1]] = true;
                
                
            }
        }
    }

    //money実装したら
    canbuy(){
        return this.player.money >= this.itemSell[this.cersor[0] + 4*this.cersor[1]][1]
    }

    prepareItem(){

        this.itemSell = new Array();

        for(var i = 0;i < this.itemNum;i++){
            var card = this.pickCard();
            var cost = this.selectCost();
            card.setCost(cost);
            card.drawCard(cost);
            card.setSide("player");
            var price = this.selectPrice();

            this.itemSell.push([card,price]);
        }

    }

    pickCard(){
        var typeList = ["attack","magic","item"];

        var type = this.random.getRandomInt(0,typeList.length-1);

        var card = new CardBase(typeList[type]);
        

        return card;
    }

    selectCost(){
        //仮実装
        var cost = this.random.getRandomInt(1,9);
        return cost;
    }

    selectPrice(){
        //仮実装
        var price = this.random.getRandomInt(1,100);
        return price;
    }


    keyPressing(key){
        return this.keyList[1][key]
    }

}

export default ShopScene;