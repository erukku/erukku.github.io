//import {Button} from "pixi-ui";
import TextInput from "./textInput.js";


class App{
    constructor(display,app){
        this.display = display;
        this.app = app;
        this.signIn();
    }


    signIn(){
        this.container = new PIXI.Container();
        //console.log(new Button());
        this.container.x = 10;
        this.container.y = 10;
        
        var figure = new PIXI.Graphics().roundRect(0,0,this.display.width - 40 ,this.display.width - 40,20).fill(0x222222);

        //figure.anchor = 0.5;

        figure.x = 20;
        figure.y = 20;

        this.container.addChild(figure)
        this.display.addChild(this.container);

        /*

        //const button = new PIXI.Graphics().roundRect(0,0,this.display.height/7,this.display.width/7,20).fill(0xffffff);

        const buttonbg = new PIXI.Graphics().roundRect(0,0,this.display.height/7,this.display.width/7,20).fill(0xFFFFFF)


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

        text.x = buttonbg.width/2;
        text.y = buttonbg.height/2;

        buttonbg.addChild(text);

        const button = new Button(
            buttonbg
       );
      
       const This = this;
       button.onPress.connect(() => This.container.destroy());

       button.view.position.set(figure.width/2 - button.view.width/2 + 20,figure.height - button.view.height);
      

        this.container.addChild(button.view);
*/
       
       /*
        var input = new TextInput({
            input: {
                fontFamily: 'Arial',
                fontSize: '32px',
                padding: '14px 24px',
                width: '500px',
                color: 'white'
            },
            box:{}
        })

        this.container.addChild(input);
        */

        var This = this;
       var textInput = new TextInput({
        input: {
			fontFamily: 'Arial',
			fontSize: '24px',
			padding: '12px',
			width: figure.width,
			color: '#26272E'
		},
		box: {
			default: {fill: 0xE8E9F3, rounded: 12, stroke: {color: 0xCBCEE0, width: 3}},
			focused: {fill: 0xE1E3EE, rounded: 12, stroke: {color: 0xABAFC6, width: 3}},
			disabled: {fill: 0xDBDBDB, rounded: 12}
		}
    })

    textInput.placeholder = 'Enter your Text...'
    textInput.x = figure.width/2;
    textInput.y = 50;
    textInput.pivot.x = textInput.width/2
    textInput.pivot.y = textInput.height/2

    figure.addChild(textInput);
    //document.body.appendChild(textInput);
    //this.app.stage.addChild(textInput);

    //var ticker = PIXI.Ticker.shared;

    
       
    
    }




}

export default App;