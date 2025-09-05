
import CardBase from "../card/CardBase.js"
import HpBar from "../ui/normal/player/HpBar.js"
import Deck from "../card/Deck.js"
import DeckShow from "../ui/battle/DeckShow.js"
import StageShow from "../ui/battle/StageShow.js"
import Player from "../system/battle/player/Player.js"

class ShopScene{
    constructor(player,enemyList,stage,key,onWay,app){
        this.player = player;

        this.itemSell = new Array();
        this.itemNum = 8;
    }

    prepareItem(){

        for(var i = 0;i < this.itemNum;i++){

        }

    }

    pickCard(){

    }

    selectCost(){
        //仮実装
        

    }


}

export default ShopScene;