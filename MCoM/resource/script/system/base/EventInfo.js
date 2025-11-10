import TextInfo from "./TextInfo.js";
class EventInfo{
    constructor(){
        this.textInfo = new TextInfo();

    }

    getEventInfo(index){
        var eventArray = new Array();
        switch(index){
            case 0:
                var text = this.textInfo.getTextInfo(0);

                var choices = [2,"HPの最大値を10増やす\n\n","HPを最大値まで回復\n\n"];

                var effect = [2,[1,["extend_HP",10]],[1,["heal",10000]]];


                eventArray.push(text);
                eventArray.push(choices);
                eventArray.push(effect);
                break;


            case 1:
                var text = this.textInfo.getTextInfo(1);

                var choices = [2,"はい\n\n","いいえ\n\n"];

                var effect = [2,[1,["gacha_all",1]],[1,["none"]]];

                eventArray.push(text);
                eventArray.push(choices);
                eventArray.push(effect);
                break;
        }
        return eventArray;
    }

}

export default EventInfo