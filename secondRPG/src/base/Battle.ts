import type Enemy from "./Enemy";
import type Player from "./Player";

class Battle{

    private player;
    private enemys;

    constructor(player:Player,enemys:Enemy[]){
        this.player = player;
        this.enemys = enemys;
    }

    start(){
        this.test();
    }

    test(){

    }

    turn(){
        //charge()
        //player()
        //enemys()

    }

}

export default Battle