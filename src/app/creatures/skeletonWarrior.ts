import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class SkeletonWarrior extends Creature {
    public override clone(): Creature {
        return new SkeletonWarrior(this.getGlobalBuffService(), this.getPlayerId());
    }

    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Skeleton Warrior';
        tempCreatureStats.life = 12;
        tempCreatureStats.attack = 7;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 2;
        tempCreatureStats.magicResist = 10;
        tempCreatureStats.image = 'assets/images/' + 'skeletonwarrior.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 1;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.SkeletonWarrior;
    }
    
}