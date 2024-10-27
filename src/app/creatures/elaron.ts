import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Elaron extends Creature {
    public override clone(): Creature {
        return new Elaron(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Elaron';
        tempCreatureStats.life = 12;
        tempCreatureStats.attack = 5;
        tempCreatureStats.magicAttack = 5;
        tempCreatureStats.dex = 16;
        tempCreatureStats.charisma = 14;
        tempCreatureStats.armor = 2;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'elaron.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Elaron;
    }
    
}