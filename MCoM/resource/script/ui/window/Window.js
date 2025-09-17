class Window {
    constructor(scene){
        this.scene = scene;

        this.height = 0;
        this.width = 0;

        this.graphicContainer = new PIXI.Container();
    }

    initWindow(h,w){
        //this.setSize(150,400);
        this.setSize(h,w);
        this.setGraphic();
        this.addScene();
    }


    setSize(h,w){
        this.height = h;
        this.width = w;
        
    }

    setGraphic(){
        var windowMainGraphic = new PIXI.Graphics().rect(0,0,this.width,this.height).fill(0xffffff);
        var windowSubGraphic = new PIXI.Graphics().rect(0,0,this.width+10,this.height+10).fill(0xaaaaaa);

        windowSubGraphic.x -= 5;
        windowSubGraphic.y -= 5;

        this.graphicContainer.addChild(windowSubGraphic);
        this.graphicContainer.addChild(windowMainGraphic);
    }

    addScene(){
        this.scene.addChild(this.graphicContainer);
    }



}


export default Window