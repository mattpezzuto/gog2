import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Kobold extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Kobold';
        tempCreatureStats.life = 12;
        tempCreatureStats.attack = 8;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 14;
        tempCreatureStats.charisma = 16;
        tempCreatureStats.armor = 2;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'kobold.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Kobold;
    }
    
}