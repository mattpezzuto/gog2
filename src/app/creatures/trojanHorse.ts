import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class TrojanHorse extends Creature {
    public override clone(): Creature {
        return new TrojanHorse(this.getGlobalBuffService(), this.getPlayerId());
    }
    
    override getImage(): string {
        return this.getCreatureStats().image;
    }

    override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Trojan Horse';
        tempCreatureStats.life = 1;
        tempCreatureStats.attack = 1;
        tempCreatureStats.magicAttack = 1;
        tempCreatureStats.dex = 1;
        tempCreatureStats.charisma = 1;
        tempCreatureStats.armor = 1;
        tempCreatureStats.magicResist = 1;
        tempCreatureStats.image = 'assets/images/' + 'trojanhorse.png';
        tempCreatureStats.lifeBuff = 0;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.Wizard;
    }
    
}