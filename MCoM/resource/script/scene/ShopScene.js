
import CardBase from "../card/CardBase.js"
import HpBar from "../ui/normal/player/HpBar.js"
import Deck from "../card/Deck.js"
import DeckShow from "../ui/battle/DeckShow.js"
import StageShow from "../ui/battle/StageShow.js"
import Player from "../system/battle/player/Player.js"
import RandomInt from "../util/RandomInt.js"
import ShopShow from "../ui/shop/showShow.js"

class ShopScene{
    constructor(player,enemyList,stage,key,onWay,app){
        this.player = player;

        this.itemSell = new Array();
        this.itemNum = 8;

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

    }

    setTest(){
        var This = this;
        this.keyFn = function(time){
            This.turn();
        }
        this.ticker.add(this.keyFn);

        this.shopUi = new ShopShow(this.stage);

        this.prepareItem();
        this.shopUi.setBase(this.itemSell);
    }

    shopEnd(){
        this.ticker.remove(this.keyFn);
        this.onWay.backOnWay();
    }

    turn(){
        //this.flame += 1;
        //console.log("flame",this.flame)
        if(this.endFlag == true){
            this.flagEnd();
        }
        
    }

    input(){
        if(this.keyPressing("j")){

        }
        if(this.keyPressing("l")){

        }
    }



    prepareItem(){

        this.itemSell = new Array();

        for(var i = 0;i < this.itemNum;i++){
            var card = this.pickCard();
            var cost = this.selectCost();
            card.setCost(cost);
            card.drawCard(cost);
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
        return 0;
    }


    keyPressing(key){
        return this.keyList[1][key]
    }

}

export default ShopScene;