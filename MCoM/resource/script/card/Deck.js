import CardBase from "./CardBase.js"
import RandomInt from "../util/RandomInt.js";
class Deck{
    deck;

    constructor(){
        this.deck = [];
        this.rand = new RandomInt();
    }

    setBase(){
        var num = 0; 
        for(var i = 0;i < 10;i++){
        var atCard = new CardBase("attack");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard(5);
        atCard.setSide("player");
        this.deck.push(atCard);
        }
        var atCard = new CardBase("magic");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard(5);
        atCard.setSide("player");
        this.deck.push(atCard);

        var atCard = new CardBase("item");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        atCard.setSide("player");
        this.deck.push(atCard);

        var atCard = new CardBase("special");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        atCard.setSide("player");
        this.deck.push(atCard);

        var atCard = new CardBase("reload");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        atCard.setSide("player");
        this.deck.push(atCard);
    }

    setEBase(){
        var num = 0; 
        for(var i = 0;i < 10;i++){
        var atCard = new CardBase("attack");
        atCard.setBaseInfo(num,num);
        //atCard.cost = this.rand.getRandomInt(1,9);
        num += 1;
        atCard.drawCard(this.rand.getRandomInt(1,9));
        atCard.setSide("enemy");
        this.deck.push(atCard);
        }
        var atCard = new CardBase("reload");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        atCard.setSide("enemy");
        this.deck.push(atCard);
    }


    addCard(card){
        this.deck.push(card);
    }

    load(data){

    }

}

export default Deck;