import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class TreeOfLife extends Creature {
    public override clone(): Creature {
        return new TreeOfLife(this.getGlobalBuffService(), this.getPlayerId());
    }
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Tree of Life';
        tempCreatureStats.life = 30;
        tempCreatureStats.attack = 2;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'treeoflife.png';
        tempCreatureStats.lifeBuff = 5;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 1;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.TreeOfLife;
    }
    
}