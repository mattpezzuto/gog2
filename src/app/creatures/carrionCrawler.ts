import { Creature, CreatureType } from "./creature";
import { CreatureStats } from "../creatureStats";

export class CarrionCrawler extends Creature {
    override getImage(): string {
        return this.getCreatureStats().image;
    }

override getCreatureStatsBaseline(): CreatureStats {
        var tempCreatureStats = new CreatureStats();
        tempCreatureStats.name = 'Carrion Crawler';
        tempCreatureStats.life = 150;
        tempCreatureStats.attack = 12;
        tempCreatureStats.magicAttack = 0;
        tempCreatureStats.dex = 12;
        tempCreatureStats.charisma = 18;
        tempCreatureStats.armor = 6;
        tempCreatureStats.magicResist = 0;
        tempCreatureStats.image = 'assets/images/' + 'carrioncraler.png';
        tempCreatureStats.lifeBuff = 5;
        tempCreatureStats.armorBuff = 0;
        tempCreatureStats.magicBuff = 0;
        tempCreatureStats.revivals = 0;
        return tempCreatureStats;
    }
    
    override getCreatureType(): CreatureType {
        return CreatureType.CarrionCrawler;
    }
    
}