import RandomInt from "../util/RandomInt.js";
import EventInfo from "../system/base/EventInfo.js";
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
    }


    lotteryEventType(){
        var rand = new RandomInt()
        var num = rand.RandomInt(0,105);
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
        var num = rand.RandomInt(0,1);
        this.eventId = num;
    }

    setTest(){
        this.lotteryEventType();
        this.lotteryEventId();

        var event = this.eventInfo.getEventInfo(this.eventId);


        this.event(event);
    }

    event(){
        

    }



}

export default EventScene