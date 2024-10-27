import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Archer extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Archer';
        tempCreatureStats.life = 10;
        tempCreatureStats.attack = 12;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 16;
        tempCreatureStats.charisma = 12;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'archer.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Archer;
    }
    
}