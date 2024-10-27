import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class Sorcerous extends Creature {
    public override clone(): Creature {
        return new Sorcerous(this.getGlobalBuffService(), this.getPlayerId());
    }
    
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Sorcerous';
        tempCreatureStats.life = 10;
        tempCreatureStats.attack = 0;
        tempCreatureStats.magicAttack = 25;
        tempCreatureStats.dex = 8;
        tempCreatureStats.charisma = 10;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'sorcerous.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Sorcerous;
    }
    
}