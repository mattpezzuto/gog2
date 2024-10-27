import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Genie extends Creature {
    public override clone(): Creature {
        return new Genie(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Genie';
        tempCreatureStats.life = 16;
        tempCreatureStats.attack = 6;
        tempCreatureStats.magicAttack = 6;
        tempCreatureStats.dex = 10;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 3;
        tempCreatureStats.magicResist = 25;
        tempCreatureStats.image = 'assets/images/' + 'genie.gif';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Genie;
    }
    
}