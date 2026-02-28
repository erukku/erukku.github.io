class ShopShow{
    constructor(scene,player){
        this.scene = scene;
        this.shopUi = new PIXI.Container();

        this.scene.addChild(this.shopUi);

        this.itemList = null;
        this.itemGraphicContainer = new PIXI.Container();

        this.cersor = null;
        this.cersorPos = [0,0];
        this.assets = PIXI.Assets;

        this.player = player;
    }

    setBase(items){
        this.setItem(items);
        var base = new PIXI.Graphics().rect(0,0,400,200).fill(0x000000);
        this.shopUi.x = 120;
        this.shopUi.y = -200;

        this.shopUi.addChild(base);
        this.setItemGraphic();
        this.shopUi.addChild(this.itemGraphicContainer);

        this.exitBox = new PIXI.Graphics().rect(0,0,60,60).fill(0xffffff);
        this.exitBox.x = 320;
        this.exitBox.y = 120;

        this.shopUi.addChild(this.exitBox);

        this.playerCoin = new PIXI.Container();
        var coinGraphic = PIXI.Sprite.from('coin');
        coinGraphic.scale.x = coinGraphic.scale.y = 0.03;
        this.playerCoin.addChild(coinGraphic);

        var moneyText = new PIXI.Text(this.player.money,{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff});
        moneyText.x = 20;
        moneyText.y = 0;
        this.playerCoin.addChild(moneyText);

        this.playerCoin.x = 300;
        this.playerCoin.y = 10;
        
        this.shopUi.addChild(this.playerCoin);

        this.initSoldOutGraphic();
        this.setCersor();
        

    }

    setCersor(){
        this.cersor = new PIXI.Container();

        var rect = new PIXI.Graphics().rect(0,0,20,10).fill(0x444444);
        rect.rotation = (Math.PI / 4);

        this.cersor.addChild(rect);

        this.shopUi.addChild(this.cersor);
    }

    setCersorPos(x,y){
        this.cersorPos[0] = x;
        this.cersorPos[1] = y;
        //console.log(x,y);
    }

    setItem(items){
        this.itemList = items;
    }

    setItemGraphic(){

        this.itemGraphicList = new Array();

        for(var i = 0; i < this.itemList.length;i++){
            var cardGraphic = this.itemList[i][0].cardGraphic;
            cardGraphic.scale.x = cardGraphic.scale.y = 0.7;
            var container = new PIXI.Container();
            cardGraphic.x = 0;
            cardGraphic.y = 0;

            var coin = PIXI.Sprite.from('coin');
            coin.scale.x = coin.scale.y = 0.03;
            
            coin.y = 60;
            container.addChild(coin);

            var cost = new PIXI.Text(this.itemList[i][1],{fontFamily : 'Arial', fontSize: 24, fill : 0xffffff});
            cost.x = 20;
            cost.y = 55;
            if(i >= this.itemList.length/2){
                container.x = (i - this.itemList.length/2)*80;
                container.y = 80;
            }
            else{
                container.x = i * 80;
            
            }
            container.addChild(cardGraphic);
            container.addChild(cost);
            this.itemGraphicContainer.addChild(container);
            this.itemGraphicList.push(container);
        }

    }

    initSoldOutGraphic(){
        this.soldOutGraphicList = new Array();
        for(var i = 0; i < this.itemList.length;i++){
            var soldOutGraphic = PIXI.Sprite.from('soldout');
            soldOutGraphic.visible = false;   
            soldOutGraphic.scale.x = soldOutGraphic.scale.y = 0.12;
            //soldOutGraphic.width = 60;
            //soldOutGraphic.height = 60;
            this.itemGraphicList[i].addChild(soldOutGraphic);
            this.soldOutGraphicList.push(soldOutGraphic);
        }
    }

    visibleSoldOut(index){
        this.soldOutGraphicList[index].visible = true;
    }

    draw(){
        if(this.cersorPos[0] == 4){
            this.cersor.x = this.exitBox.x;
            this.cersor.y = this.exitBox.y;
        }
        else{
            this.cersor.x = this.itemGraphicContainer.getChildAt(this.cersorPos[0] + this.cersorPos[1]*4).x;
            this.cersor.y = this.itemGraphicContainer.getChildAt(this.cersorPos[0] + this.cersorPos[1]*4).y;
        }

        
    }


    //仮実装?
    delete(){
        for(var i = 0;i < this.itemGraphicList.length;i++){
            this.itemGraphicList[i].destroy();
        }
        this.shopUi.destroy();

    }

    updateMoney(){
        this.playerCoin.getChildAt(1).text = this.player.money;
    }

}

export default ShopShow