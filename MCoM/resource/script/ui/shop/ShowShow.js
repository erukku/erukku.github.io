class ShopShow{
    constructor(scene){
        this.scene = scene;
        this.shopUi = new PIXI.Container();

        this.scene.addChild(this.shopUi);

        this.itemList = null;
        this.itemGraphicContainer = new PIXI.Container();

        this.cersor = null;
        this.cersorPos = [0,0];
        
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
        if(this.cersorPos[0] == 4){
            this.cersor.x = this.exitBox.x;
            this.cersor.y = this.exitBox.y;
        }
        else{
            this.cersor.x = this.itemGraphicContainer.getChildAt(this.cersorPos[0] + this.cersorPos[1]*4).x;
            this.cersor.y = this.itemGraphicContainer.getChildAt(this.cersorPos[0] + this.cersorPos[1]*4).y;
        }

        
    }


    //仮実装
    delete(){
        this.shopUi.x = -10000;
        this.shopUi.y = -10000;
        //this.shopUi.destroy();
    }

}

export default ShopShow