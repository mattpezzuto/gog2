export class CreatureStats {
    name: string;
    life: number;
    attack: number;
    magicAttack: number;
    dex: number;
    charisma: number;
    armor: number;
    magicResist: number;
    image: string;
    armorBuff: number;
    magicBuff: number;
    lifeBuff: number;
    revivals: number;

    // setName(name: string) { this.name = name; }
    constructor() {
        this.name ="";
        this.life = 0;
        this.attack = 0;
        this.magicAttack = 0;
        this.dex = 0;
        this.charisma = 0;
        this.armor = 0;
        this.magicResist = 0;
        this.image = "";
        this.armorBuff = 0;
        this.magicBuff = 0;
        this.lifeBuff = 0;
        this.revivals = 0;
    }
};