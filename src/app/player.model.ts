import { CreatureType } from './creatures/creature';
import { Creature } from './creatures/creature';
import { Kobold } from './creatures/kobold';
import { Gear, GearType } from './gear';
import { GlobalBuffService } from './globalBuffService';
import { QuestRewardType } from './quest-rewards';

export class Player {
    name: string;
    life: number;
    gold: number;
    refreshCounter: number;
    computerControlled: boolean;
    creatureList: Creature[];
    wins: number;
    losses: number;
    ties: number;
    bossDmg: number;
    creatureSlotsOpen: boolean[];
    questReward: QuestRewardType;
    questCreature: Creature;
    questUnits: number;
    private gearList: Gear[] = [];

    constructor(name: string, computerControlled: boolean) {
        this.name = name;
        this.life = 40;
        this.gold = 0;
        this.refreshCounter = 3;
        this.computerControlled = computerControlled;
        this.creatureList = [];
        this.wins=0;
        this.losses=0;
        this.ties=0;
        this.bossDmg = 0;
        this.creatureSlotsOpen = new Array<boolean>(5);
        this.questUnits = 0;   // TBD:  is this used?!
        this.questCreature = new Kobold(new GlobalBuffService());
        this.questReward = QuestRewardType['Gold - 50g'];
        for (var i = 0; i < 3; i++) { this.creatureSlotsOpen[i] = true; }
        for (var i = 3; i < 5; i++) { this.creatureSlotsOpen[i] = false; }
        this.gearList.push(new Gear(GearType.Balanced));
        this.gearList.push(new Gear(GearType.Attack));
        this.gearList.push(new Gear(GearType.Taunt));

    }

    getGearList(): Gear[] { return this.gearList; };
    getSortedGearList(): Gear[] { return this.gearList.sort(); };
    addToGearList(newGear: Gear) { this.gearList.push(newGear); };

    getAliveCount() {
        var count:number = 0;
        this.creatureList.forEach(c => {
            if (c.isAlive()) {
                count++;
            }
        });
        return count;
    }

    incrementWins() {
        this.wins++;
    }
    incrementLoses() {
        this.losses++;
    }
    incrementTies() {
        this.ties++;
    }

    incrementDmgDone(dmg: number) {
        this.bossDmg+= dmg;
    }
    
    getRecord() :string {
        return this.wins + ' - ' + this.losses + ' - ' + this.ties;
    }

    getBossDmg(): string {
        return this.bossDmg + ' ';
    }

    unlockSlot(slot: number) {
        this.creatureSlotsOpen[slot] = true;
    }
}