class FieldCard{
    constructor(){
        this.fieldCard = null;
        this.cardOwner = null;
        this.cardSide = null;
        this.cardFn = null;
        this.flame = 0;
    }

    isExist(card,side){
        //console.log(this.fieldCard == null && this.cardSide == null);
        if(this.fieldCard == null && this.cardSide == null){
            this.fieldCard = card;
            this.cardSide = side;
            return true;
        }
        else{
            return false;
        }
    }


    checkCard(card,side){

        if(card.cost > this.fieldCard.cost){
            //break preside
            
            //set side
            this.fieldCard = card;
            this.cardSide = side;
            return true;
        }
        else{
            //continue
            return false;

        }

    }

    reset(){
        this.fieldCard = null;
        this.cardOwner = null;
        this.cardSide = null;
        
        this.flame = 0;
    }

}


export default FieldCard