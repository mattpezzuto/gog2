import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Bard extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Bard';
        tempCreatureStats.life = 15;
        tempCreatureStats.attack = 8;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 12;
        tempCreatureStats.charisma = 18;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'halfElfBard.jpg';
        tempCreatureStats.lifeBuff = 5;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Bard;
    }
    
}