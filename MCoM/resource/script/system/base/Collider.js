class Collider{
    constructor(){
    }

    isCrossed(target,other){
        var targetPoint = new Array(); 

        for(var i = 0; i < 2;i++){
            for(var j = 0; j < 2;j++){
                for(var k = 0;k < 2;k++){
                    var x = target.body.x/2;
                    if(i == 0){
                        x *= -1;
                    }
                    var y = target.body.y/2;
                    if(j == 0){
                        y *= -1;
                    }
                    var z = target.body.z/2;
                    if(k == 0){
                        z = -1;
                    }

                    targetPoint.push([target.position.x + x ,target.position.y + y,target.position.z + z])
                }
            }
        }

        var flag = false;

        for(var i = 0;i < other.length;i++){
            if(target == other[i]){
                continue;
            }
            for(var j = 0;j < 8;j++){
                var xFlag = other[i].position.x - other[i].body.x/2 <= targetPoint[j][0] && targetPoint[j][0] <=  other[i].position.x + other[i].body.x/2;
                var yFlag = other[i].position.y - other[i].body.y/2 <= targetPoint[j][1] && targetPoint[j][1] <=  other[i].position.y + other[i].body.y/2;
                var zFlag = other[i].position.z - other[i].body.z/2 <= targetPoint[j][2] && targetPoint[j][2] <=  other[i].position.z + other[i].body.z/2;
                if(xFlag && yFlag && zFlag){
                    flag = true;
                }
            }
        }

        return flag
    }
}

export default Collider;