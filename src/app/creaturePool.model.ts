import {Creature, CreatureType} from './creatures/creature'

export class CreaturePool {

    tier1:  Creature[];
    tier2:  Creature[];
    tier3:  Creature[];

    constructor() {

        this.tier1 = [];
        this.tier2 = [];
        this.tier3 = [];
    }

    public addCreatureToPool(count: number, creature: Creature) {
        for (var i = 0; i< count; i++) {
            this.tier1.push(creature);
        }
      }

    removeCreatureFromPool(index: number){
        console.log('before:' + this.tier1.length);
        this.tier1.splice(index, 1);
        console.log('after:' + this.tier1.length);
    }

    getCreaturePool(): Creature[] {
        return this.tier1;
    }
        
}