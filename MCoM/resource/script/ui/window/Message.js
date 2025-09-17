class Message{
    constructor(window){
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
        if(this.text.length == this.textGraphic.text.length){
            this.ticker.remove(this.function);
            this.function = null;
        }
        else{
            this.textGraphic.text += this.text[this.textIndex];
            this.textIndex += 1;
        }
    }

    textFull(){
        this.textGraphic.text = this.message;
        this.textLength = this.message.length;
    }


}

export default Message