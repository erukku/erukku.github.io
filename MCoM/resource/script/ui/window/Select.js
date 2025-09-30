import Window from "./Window.js"
import Message from "./Message.js";
class Select{
    constructor(scene){
        this.scene = scene;

        this.graphic = new PIXI.Container();
        this.selectNum = 0;
        this.index = 0;

        this.scene.addChild(this.graphic);
    }

    setInfo(data){
        this.selectNum = data.shift();
        //var selection = data;
        for(var i = 0;i < this.selectNum;i++){
            var container = new PIXI.Container();

            var text = data[i];
            var window = new Window(container);
            window.initWindow(30,100);
            window.graphicContainer.y = 100 + i*50; 

            var message = new Message(window,false);
            message.setSelect(text);

            container.alpha = 0.5;

            this.graphic.addChild(container);
        }

    }

    addIndex(num){
        //console.log(this.graphic.getChildAt(this.index)., this.index);
        this.graphic.getChildAt(this.index).alpha = 0.5;
        if(num < 0){
            this.index += this.selectNum - num;
            this.index %= this.selectNum;
        }else{
            this.index += num;
            this.index %= this.selectNum;
        }
        this.graphic.getChildAt(this.index).alpha = 1;
        //console.log(this.graphic.getChildAt(this.index).alpha, this.index);
    }

    getIndex(){
        return this.index;
    }

}

export default Select