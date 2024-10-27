import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Demon extends Creature {
    public override clone(): Creature {
        return new Demon(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Demon';
        tempCreatureStats.life = 20;
        tempCreatureStats.attack = 12;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 10;
        tempCreatureStats.charisma = 4;
        tempCreatureStats.armor = 4;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'demon.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Demon;
    }
    
}