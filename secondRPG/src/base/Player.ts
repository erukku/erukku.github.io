import { Container, Graphics, Sprite } from "pixi.js";
import Status from "./Status";
import Equipment from "./item/Equipment";
import type { EquipSlot } from "./item/Equipment";
import Skill from "./item/Skill";
import Orb from "./item/Orb";

class Player {

    public graphic: Container;

    public status:Status;

    public equipments: Record<EquipSlot, Equipment | null> = {
        weapon: null,
        armor: null,
        accessory: null
    };

    public eqBag:Equipment[] = [];
    public skillBag:any[] = [];
    public orbBag:any[] = [];

    public glass:any;

    



    constructor() {
        this.graphic = new Container();
        
        

        this.status = new Status();
        this.status.test();

        this.test();

    }

    test() {
        //graphic
        var sprite = Sprite.from("player")

        sprite.anchor.x = sprite.anchor.y = 0.5;

        sprite.scale.x = sprite.scale.y = 0.5;

        this.graphic.addChild(sprite);

        //status

        //

        this.initBag();
        this.initHour();

    }

    initBag(){
        var item1:Equipment = new Equipment("1","sword","weapon");
        var item2:Equipment = new Equipment("2","sword","armor");
        var item3:Equipment = new Equipment("3","sword","accessory");
        this.eqBag.push(item1);
        this.eqBag.push(item2);
        this.eqBag.push(item3);


        var skill:Skill = new Skill([1],"","");

        this.skillBag.push(skill);

        var orb:Orb = new Orb([1],"r","")
        this.orbBag.push(orb);

        var orb:Orb = new Orb([1],"b","")
        this.orbBag.push(orb);

        var orb:Orb = new Orb([1],"g","")
        this.orbBag.push(orb);

    }

    initHour(){
        this.glass = [[-1,0,-1],[0,0,0],[0,0,0]];
    }

    setGraphic() {
        var graphic = Sprite.from("player");
        graphic.anchor.x = graphic.anchor.y = 0.5;

        graphic.scale.x = graphic.scale.y = 0.3;

        this.graphic.addChild(graphic); 
    }


    equip(item: Equipment) {
        this.equipments[item.slot] = item;
    }
    unequip(slot: EquipSlot) {
        this.equipments[slot] = null;
    }

    get totalMaxHp(): number {
        let maxHp = this.status.maxHp;
        if (this.equipments.weapon) maxHp += this.equipments.weapon.hpBonus;
        if (this.equipments.armor) maxHp += this.equipments.armor.hpBonus;
        if (this.equipments.accessory) maxHp += this.equipments.accessory.hpBonus;
        return maxHp;
    }

    get totalAtk(): number {
        let atk = this.status.atk;
        if (this.equipments.weapon) atk += this.equipments.weapon.atkBonus;
        if (this.equipments.armor) atk += this.equipments.armor.atkBonus;
        if (this.equipments.accessory) atk += this.equipments.accessory.atkBonus;
        return atk;
    }

    get totalDef(): number {
        let def = this.status.def;
        if (this.equipments.weapon) def += this.equipments.weapon.defBonus;
        if (this.equipments.armor) def += this.equipments.armor.defBonus;
        if (this.equipments.accessory) def += this.equipments.accessory.defBonus;
        
        return def;
    }


    get totalspd(): number {
        let spd = this.status.spd;
        if (this.equipments.weapon) spd += this.equipments.weapon.spdBonus;
        if (this.equipments.armor) spd += this.equipments.armor.spdBonus;
        if (this.equipments.accessory) spd += this.equipments.accessory.spdBonus;
        
        return spd;
    }


    get totalluk(): number {
        let luk = this.status.luk;
        if (this.equipments.weapon) luk += this.equipments.weapon.lukBonus;
        if (this.equipments.armor) luk += this.equipments.armor.lukBonus;
        if (this.equipments.accessory) luk += this.equipments.accessory.lukBonus;
        
        return luk;
    }



};


export default Player;