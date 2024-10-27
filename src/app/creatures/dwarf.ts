import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Dwarf extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }
//                 name = 'Dwarf'; life = 20; attack = 10; dex = 6; armor = 3; image = 'dwarfwarrior.png'; break;

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Dwarf';
        tempCreatureStats.life = 20;
        tempCreatureStats.attack = 10;
        tempCreatureStats.magicAttack = 15;
        tempCreatureStats.dex = 6;
        tempCreatureStats.charisma = 16;
        tempCreatureStats.armor = 3;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'dwarfwarrior.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Dwarf;
    }
    
}