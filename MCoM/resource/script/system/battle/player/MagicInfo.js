import AttackBox from "../base/AttackBox.js"

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
                return [2,["wait",30]["attack",50,60,["move",6,box]]];

        }

    }
}

export default MagicInfo;