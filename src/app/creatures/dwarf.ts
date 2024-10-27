import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Dwarf extends Creature {
    public override clone(): Creature {
        return new Dwarf(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

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