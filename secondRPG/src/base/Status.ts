class Status{

    public hp:number = 0;
    public maxHp:number = 0;

    public atk: number = 0;
    public def: number = 0;
    public spd: number = 0;
    public luk: number = 0;

    public condition : String[] = [];


    

    constructor(){
        
    }


    test(){
        this.maxHp = 100;
        this.hp = 100;

        this.atk = 10;
        this.def = 10;
        this.spd = 10;
        this.luk = 10;
    }

    damage(num:number){
        this.hp = Math.max(0,this.hp-num);
    }

    heal(num:number){
        this.hp = Math.min(this.maxHp,this.hp+num);
    }


    isAlive(): boolean {
        return this.hp > 0;
    }

    addCondition(data:String){
        this.condition.push(data);
    }



}

export default Status;