import Deck from "../../card/Deck.js"
import DefaultDict from "../../util/DefaultDict.js"
import CardAnimated from "./CardAnimated.js"
import CardBase from "../../card/CardBase.js";

class DeckShow{
    deckList;
    scene;
    deckCircle;

    cost;
    costGraphic;

    deckSum;
    R;

    keepCard;
    usedCard;
    excludedCard;

    keepCardNum;
    usedCardNum;
    excludedCardNum;

    animateCard;



    constructor(scene,side,master){
        this.R = 80;
        this.pushcount = 0;
        this.deckList;
        this.scene = scene;
        this.deckCircle = new PIXI.Container();
        this.deckCircle.sortableChildren = true;
        this.cardScale = 1;

        this.master =master;

        this.cost = 0;
        this.costGraphic = new PIXI.Text(this.cost, {fontFamily : 'Arial', fontSize: 24, fill : 0xffffff} );
        this.costGraphic.visible = false;

        this.deckCircle.addChild(this.costGraphic);

        this.scene.addChild(this.deckCircle);

        this.keepCard = new DefaultDict(false);
        this.usedCard = new DefaultDict(false);
        this.excludedCard = new DefaultDict(false);

        this.keepCardArray = new Array();

        this.keepCardNum = 0;
        this.usedCardNum = 0;
        this.excludedCardNum = 0;

        this.startangle = - (45/180 * Math.PI);

        this.animateCard = PIXI.Ticker.shared;
        this.animateCard.start();

        this.rolling = false;
        this.rollFlame = 0;
        this.rollFn = 0;

        this.side = side;
        if(this.side == "R"){
            this.startangle = - (135/180 * Math.PI);
        }

        this.audioDict = new DefaultDict(null);

        this.audioDict["roll"] = new Audio("MCoM/resource/se/deckmove.mp3");
        this.audioDict["waste"] = new Audio("MCoM/resource/se/waste.mp3");
        this.audioDict["use"] = new Audio("MCoM/resource/se/use.mp3");
    }

