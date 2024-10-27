import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Orc extends Creature {
    public override clone(): Creature {
        return new Orc(this.getGlobalBuffService(), this.getPlayerId());
    }
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Orc';
        tempCreatureStats.life = 18;
        tempCreatureStats.attack = 12;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 3;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'orc.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Orc;
    }
    
}