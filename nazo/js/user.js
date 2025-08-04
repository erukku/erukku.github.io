class User{
    constructor(){
        this.id = "";
        this.password = "";
        this.secLv = 0;

        this.comment = [];
    }

    set id(id){
        this.id = id;
    }

    get id(){
        return this.id;
    }

    set pass(pass){
        this.password = pass;
    }

    get pass(){
        return this.password;
    }

    set secLv(lv){
        this.secLv = lv;
    }

} 

export default User;