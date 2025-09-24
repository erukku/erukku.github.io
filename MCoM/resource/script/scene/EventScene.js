import RandomInt from "../util/RandomInt.js";
import EventInfo from "../system/base/EventInfo.js";

import Window from "../ui/window/Window.js";
import Message from "../ui/window/Message.js";

import Select from "../ui/window/Select.js";
class EventScene{
    constructor(player,enemyList,stage,key,onWay,app){
        this.player = player;
        this.stage = stage;
        
        this.keys = key[0];
        this.keyList = key;

        this.onWay = onWay;
        this.app = app;

        this.eventType = null;
        this.eventId = null;

        this.eventInfo = new EventInfo();

        this.eventContainer = new PIXI.Container();

        this.step = "";

        this.ticker = PIXI.Ticker.shared;

        this.fn = null;

        this.flame = 0;
        this.waitFlame = -1;
    }


    lotteryEventType(){
        var rand = new RandomInt()
        var num = rand.getRandomInt(0,105);
        if(num<0){
            this.eventType = "battle";
        }
        else if(num < 0){
            this.eventType = "shop";
        }
        else{
            this.eventType = "event";
        }
    }

    lotteryEventId(){
        var rand = new RandomInt()
        var num = rand.getRandomInt(0,1);
        this.eventId = num;
    }

    setTest(){
        this.stage.addChild(this.eventContainer);
        this.lotteryEventType();
        this.lotteryEventId();

        this.eventArray = this.eventInfo.getEventInfo(this.eventId);


        var This = this;
        this.fn = function(time){
            This.input();
        };
        this.ticker.add(this.fn);
    }

    event(){
        //仮 length == 3
        this.step = "wait";

        this.eventContainer.x = 200;
        this.eventContainer.y = -100;

        var window = new Window(this.eventContainer);
        window.initWindow(100,200);


        var text = this.eventArray.shift();

        this.message = new Message(window);
        this.message.setMessage(text);
        this.message.startMessage();

        this.selection = new Select(this.eventContainer);
        var selectText = this.eventArray.shift();

        this.selection.setInfo(selectText);
        
        this.step = "message";
        //message.startMessage();
    }

    eventEnd(){
        this.ticker.remove(this.fn);

        this.destroy();
        this.onWay.backOnWay();
    }

    input(){
        this.flame += 1;
        if(this.flame < this.waitFlame){
            return 0;
        }

        if(this.step == ""){
            this.event()
        }
        else if(this.step == "message"){
            if(this.keyPressing("a")){
                var flag = this.message.textFull();
                this.setWait();
                this.selection.addIndex(0);
                if(flag == 1){
                    this.step = "select";
                }
            }

        }
        else if(this.step == "select"){
            if(this.keyPressing("a")){
                var index = this.selection.getIndex();
                this.setWait();
                this.step = "wait"
                this.result(index);
            }
            else if(this.keyPressing("i")){
                this.selection.addIndex(-1);
                this.setWait();
            }
            else if(this.keyPressing("k")){
                this.selection.addIndex(1);
                this.setWait();
            }
        }
        else if(this.step == "end"){
            this.eventEnd();
        }

        
    }

    result(index){
        var data = this.eventArray.shift(); 
        var num = data.shift();

        var result = data[index];

        for(var i = 0; i<num;i++){
            var data = result[i];
            switch(data[0]){
                case "extend_HP":
                    this.player.extendHp(data[1]);
                    break;
                case "heal":
                    this.player.heal(data[1]);
                    break;
                case "gatya":
                    break;
                case "battle":
                    0;
                    break;
            }
        }

        this.step = "end";

    }

    keyPressing(key){
        return this.keyList[1][key]
    }

    setWait(){
        this.waitFlame = this.flame + 10;
    }


    destroy(){
        this.eventContainer.destroy();
    }

}

export default EventScene