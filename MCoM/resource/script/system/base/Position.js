class Position{
    constructor(){
        this.x = 0;
        this.y = 0;
        this.z = 0;
    }
    setPos(x,y,z){
        this.x = x;
        this.y = y;
        this.z = z;
    }

    addPos(x,y,z){
        this.x = this.x + x;
        this.y = this.y + y;
        this.z = this.z + z;

        if(this.x < 0){
            this.x = 0;
        }
        if(this.x > 630){
            this.x = 630;
        }
        if(this.y < 0){
            this.y = 0;
        }
        if(this.y > 100){
            this.y = 100;
        }
    }
}

export default Position;