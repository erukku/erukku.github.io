import AttackBox from "../base/AttackBox.js"
import Body from "../../base/Body.js"
import Position from "../../base/Position.js"

class AttackInfo{
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
                //return [60,50,[box]];
                return new Array(1,["attack",60,50,["stay",0,[box]]]);

        }

    }
}

export default AttackInfo;