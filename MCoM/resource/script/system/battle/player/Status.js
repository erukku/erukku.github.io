
class Status{
    constructor(){
        this.maxHp = 100;
        this.hp = 100;
    }
    damage(num){
        this.hp -= num;
    }
    heal(num){
        this.hp += num;
    }

    extendHp(num){
        this.maxHp += num;
    }
}


export default Status;