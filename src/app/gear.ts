
export enum GearType {
    Balanced = "Balanced",
    Attack = "Attack",
    Taunt = "Taunt"
}




export class Gear {
    gearType: GearType;

    constructor(gearType:GearType) {
        this.gearType = gearType;
    }
    
    public getName(): string {
        return this.gearType.toString();
    }
    getAttackBonus(): number {
        var bonus: number = 0;
        switch (this.gearType) {
            case GearType.Attack:
                bonus = 5; break;
        }
        return bonus;
    }

    getArmorClassBonus(): number {
        var bonus: number = 0;
        switch (this.gearType) {
            case GearType.Taunt:
                bonus = 3; break;
        }
        return bonus;
    }

    getMagicResistBonus(): number {
        var bonus: number = 0;
        switch (this.gearType) {
            case GearType.Taunt:
                bonus = 5; break;
        }
        return bonus;
    }

    hasTaunt(): boolean {
        var hasTaunt: boolean = false;
        switch (this.gearType) {
            case GearType.Taunt:
                hasTaunt = true; break;
        }
        return hasTaunt;
    }
}