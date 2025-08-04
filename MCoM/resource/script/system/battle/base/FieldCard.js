class FieldCard{
    constructor(){
        this.fieldCard = null;
        this.cardOwner = null;
        this.cardSide = null;
        this.flame = 0;
    }

    checkCard(card,owner,side){
        if(this.fieldCard == null){
            this.fieldCard = card;
            this.cardOwner = owner;
            this.cardSide = side;
        }

        if(card.cost > this.fieldCard.cost){
            //break preside

            //set side
            this.fieldCard = card;
            this.cardOwner = owner;
            this.cardSide = side;
        }
        else{
            //continue

        }

    }

}


export default FieldCard