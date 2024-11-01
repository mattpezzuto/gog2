import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class InfestedRat extends Creature {
    public override clone(): Creature {
        return new InfestedRat(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Infested Rat';
        tempCreatureStats.life = 8;
        tempCreatureStats.attack = 4;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 12;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 0;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'infestedrat.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.InfestedRat;
    }
    
}