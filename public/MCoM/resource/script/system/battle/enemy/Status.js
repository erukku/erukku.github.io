class Status{
    constructor(){
        this.maxHp = 100;
        this.hp = 100;
    }

    damage(num){
        this.hp -= num;
    }
}

export default Status;