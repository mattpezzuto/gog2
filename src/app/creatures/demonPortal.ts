import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class DemonPortal extends Creature {
    public override clone(): Creature {
        return new DemonPortal(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Demon Portal';
        tempCreatureStats.life = 10;
        tempCreatureStats.attack = 0;
        tempCreatureStats.magicAttack = 15;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 16;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'demonportal.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.DemonPortal;
    }
    
}