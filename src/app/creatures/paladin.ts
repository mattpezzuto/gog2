import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Paladin extends Creature {
    public override clone(): Creature {
        return new Paladin(this.getGlobalBuffService(), this.getPlayerId());
    }
    
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Paladin';
        tempCreatureStats.life = 18;
        tempCreatureStats.attack = 6;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 2;
        tempCreatureStats.magicResist = 40;
        tempCreatureStats.image = 'assets/images/' + 'paladin.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Paladin;
    }
    
}