    deckSet(deck){
        this.deckList = deck.deck;

        this.deckSum = this.deckList.length;

        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        
        for(var i = 0;i < this.deckList.length;i++){
            this.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+i * (360/circleCardNum) * (Math.PI/180));
            this.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+i * (360/circleCardNum) * (Math.PI/180));
            this.deckCircle.addChild(this.deckList[i].cardGraphic) 
            if(this.side == "R"){
                this.deckList[i].cardGraphic.visible = false;   
            }
            if(i == 0){
                if(this.side == "L"){
                    this.deckList[i].cardGraphic.x += 50;
                }
                else{
                    this.deckList[i].cardGraphic.x -= 50;
                }
                this.deckList[i].cardGraphic.y -= 50;
            }  
        }
        
        this.deckCircle.x = -30;
        
        if(this.side == "R"){
            this.deckCircle.x += 640 + 30; 
        }

        this.deckCircle.y = 330;    

    }

    deckInit(){
        this.pushcount = 1;

        this.keepCardNum = 0;
        this.usedCardNum = 0;
        this.excludedCardNum = 0;

        this.keepCard = new DefaultDict(false);
        this.usedCard = new DefaultDict(false);
        this.excludedCard = new DefaultDict(false);

        this.move("L");
    }

    isDeck(i){
        return this.excludedCard[this.deckList[i].getCardIds()] || this.usedCard[this.deckList[i].getCardIds()] || this.keepCard[this.deckList[i].getCardIds()]
    }

    move(way){
        if(this.rolling){

        }
        else{
            this.audioDict["roll"].currentTime = 0;
            this.audioDict["roll"].play();
            if(way == "R"){
                var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
                this.pushcount %= (circleCardNum);
                this.pushcount += 1;
                this.pushcount %= (circleCardNum);
                var This = this;
                this.rolling = true;
                this.rollFn = function(time){This.rollR(This,circleCardNum);}
                this.animateCard.add(
                    this.rollFn
                )
            }
            else if(way == "L"){
                var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
                this.pushcount %= (circleCardNum);
                this.pushcount += circleCardNum-1;
                this.pushcount %= (circleCardNum);
                
                var This = this;
                this.rolling = true;
                this.rollFn = function(time){This.roll(This,circleCardNum);}
                this.animateCard.add(
                    this.rollFn
                )
            }
        }
    }

    use(){
        if(this.rolling){
            return 0;
        }

        if(this.keepCardNum == 3){
            this.keepUse();
            return 0;
        }
        this.audioDict["use"].currentTime = 0;
        this.audioDict["use"].play();
        var count = 0
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < this.deckList.length;i++){
            if(this.isDeck(i)){
                continue;
            }
            var ii = count + this.pushcount;
            ii %= (circleCardNum)
            ii += circleCardNum
            ii %= circleCardNum
            if(ii == 0){
                if(this.deckList[i].cardClass == "reload"){
                    if(this.deckList[i].costText.text == 0){
                        this.deckList[i].afterReload();
                        this.reload();
                        return 0;
                    }
                    this.deckList[i].chargeReload()
                    return 0;
                }
            }
            count += 1;
        }

        if(this.attacking)

        //this.usedCardNum += 1;

        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var count = 0;
        this.pushcount %= (circleCardNum+1);
        
        var a = null;
        for(var i = 0;i < this.deckList.length;i++){
            if(this.isDeck(i)){
                continue;
            }

            var ii = count + this.pushcount;
            ii %= (circleCardNum );
            ii += circleCardNum;

            //console.log(ii % circleCardNum);
            if(ii % (circleCardNum) == 0){
                var po = this.deckList;
                var test = this;
                var index = i;
                //var data = this.master.getAttackInfo(index);
                
                var animate = new CardAnimated(this.master.cardAllFlame,this.audioDict["waste"]);
                //console.log(index,ii % (circleCardNum+1) == 0);
                //this.a = function(time){test.movecC(test,index,300,-80,this);}
                if(this.side == "R"){
                    var a = function(time){animate.movecC(test,po[index],-300,-80,this);}
                }
                else{
                    var a = function(time){animate.movecC(test,po[index],300,-80,this);}
                }
                
                animate.setSelf(a);
                this.animateCard.add(a);

                //this.deckList[i].cardGraphic.x = 300;
                //this.deckList[i].cardGraphic.y = -80;
                
                //console.log(this.deckList[i]);
                this.usedCard[this.deckList[i].getCardIds()] = true;
                count += 1;

                
                continue;
            }

            count += 1;
        }
        this.usedCardNum += 1;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var This = this;
        this.rolling = true;
        this.rollFn = function(time){This.rollFill(This,circleCardNum);}
        this.animateCard.add(
            this.rollFn
        )
        
        return a;
    }

    waste(){
        if(this.rolling){
            return 0;
        }
        var count = 0
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < this.deckList.length;i++){
            if(this.isDeck(i)){
                continue;
            }
            var ii = count + this.pushcount;
            ii %= (circleCardNum)
            ii += circleCardNum
            ii %= circleCardNum
            if(ii == 0){
                if(this.deckList[i].cardClass == "reload"){
                    if(this.deckList[i].costText.text == 0){
                        this.deckList[i].afterReload();
                        this.reload();
                        return 0;
                    }
                    this.deckList[i].chargeReload()
                    return 0;
                }
            }
            count += 1;
        }

        if(this.attacking)

        //this.usedCardNum += 1;
        //this.audioDict["waste"].currentTime = 0;
        //this.audioDict["waste"].play();

        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var count = 0;
        this.pushcount %= (circleCardNum+1);
        
        for(var i = 0;i < this.deckList.length;i++){
            if(this.isDeck(i)){
                continue;
            }

            var ii = count + this.pushcount;
            ii %= (circleCardNum );
            ii += circleCardNum;

            //console.log(ii % circleCardNum);
            if(ii % (circleCardNum) == 0){
                var po = this.deckList;
                var test = this;
                var index = i;
                var animate = new CardAnimated(0,this.audioDict["waste"]);
                animate.breaked = true;
                //console.log(index,ii % (circleCardNum+1) == 0);
                //this.a = function(time){test.movecC(test,index,300,-80,this);}
                if(this.side == "R"){
                    var a = function(time){animate.movecC(test,po[index],-300,-80,this);}
                }
                else{
                    var a = function(time){animate.movecC(test,po[index],300,-80,this);}
                }
                
                animate.setSelf(a);
                this.animateCard.add(a);

                //this.deckList[i].cardGraphic.x = 300;
                //this.deckList[i].cardGraphic.y = -80;
                
                
                this.usedCard[this.deckList[i].getCardIds()] = true;
                count += 1;

                
                continue;
            }

            count += 1;
        }
        this.usedCardNum += 1;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var This = this;
        this.rolling = true;
        this.rollFn = function(time){This.rollFill(This,circleCardNum);}
        this.animateCard.add(
            this.rollFn
        )

        
      
    }
    keep(){
        if(this.rollFlame != 0 || this.keepCardNum == 3){
            
            return 0;
        }

                
        var count = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        this.pushcount %= (circleCardNum);
        this.pushcount += (circleCardNum);
        this.pushcount %= (circleCardNum);
        for(var i = 0;i < this.deckList.length;i++){
            //console.log(this.isDeck(i));
            if(this.isDeck(i)){
                continue;
            }

            var ii = count + this.pushcount;
            ii %= circleCardNum;
            ii += circleCardNum;
            
            if(ii % (circleCardNum) == 0 && this.deckList[i].cardClass == "reload"){
                return 0;
            }
            count += 1;
        }
        this.keepCardNum += 1;

        var count = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        this.pushcount %= (circleCardNum+1);
        for(var i = 0;i < this.deckList.length;i++){
            //console.log(this.isDeck(i));
            if(this.isDeck(i)){
                continue;
            }

            var ii = count + this.pushcount;
            
            if(ii % (circleCardNum+1) == 0){
                this.deckList[i].cardGraphic.x = 120 + (this.keepCardNum * 30);
                this.deckList[i].cardGraphic.y = -280;
                this.deckList[i].cardGraphic.scale.x = this.deckList[i].cardGraphic.scale.y = 0.4;

                this.costGraphic.visible = true;
                this.cost += this.deckList[i].cost;
                this.costGraphic.text = this.cost;
                this.costGraphic.x = 120 + ((this.keepCardNum+1) * 30);
                this.costGraphic.y = -280;
                this.keepCard[this.deckList[i].getCardIds()] = true;
                this.keepCardArray.push(this.deckList[i]);


                count += 1;
                
                continue;
            }

           count += 1;
        }

        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var This = this;
        this.rolling = true;
        this.rollFn = function(time){This.rollFill(This,circleCardNum);}
        this.animateCard.add(
            this.rollFn
        )


    }


    keepUse(){

        var container = new PIXI.Container();


        var array = new Array();

        for(var i = 0 ; i < this.keepCardNum;i++){
            var card = this.keepCardArray.pop();
            this.keepCard[card.getCardIds()] = false;

            card.cardGraphic.x = -10000;
            card.cardGraphic.y = -10000;
            card.cardGraphic.scale.x = card.cardGraphic.scale.y = 1;
            array.push(card);
        }
        
        for(var i = 0 ; i < this.keepCardNum;i++){
            var card = array.pop();
            
            this.usedCard[card.getCardIds()] = true;

            card.cardGraphic.x = -50 + i * 30;
            card.cardGraphic.y = 0;
            card.cardGraphic.scale.x = card.cardGraphic.scale.y = 1;

            card.cardGraphic.zIndex = 100-i;
            container.addChild(card.cardGraphic);
        }

        this.keepCardNum = 0;

        //仮
        var multiCard = new CardBase("attack");
        multiCard.cost = this.cost;
        multiCard.cardGraphic = container;

        this.deckCircle.addChild(multiCard.cardGraphic);

        multiCard.cardGraphic.x = this.R*Math.cos(this.startangle);
        multiCard.cardGraphic.y = this.R*Math.sin(this.startangle);

        
        if(this.side == "L"){
            multiCard.cardGraphic.x += 50;
        }
        else{
            multiCard.cardGraphic.x -= 50;
        }
        multiCard.cardGraphic.y -= 50;
        

        var po = this.deckList;
        var test = this;
        var animate = new CardAnimated(this.master.cardAllFlame,this.audioDict["waste"]);
        //console.log(index,ii % (circleCardNum+1) == 0);
        //this.a = function(time){test.movecC(test,index,300,-80,this);}
        if(this.side == "R"){
            var a = function(time){animate.movecC(test,multiCard,-300,-80,this);}
        }
        else{
            var a = function(time){animate.movecC(test,multiCard,300,-80,this);}
        }
        
        animate.setSelf(a);
        this.animateCard.add(a);
        
        
        this.costGraphic.visible = false;
        this.cost = 0;
        this.costGraphic.text = this.cost;

    
    }

    keepWaste(){

        for(var i = 0 ; i < this.keepCardArray.length;i++){
            var card = this.keepCardArray.pop();
            this.keepCard[card.getCardIds()] = false;
            this.usedCard[card.getCardIds()] = true;

            card.cardGraphic.x = -10000;
            card.cardGraphic.y = -10000;
            card.cardGraphic.scale.x = this.deckList[i].cardGraphic.scale.y = 1;

            this.keepCardNum -= 1;
        }

        this.costGraphic.visible = false;
        this.cost = 0;
        this.costGraphic.text = this.cost;
        
    }

    alluse(){
        for(var i = 0;i < this.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            if(this.deckList[i].cardClass != "reload"){
                this.deckList[i].cardGraphic.x = -100;
                this.deckList[i].cardGraphic.y = -100;

                this.usedCard[this.deckList[i].getCardIds()] = true;
                this.usedCardNum += 1;
            }
        }
    }

    reload(){
        this.pushcount = 0;
        var po = this.deckList;
        var test = this;
        this.rolling = true;
        for(var i = 0;i < this.deckList.length;i++){
            if (this.excludedCard[this.deckList[i].getCardIds()] && this.keepCard[this.deckList[i].getCardIds()]){
                continue
            }
            this.deckList[i].cardGraphic.x = this.deckList[i].cardGraphic.y = +1000;
            this.usedCard[this.deckList[i].getCardIds()] = false;

        }
        this.usedCardNum = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        this.rollFn = function(time){test.rollAll(test,circleCardNum);}
        
        
        
        this.animateCard.add(this.rollFn)
        

    }

    rollAll(cards,circleCardNum){
        var count = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < cards.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            
            var ii = count;
            ii %= circleCardNum;
            if(ii <= this.rollFlame/5){
                cards.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+(ii - this.rollFlame/5) * (360/circleCardNum) * (Math.PI/180));
                cards.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+(ii - this.rollFlame/5) * (360/circleCardNum) * (Math.PI/180));
            }
            
            //console.log(ii % circleCardNum)
            if((ii % circleCardNum == 0) && this.rollFlame >= 5*circleCardNum){
                cards.deckList[i].cardGraphic.x += 50;
                cards.deckList[i].cardGraphic.y -= 50;
            }
            count += 1;
        }
        if(this.rollFlame == 5*circleCardNum){
            cards.animateCard.remove(this.rollFn);
            this.rollFlame = 0;
            this.rolling = false;
            return 0;
        }
        this.rollFlame += 1;
    }

    roll(cards,circleCardNum){
        var count = 0;
        
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < cards.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            
            //var ii = count + (this.pushcount + circleCardNum - 1);
            var ii = count + (this.pushcount );
            ii %= circleCardNum;
            ii += circleCardNum;
            cards.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+(ii + 1 - this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            cards.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+(ii + 1 - this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            //console.log(ii % circleCardNum)
            if((ii % circleCardNum == 0) && this.rollFlame >= 10){
                
                if(this.side == "L"){
                    this.deckList[i].cardGraphic.x += 50;
                }
                else{
                    this.deckList[i].cardGraphic.x -= 50;
                }
                cards.deckList[i].cardGraphic.y -= 50;
            }
            count += 1;
        }
        if(this.rollFlame == 10){
            cards.animateCard.remove(this.rollFn);
            this.rollFlame = 0;
            this.rolling = false;
            return 0;
        }
        this.rollFlame += 1;
    }

    rollR(cards,circleCardNum){
        var count = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < cards.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            var ii = count + this.pushcount;
            ii %= circleCardNum;
            ii += circleCardNum;
            cards.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+(ii - 1+ this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            cards.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+(ii - 1 + this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            
            if((ii % circleCardNum == 0) && this.rollFlame >= 10){
                
                if(this.side == "L"){
                    this.deckList[i].cardGraphic.x += 50;
                }
                else{
                    this.deckList[i].cardGraphic.x -= 50;
                }
                cards.deckList[i].cardGraphic.y -= 50;
            }
            count += 1;
        }
        //console.log(this.rollFlame);
        if(this.rollFlame == 10){
            cards.animateCard.remove(this.rollFn);
            this.rollFlame = 0;
            this.rolling = false;
            return 0;
        }
        this.rollFlame += 1;

    }

    rollFill(cards,circleCardNum){
        var count = 0;
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < cards.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            var ii = count + this.pushcount;
            ii %= circleCardNum;
            ii += circleCardNum;
            ii %= circleCardNum;
            cards.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+(ii) * (360/(circleCardNum)) * (Math.PI/180));
            cards.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+(ii) * (360/(circleCardNum)) * (Math.PI/180));
            
            if((ii % circleCardNum == 0)){
                
                if(this.side == "L"){
                    this.deckList[i].cardGraphic.x += 50;
                }
                else{
                    this.deckList[i].cardGraphic.x -= 50;
                }
                cards.deckList[i].cardGraphic.y -= 50;
            }
            count += 1;
        }
        //console.log(this.rollFlame);
        if(this.rollFlame == 0){
            cards.animateCard.remove(this.rollFn);
            this.rollFlame = 0;
            this.rolling = false;
            return 0;
        }
        this.rollFlame += 1;

    }

    getCardIndex(){
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        var index = 0;

        var i = 0;
        for(var i = 0;i < this.deckList.length;i++){
            if(this.isDeck(i)){
                continue
            }
            if((index + this.pushcount)%circleCardNum == 0){
                break;
            }
            index += 1;
        }
        

        return i 
    }

    destroy(){
        this.deckCircle.visible = false;
    }


    initScale(){
        for(var i = 0;i < this.deckList.length;i++){
            this.deckList[i].cardGraphic.scale.x = this.deckList[i].cardGraphic.scale.y = 1;
        }

    }


    roll(cards,circleCardNum){
        var count = 0;
        
        var circleCardNum =  this.deckList.length - this.keepCardNum - this.usedCardNum - this.excludedCardNum;
        for(var i = 0;i < cards.deckList.length;i++){
            if (this.isDeck(i)){
                continue
            }
            
            //var ii = count + (this.pushcount + circleCardNum - 1);
            var ii = count + (this.pushcount );
            ii %= circleCardNum;
            ii += circleCardNum;
            cards.deckList[i].cardGraphic.x = this.R*Math.cos(this.startangle+(ii + 1 - this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            cards.deckList[i].cardGraphic.y = this.R*Math.sin(this.startangle+(ii + 1 - this.rollFlame/10) * (360/circleCardNum) * (Math.PI/180));
            //console.log(ii % circleCardNum)
            if((ii % circleCardNum == 0) && this.rollFlame >= 10){
                
                if(this.side == "L"){
                    this.deckList[i].cardGraphic.x += 50;
                }
                else{
                    this.deckList[i].cardGraphic.x -= 50;
                }
                cards.deckList[i].cardGraphic.y -= 50;
            }
            count += 1;
        }
        if(this.rollFlame == 10){
            cards.animateCard.remove(this.rollFn);
            this.rollFlame = 0;
            this.rolling = false;
            return 0;
        }
        this.rollFlame += 1;
    }

    displayOpening(){
        var count = 0;
        
        var This = this;

        var circleCardNum =  this.deckList.length;

        var cards = this;

        this.rollFlame = 120;

        var flame = 0;

        
        this.rollFn = function(){
            var count = 0;
            for(var i = 0;i < cards.deckList.length;i++){
                cards.deckList[i].cardGraphic.scale.x = cards.deckList[i].cardGraphic.scale.y = 2; 
                var ii = count;
                
                cards.deckList[i].cardGraphic.x = This.R*Math.cos(This.startangle+(ii + 1 - This.rollFlame/60) * (360/circleCardNum) * (Math.PI/180));
                cards.deckList[i].cardGraphic.y = This.R*Math.sin(This.startangle+(ii + 1 - This.rollFlame/60) * (360/circleCardNum) * (Math.PI/180));

                count += 1;

            }

            This.rollFlame += 1;

        }
        

    }

    startDisplay(deck){
        this.deckScaleSet(2);
        this.deckSet(deck);
        this.ticker = PIXI.Ticker.shared;
        this.ticker.maxFPS = 60;
        this.displayOpening();
        var This = this;
        this.ticker.add(This.rollFn);
        
    }

    stopDisplay(){
        this.ticker.remove(this.rollFn);
    }

    deckScaleSet(num){
        this.cardScale = num;
        this.R *= 2;
    }


    
}

export default DeckShow;