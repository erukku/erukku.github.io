class ItemInfo{
    constructor(){
    }

    getInfo(id){
        switch(id){
            case 0:
                return new Array(2,["wait",30],["heal",1,50]);

        }

    }
}

export default ItemInfo;