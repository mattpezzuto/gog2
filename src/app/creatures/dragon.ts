import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Dragon extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Dragon';
        tempCreatureStats.life = 20;
        tempCreatureStats.attack = 0;
        tempCreatureStats.magicAttack = 20;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 5;
        tempCreatureStats.magicResist = 75;
        tempCreatureStats.image = 'assets/images/' + 'dragon.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Dragon;
    }
    
}