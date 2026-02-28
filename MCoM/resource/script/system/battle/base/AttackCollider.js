class AttackCollider{
    constructor(){

    }

    isHitted(player,boxes,target){
        var hit = new Array();
        for(var i = 0; i < boxes.length;i++){
            for(var j = 0; j < target.length;j++){
                var direction = 1;
                if(player.direction == "L"){
                    direction *= -1;
                }

                //console.log(player.direction);
                
                var bx1 = player.position.x + direction * (boxes[i].position.x - direction *boxes[i].body.x/2);
                var bx2 = player.position.x + direction * (boxes[i].position.x + direction *boxes[i].body.x/2);
                var by1 = player.position.y + direction * (boxes[i].position.y - direction *boxes[i].body.y/2);
                var by2 = player.position.y + direction * (boxes[i].position.y + direction *boxes[i].body.y/2);
                var bz1 = player.position.z + direction * (boxes[i].position.z - direction *boxes[i].body.z/2);
                var bz2 = player.position.z + direction * (boxes[i].position.z + direction *boxes[i].body.z/2);

                var tx1 = target[j].position.x - target[j].body.x/2;
                var tx2 = target[j].position.x + target[j].body.x/2;
                var ty1 = target[j].position.y - target[j].body.y/2;
                var ty2 = target[j].position.y + target[j].body.y/2;
                var tz1 = target[j].position.z - target[j].body.z/2;
                var tz2 = target[j].position.z + target[j].body.z/2;

                var fx = !(bx2 < tx1 || tx2 < bx1);
                var fy = !(by2 < ty1 || ty2 < by1);
                var fz = !(bz2 < tz1 || tz2 < bz1);

                //console.log(fx,fy,fz);

                if(fx && fy && fz){
                    hit.push(target[j]);
                }
            }
        }   
        return hit;
        
    }
}

export default AttackCollider;