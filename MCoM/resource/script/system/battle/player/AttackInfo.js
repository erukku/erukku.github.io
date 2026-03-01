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

                return new Array([1,60],["attack",60,50,["stay",0,[box]]]);
            case 1:
                var body = new Body();
                var position = new Position();
                body.setBody(60,60,60);
                position.setPos(30,0,0);

                var box = new AttackBox(position,body);

                return new Array([1,60],["attack",60,50,["stay",0,[box]]]);
            case 2:
                var body = new Body();
                var position = new Position();
                body.setBody(60,60,60);
                position.setPos(30,0,0);

                var box = new AttackBox(position,body);

                return new Array([1,60],["attack",60,50,["stay",0,[box]]]);
            case -1:
                var body = new Body();
                var position = new Position();
                body.setBody(60,60,60);
                position.setPos(30,0,0);

                var box = new AttackBox(position,body);

                return new Array([1,60],["attack",60,1000,["stay",0,[box]]]);

            default:
                return null
        }
    }

    getConboInfo(id){
        switch(id){
            case 0:
                return new Array("attack",1,30)
            case 1:
                return new Array("attack",2,30)
            default:
                return null            
        }
    }
}

export default AttackInfo;