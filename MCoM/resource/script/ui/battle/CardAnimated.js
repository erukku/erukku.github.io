class CardAnimated{

    constructor(allFlame,audio){
        //this.Scene = scene;
        this.flame = 0;
        this.allFlame = allFlame;
        this.a = 0;

        this.xSpeed = 2;
        this.ySpeed = -10;

        this.breaked = false;

        this.audio = audio;
    }

    setSelf(a){
        this.a = a;
    }

    movecC(cards,basecard,goalX,goalY){
        var card = basecard.cardGraphic;
        if(basecard.side == "enemy"){
            card.visible = true;
        }
        //console.log(i)
        if(card.x == goalX && card.y == goalY){
            //card.visible = false;
            
            if(this.breaked){
                this.audio.currentTime = 0;

                this.audio.play();
                cards.animateCard.remove(this.a);
                var This = this;
                var fn = function(time){
                    This.drop(cards,basecard,"");
                }
                this.a = fn;
                cards.animateCard.add(this.a);
                return 0;
            }
            

            if(this.flame == this.allFlame){
                card.x = -1000;
                card.y = -1000;
                if(basecard.side == "enemy"){
                    card.visible = false;
                }
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
            //console.log(card.x,card.y)
        }
    }


    drop(cards,basecard,side){
        var card = basecard.cardGraphic

        var xSpeed = this.xSpeed;
        var ySpeed = this.ySpeed;
        if(side == "L"){
            xSpeed *= -1;
        }
        
        if(this.flame <= 20){
            card.x -= xSpeed;
            card.y += ySpeed;
            this.ySpeed += 2;
        }
        else{
            if(basecard.side == "enemy"){
                card.visible = false;
            }
            card.x = -1000;
            card.y = -1000;
            cards.animateCard.remove(this.a);
            this.flame = 0;
        }
        this.flame += 1;
    }

    

}

export default CardAnimated;