import AttackBox from "../base/AttackBox.js"
import Body from "../../base/Body.js";
import Position from "../../base/Position.js";
class MagicInfo{
    constructor(){
    }

    getInfo(id){
        switch(id){
            case 0:

                var body = new Body();
                var position = new Position();
                body.setBody(60,60,60);
                position.setPos(30,0,0);

                var box = new AttackBox(position,body);
                //return new Array(2,["wait",30],["attack",60,50,["move",6,[box]]]);
                return new Array([3,60],["wait",29],["fire",1,50,[30,6,[box]]],["wait",30]);

        }

    }

    getConboInfo(id){
        switch(id){
            default:
                return null            
        }
    }
}

export default MagicInfo;