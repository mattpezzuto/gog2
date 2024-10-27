import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class FrostGiant extends Creature {
    public override clone(): Creature {
        return new FrostGiant(this.getGlobalBuffService(), this.getPlayerId());
    }
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Frost Giant';
        tempCreatureStats.life = 25;
        tempCreatureStats.attack = 8;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 6;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 5;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'frostgiant.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.FrostGiant;
    }
    
}