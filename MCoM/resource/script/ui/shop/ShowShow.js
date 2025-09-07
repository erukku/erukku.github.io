class ShopShow{
    constructor(scene){
        this.scene = scene;
        this.shopUi = new PIXI.Container();

        this.scene.addChild(this.shopUi);

        this.itemList = null;
        this.itemGraphicContainer = new PIXI.Container();
        
    }

    setBase(items){
        this.setItem(items);
        var base = new PIXI.Graphics().rect(0,0,400,200).fill(0x000000);
        this.shopUi.x = 120;
        this.shopUi.y = -200;

        this.shopUi.addChild(base);
        this.setItemGraphic();
        this.shopUi.addChild(this.itemGraphicContainer);

    }

    setItem(items){
        this.itemList = items;
    }

    setItemGraphic(){

        this.itemGraphicList = new Array();

        for(var i = 0; i < this.itemList.length;i++){
            var cardGraphic = this.itemList[i][0].cardGraphic;
            var container = new PIXI.Container();
            cardGraphic.x = 0;
            cardGraphic.y = 0;

            var cost = new PIXI.Text(this.itemList[i][1],{fontFamily : 'Arial', fontSize: 24, fill : 0x111111});
            cost.x = 10;
            cost.y = 50;
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
        }

    }

    draw(){

    }

    delete(){
        this.shopUi.destroy();
    }

}

export default ShopShow