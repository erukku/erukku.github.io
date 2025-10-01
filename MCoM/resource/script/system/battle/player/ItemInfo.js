class ItemInfo{
    constructor(){
    }

    getInfo(id){
        switch(id){
            case 0:
                return new Array(3,["wait",30],["heal",1,100],["wait",29]);
        }

    }
}

export default ItemInfo;