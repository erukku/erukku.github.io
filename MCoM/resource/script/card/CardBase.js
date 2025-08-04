class CardBase{
    
    cardClass;
    cardId;
    cardDeckId;
    cardGraphic;
    type;
    cost;

    constructor(type){
        this.cardClass = type;
        
        this.reloadBase = 1;
        this.reloadChanged = 1;
        this.reloadFlame = 0;

    }

    setBaseInfo(cardId,cardDeckId){
        this.cardId = cardId;
        this.cardDeckId = cardDeckId;
    }

    getCardIds(){
        return String(this.cardId) + String(this.cardDeckId);
    }

    chargeReload(){
        this.reloadFlame += 1;
        var chargePar = this.reloadFlame % 30;
        //this.chargeCard.clear().rect(54 - 54*(1-chargePar/30),74-74*(1-chargePar/30),54,74).fill(0xffffff);
        this.chargeCard.scale.y = chargePar/30;
        if(this.reloadFlame / 30 >= 1 && chargePar == 0){
            this.costText.text = this.reloadChanged - Math.floor(this.reloadFlame/30);
        }

    }

    afterReload(){
        this.reloadChanged += 1;
        this.costText.text = this.reloadChanged;
        this.reloadFlame = 0;
        this.chargeCard.scale.y = 0;
    }

    drawCard(cost = 3){
        (async () =>{
        this.cardGraphic = new PIXI.Container();
        this.cost = cost;
        
        switch (this.cardClass) {
            case 'attack':
                
                var bottomCard = new PIXI.Graphics().rect(0,0,60,80).fill(0xff0000);
                var costFlame =  new PIXI.Graphics().circle(60,0,30).stroke({width:3,color:0xff0000});

                var image = await PIXI.Assets.load("MCoM/resource/img/sword.png");
        
        
                var cardIcon = new PIXI.Sprite(image);
                cardIcon.scale.x = cardIcon.scale.y = 0.06;
                cardIcon.y += 18;

                break
            case 'item':
                var bottomCard = new PIXI.Graphics().rect(0,0,60,80).fill(0x00ff00);
                var costFlame =  new PIXI.Graphics().circle(60,0,30).stroke({width:3,color:0x00ff00});
                
                var image = await PIXI.Assets.load("MCoM/resource/img/medical.png");
        
        
                var cardIcon = new PIXI.Sprite(image);
                cardIcon.scale.x = cardIcon.scale.y = 0.13;
                cardIcon.y += 20;
                cardIcon.x += 5;
                break
            case 'magic':
                var bottomCard = new PIXI.Graphics().rect(0,0,60,80).fill(0x0000ff);
                var costFlame =  new PIXI.Graphics().circle(60,0,30).stroke({width:3,color:0x0000ff});
                var image = await PIXI.Assets.load("MCoM/resource/img/boushi.png");
        
        
                var cardIcon = new PIXI.Sprite(image);
                cardIcon.scale.x = cardIcon.scale.y = 0.06;
                cardIcon.y += 18;
                break
            case 'special':
                var bottomCard = new PIXI.Graphics().rect(0,0,60,80).fill(0xbbbbbb);
                var costFlame =  new PIXI.Graphics().circle(60,0,30).stroke({width:3,color:0xbbbbbb});
                break
            case 'reload':
                var bottomCard = new PIXI.Graphics().rect(0,0,60,80).fill(0x000000);
                break
            } 

        if(this.cardClass == "reload"){
            let whiteCard = new PIXI.Graphics().rect(0,0,54,74).fill(0x444444);
            this.chargeCard =  new PIXI.Graphics().rect(0,0,54,74).fill(0xffffff);
            whiteCard.x += 3;
            whiteCard.y += 3;
            this.chargeCard.x += 3;
            this.chargeCard.y += 3;
            this.chargeCard.scale.y = 0;
            this.cardGraphic.addChild(bottomCard);
            this.cardGraphic.addChild(whiteCard);
            this.cardGraphic.addChild(this.chargeCard);

            this.costText = new PIXI.Text(1, {fontFamily : 'Arial', fontSize: 40, fill : 0x111111})
            this.cardGraphic.addChild(this.costText);

            this.costText.x += 18;
            this.costText.y = 20;

            return 0;
        }

        let whiteCard = new PIXI.Graphics().rect(0,0,54,74).fill(0xffffff);

        whiteCard.x += 3;
        whiteCard.y += 3;

        this.cardGraphic.addChild(bottomCard);
        this.cardGraphic.addChild(whiteCard);

        let maskCon = new PIXI.Container();
        maskCon.addChild(costFlame);
        let cardMask = new PIXI.Graphics().rect(0,0,60,80).fill(0x000000);
        maskCon.addChild(cardMask)
        maskCon.mask = cardMask;
        this.cardGraphic.addChild(maskCon);

        

        switch(this.cardClass){
            case "attack":
                this.cardGraphic.addChild(cardIcon);
                break
            case "magic":
                this.cardGraphic.addChild(cardIcon);
                break
            case "item":
                this.cardGraphic.addChild(cardIcon);
                break
        }

        let costText = new PIXI.Text(cost, {fontFamily : 'Arial', fontSize: 24, fill : 0x111111})
        this.cardGraphic.addChild(costText);
        costText.x += 38;
        costText.y += 2;
    })();
    }

}

export default CardBase;