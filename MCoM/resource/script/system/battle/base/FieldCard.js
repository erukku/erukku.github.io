class FieldCard{
    constructor(){
        this.fieldCard = null;
        this.cardOwner = null;
        this.cardSide = null;
        this.cardFn = null;
        this.cardHolder = null;
        this.flame = 0;
    }

    isExist(card,side,holder){
        //console.log(this.fieldCard == null && this.cardSide == null);
        if(this.fieldCard == null && this.cardSide == null){
            this.fieldCard = card;
            this.cardSide = side;
            this.cardHolder = holder;
            this.flame = 0;
            return true;
        }
        else{
            return false;
        }
    }


    checkCard(card,side,holder){

        if(card.cost > this.fieldCard.cost){
            //break preside
            
            //set side
            this.fieldCard = card;
            this.cardSide = side;
            this.cardHolder = holder;
            this.flame = 0;
            return true;
        }
        else{
            //continue
            return false;

        }

    }

    updateCard(card){
        this.fieldCard = card;
        this.flame = 0;
    }

    reset(){
        this.fieldCard = null;
        this.cardOwner = null;
        this.cardSide = null;
        this.cardFn = null;
        this.cardHolder = null;
        
        this.flame = 0;
    }

}


export default FieldCard