
class Status{
    constructor(){
        this.maxHp = 150;
        this.hp = 150;
    }
    damage(num){
        this.hp -= num;
    }
}


export default Status;