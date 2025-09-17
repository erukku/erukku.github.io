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

                var choices = [2,"HPの最大値を100増やす","HPを最大値まで回復"];

                var effect = [2,[1,["extend_HP",100]],[1,["heal",10000]]];


                eventArray.add(text);
                eventArray.add(choices);
                eventArray.add(effect);
                break;


            case 1:
                var text = this.textInfo.getTextInfo(1);

                var choices = [2,"はい","いいえ"];

                var effect = [2,[1,["gacha_all",1]],[1,["none"]]];

                eventArray.add(text);
                eventArray.add(choices);
                eventArray.add(effect);
                break;
        }
        return eventArray;
    }

}

export default EventInfo