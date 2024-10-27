import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Mortiserion extends Creature {
    public override clone(): Creature {
        return new Mortiserion(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Mortiserion';
        tempCreatureStats.life = 16;
        tempCreatureStats.attack = 5;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 16;
        tempCreatureStats.armor = 5;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'mortiserion.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 1;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Mortiserion;
    }
    
}