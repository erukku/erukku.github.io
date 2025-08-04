class CardAnimated{

    constructor(scene){
        this.Scene = scene;
        this.flame = 0;
        this.a = 0;

        this.xSpeed = 2;
        this.ySpeed = -10;

        this.breaked = false;
    }

    setSelf(a){
        this.a = a;
    }

    movecC(cards,i,goalX,goalY){
        var card = cards.deckList[i].cardGraphic
        if(card.x == goalX && card.y == goalY){
            //card.visible = false;
            
            if(this.breaked){
                cards.animateCard.remove(this.a);
                var This = this;
                var fn = function(time){
                    This.drop(cards,i,"");
                }
                this.a = fn;
                cards.animateCard.add(fn);
                return 0;
            }
            

            if(this.flame == 20){
                card.x = -100;
                card.y = -100;
                cards.animateCard.remove(this.a);
                this.flame = 0;
            }
            this.flame += 1; 
        }
        else if(Math.abs(card.x - goalX) <= 3 && Math.abs(card.y - goalY) <= 3){
            card.x = goalX;
            card.y = goalY;
        }
        else{
            card.x += (goalX - card.x)/10
            card.y += (goalY - card.y)/10
        }
    }


    drop(cards,i,side){
        var card = cards.deckList[i].cardGraphic
        if(this.flame <= 20){
            card.x -= this.xSpeed;
            card.y += this.ySpeed;
            this.ySpeed += 2;
        }
        else{
            card.x = -100;
            card.y = -100;
            cards.animateCard.remove(this.a);
            this.flame = 0;
        }
        this.flame += 1;
        

    }

}

export default CardAnimated;