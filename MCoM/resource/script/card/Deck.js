import CardBase from "./CardBase.js"
class Deck{
    deck;

    constructor(){
        this.deck = [];
    }

    setBase(){
        var num = 0; 
        for(var i = 0;i < 10;i++){
        var atCard = new CardBase("attack");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);
        }
        var atCard = new CardBase("magic");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);

        var atCard = new CardBase("item");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);

        var atCard = new CardBase("special");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);

        var atCard = new CardBase("reload");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);
    }

    setEBase(){
        var num = 0; 
        for(var i = 0;i < 10;i++){
        var atCard = new CardBase("attack");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);
        }
        var atCard = new CardBase("reload");
        atCard.setBaseInfo(num,num);
        num += 1;
        atCard.drawCard();
        this.deck.push(atCard);
    }

    load(data){

    }

}

export default Deck;