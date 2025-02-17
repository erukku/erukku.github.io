class App{
    constructor(display){
        this.display = display;

        this.signIn();
    }


    signIn(){
        this.container = new PIXI.Container();

        this.container.x = 10;
        this.container.y = 10;
        
        var figure = new PIXI.Graphics().roundRect(0,0,this.display.width - 40 ,this.display.width - 40,20).fill(0x222222);

        //figure.anchor = 0.5;

        figure.x = 20;
        figure.y = 20;

        this.container.addChild(figure)
        this.display.addChild(this.container);



        const button = new PIXI.Graphics().roundRect(0,0,this.display.height/7,this.display.width/7,20).fill(0xffffff);
        
        button.x = figure.width/2 - button.width/2 + 20;
        button.y = figure.height - button.height;

        button.eventMode = "static";
        button.cursor = "pointer";
        const This = this;
        button.on("pointerdown",function a (){
            This.container.destroy();
        });
        

        this.container.addChild(button);
    }

    onClick(){

    }


}

export default App;