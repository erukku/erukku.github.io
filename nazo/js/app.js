import { Button } from "pixi-ui";

class App{
    constructor(display){
        this.display = display;

        this.signIn();
    }


    signIn(){
        this.container = new PIXI.Container();
        console.log(new Button());
        this.container.x = 10;
        this.container.y = 10;
        
        var figure = new PIXI.Graphics().roundRect(0,0,this.display.width - 40 ,this.display.width - 40,20).fill(0x222222);

        //figure.anchor = 0.5;

        figure.x = 20;
        figure.y = 20;

        this.container.addChild(figure)
        this.display.addChild(this.container);



        //const button = new PIXI.Graphics().roundRect(0,0,this.display.height/7,this.display.width/7,20).fill(0xffffff);
        const button = new Button(
            new PIXI.Graphics()
                .rect(0, 0, 100, 50, 15)
                .fill(0xFFFFFF)
       );
      
       button.onPress.connect(() => console.log('onPress'));
      
        button.x = figure.width/2 - button.width/2 + 20;
        button.y = figure.height - button.height;

        //button.eventMode = "static";
        //button.cursor = "pointer";
        //const This = this;
        //button.on("pointerdown",function a (){
        //    This.container.destroy();
        //});
        
        const text = new PIXI.Text({
            text:"決定",
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xff1010,
                align: 'center',
            }
        });

        text.anchor.x = text.anchor.y = 0.5;

        text.x = button.width/2;
        text.y = button.height/2;

        //button.addChild(text);

        this.container.addChild(button);
    }

    onClick(){

    }


}

export default App;