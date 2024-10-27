import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class DragonEgg extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Dragon Egg';
        tempCreatureStats.life = 10;
        tempCreatureStats.attack = 8;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 12;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 2;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'dragonegg.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.DragonEgg;
    }
    
}