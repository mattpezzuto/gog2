import { Archer } from "./creatures/archer";
import { Creature, CreatureType } from "./creatures/creature";
import { DemonPortal } from "./creatures/demonPortal";
import { DragonEgg } from "./creatures/dragonEgg";
import { Elaron } from "./creatures/elaron";
import { Paladin } from "./creatures/paladin";
import { GlobalBuffService } from "./globalBuffService";

export default class Utils {
    static upgradeRecruitment(globalBuffService: GlobalBuffService): Creature {
        var result: Creature;
        var pickOne = Math.floor((Math.random() * 4) + 0);
        switch(pickOne) {
          case 0:
            result = new Elaron(globalBuffService); break;
          case 1:
            result = new Paladin(globalBuffService); break;
          case 2:
            result = new DragonEgg(globalBuffService); break;
          case 3:
            result = new DemonPortal(globalBuffService); break;
          default:
            result = new Archer(globalBuffService); break;
        }
        console.log('pickOne = ' + pickOne);
        console.log('new creature added = ' + result.getName());
        return result;
    }

    static findFirstRatSlot(creatureList: Creature[]): number {
        var slot = -1;
        console.log('find first slot:  len = ' + creatureList.length);
        for (var i = 0; i< creatureList.length; i++) {
            console.log('creatureType = ' + creatureList[i].creatureType + ', ratCreatureType = ' + CreatureType.InfestedRat);
            if ((creatureList[i].creatureType === CreatureType.InfestedRat) && (slot == -1)) {
                slot = i;
            }
        }
        return slot;
    }
}