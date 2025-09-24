
class Message{
    constructor(window,icon){
        this.window = window;
        this.message = null;
        this.text = "";
        this.textIndex = 0;
        this.textGraphic = new PIXI.Text("");

        this.textGraphic.x = 20;
        this.textGraphic.y = 20;

        this.ticker = PIXI.Ticker.shared;

        this.style = {
            font:'12pt Arial',
            fill:'black',
            wordWrap:true,
            wordWrapWidth:400,
            breakWords: true
            };

        this.function = null;
        
        if(icon == true){
            this.nextIcon = new PIXI.Text("...", {fontFamily : 'Arial', fontSize: 20, fill : 0x000000});
            this.nextIcon.x = this.window.width - 40;
            this.nextIcon.y = this.window.height - 30;
        }
        else{
            this.nextIcon = new PIXI.Text();
        }
        //this.nextIcon.visible = false;

        this.window.graphicContainer.addChild(this.nextIcon);

        this.flame = 0;
    }

    startMessage(){
        this.window.graphicContainer.addChild(this.textGraphic);
        this.setAnimation();
    }

    setMessage(message){
        this.message = message;
        this.textLength = this.message.shift();
        this.text = this.message.shift();

        this.textLength -= 1;
        //console.log(this.text);

        this.textGraphic.style = this.style;
        this.window.graphicContainer.addChild(this.textGraphic);
    }

    setSelect(text){
        var style = {
            font:'12pt Arial',
            fill:'black',
            align: 'center',
            wordWrap:true,
            wordWrapWidth:400,
            breakWords: true
            };
        this.textGraphic.style = style;
        this.textGraphic.text = text;
        this.window.graphicContainer.addChild(this.textGraphic);
    }

    nextText(){
        if(this.textLength != 0){
            this.text = this.message.shift();
            this.textLength -= 1;

            this.textIndex = 0;
            this.textGraphic.text = "";

            this.textAuto();
            return 0;
        }
        else{
            return 1;
        }
    }

    setAnimation(){
        var This = this;
        var fn = function(time){
            This.textAuto();
        }
        this.function = fn;
        this.ticker.add(this.function);
    }

    textAuto(){
        this.flame += 1;
        
        if(this.flame %2 != 0){
            return 0;
        }

        if(this.nextIcon.text == "▼"){
            if(this.flame %16 == 0){
                this.nextIcon.y += 5;
            }
            else if(this.flame %8 == 0){
                this.nextIcon.y -= 5;
            }
        }


        if(this.text.length == this.textGraphic.text.length){
            this.nextIcon.text = "▼";
            //this.ticker.remove(this.function);
            //this.function = null;
        }
        else{
            this.textGraphic.text += this.text[this.textIndex];
            this.textIndex += 1;
        }
    }

    textFull(){
        console.log(this.textIndex);
        if (this.textGraphic.text.length != this.text.length){
            this.textGraphic.text = this.text;
            this.textIndex = this.text.length + 1;
            return 0;
        }
        else{
            this.nextIcon.visible = false;
            this.ticker.remove(this.function);
            this.function = null;
            return 1;
        }
        
        
    }


}

export default Message