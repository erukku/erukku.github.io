export type EquipSlot = "weapon" | "armor" | "accessory";

export default class Equipment {
    public id: string;
    public name: string;
    public slot: EquipSlot;

    // ステータス補正値 (Statusクラスと同じ項目を持たせるか、専用のインターフェースを作ると綺麗です)
    public hpBonus: number = 0;
    public atkBonus: number = 0;
    public defBonus: number = 0;
    public spdBonus: number = 0;
    public lukBonus: number = 0;

    constructor(id: string, name: string, slot: EquipSlot) {
        this.id = id;
        this.name = name;
        this.slot = slot;
    }
    // 必要に応じて、装備ならではの効果（特殊スキルなど）をもたせることも可能です
}