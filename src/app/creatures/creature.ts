import { CreatureStats } from '../creatureStats';
import { Gear, GearType } from '../gear';
import { GlobalBuffService } from '../globalBuffService';

export enum CreatureType {

    Empty,
    Locked,
    Gnome,
    CarrionCrawler,
    Goblin,
    Genie,
    Dwarf,
    SkeletonWarrior,
    Elaron,
    Orc,
    Kobold,
    Paladin, 
    Wizard,
    TreeOfLife,
    Necromancer,
    Mortiserion,
    Archer,
    Bard,
    DragonEgg,
    DemonPortal,
    Demon,
    Dragon,
    FrostGiant,
    InfestedRat,
    PurpleWand,
    GoldPile,
    Recruitment,
    Refresh,
    NoRats,
    TrojanHorse,
    Sorcerous
};


export abstract class Creature {
    readonly creatureType: CreatureType;
    private readonly creatureStats: CreatureStats;
    private currentStats: CreatureStats;
    private gear: Gear;

    private permanentAttackBuff: number;
    private permanentMagicBuff: number;
    private permanentLifeBuff: number;
    private playerId: string;

    constructor(
        private globalBuffService: GlobalBuffService, // Inject the buff service
        playerId: string = "0"
    ) {
        this.globalBuffService = globalBuffService;
        this.playerId = playerId;
        this.creatureType = this.getCreatureType();
        this.creatureStats = this.getCreatureStatsBaseline();
        this.currentStats = this.getCreatureStatsBaseline();
        this.permanentAttackBuff = 0;
        this.permanentMagicBuff = 0;
        this.permanentLifeBuff = 0;
        this.gear = new Gear(GearType.Balanced);
    }

    getGlobalBuffService(): GlobalBuffService { return this.globalBuffService; }
    getPlayerId(): string { return this.playerId; }

    abstract getCreatureStatsBaseline() : CreatureStats;
    abstract getCreatureType() : CreatureType;
    abstract getImage(): string;
    public abstract clone(): Creature; // Abstract method to clone

    getCurrentLife(): number {
        const globalLifeBuff = this.globalBuffService.getGlobalLifeBuff(this.playerId, CreatureType[this.creatureType]);
        return this.currentStats.life + this.getPermanentLifeBuff() + globalLifeBuff; 
    }

    isFilled(): boolean {
        return this.creatureType !== CreatureType.Empty && this.creatureType !== CreatureType.Locked;
    }

    getCreatureStats(): CreatureStats { return this.creatureStats; }
    getCurrentStats(): CreatureStats { return this.currentStats; }
    incrementAttackDamage(attackBuf: number) { this.permanentAttackBuff+= attackBuf; }
    getGear(): Gear { return this.gear; }
    setGear(gear: Gear): void { this.gear= gear; }
    setPlayerId(playerId: string) { this.playerId = playerId; }

    public getName() { return this.creatureStats.name; }

    public getCurrentArmorBuff(): number {
        return this.currentStats.armorBuff;
    }

    public getCurrentLifeBuff(): number {
        return this.currentStats.lifeBuff;
    }

    public getPermanentAttackBuff(): number { return this.permanentAttackBuff; };
    public getPermanentMagicBuff(): number { return this.permanentMagicBuff; };
    public getPermanentLifeBuff(): number { return this.permanentLifeBuff; };

    public isAlive(): boolean { return this.currentStats.life > 0; };
    
    public reset(): void {
        this.currentStats = this.getCreatureStatsBaseline();
        console.log('globalBuffService=' + this.globalBuffService);
        const globalAttackBuff = this.globalBuffService.getGlobalAttackBuff(this.playerId, this.creatureType.toString());
        const globalLifeBuff = this.globalBuffService.getGlobalLifeBuff(this.playerId, CreatureType[this.creatureType]);
        console.log('global Life buff=' + globalLifeBuff);

        this.currentStats.attack += this.getPermanentAttackBuff();
        this.currentStats.attack += globalAttackBuff;

        console.log('currentAttack = ' + this.currentStats.attack);
        this.currentStats.magicAttack += this.getPermanentMagicBuff();
        
        this.currentStats.life += this.getPermanentLifeBuff();
        this.currentStats.life += globalLifeBuff;
    }

    
}



// export class Creature {
//     readonly creatureType: CreatureType;
//     private readonly creatureStats: CreatureStats;
//     private currentStats: CreatureStats;
//     private gear: Gear;

//     currentArmorBuffUsed: boolean;
//     currentLifeBuffUsed: boolean;

//     constructor(creatureType: CreatureType) {
//         this.creatureType = creatureType;
//         this.creatureStats = this.getCreatureStatsFor(creatureType);
//         this.currentStats = this.getCreatureStatsFor(creatureType);
//         this.currentArmorBuffUsed = false;
//         this.currentLifeBuffUsed = false;
//         this.gear = new Gear(GearType.Balanced);
//     }

//     getCreatureStats(): CreatureStats { return this.creatureStats; };
//     getCurrentStats(): CreatureStats { return this.currentStats; };
//     getGear(): Gear { return this.gear; };
//     setGear(gear: Gear): void { this.gear= gear;};

//     public getName() { return this.creatureStats.name; };
//     public getImage() { return this.creatureStats.image; };

//     public preCombat(): void {
//         this.currentStats = this.getCreatureStatsFor(this.creatureType);
//         this.currentArmorBuffUsed = false;
//         this.currentLifeBuffUsed = false;
//     }

//     public setArmorBuff(buff: number) {
//         this.creatureStats.armorBuff = buff;
//     }

//     public getArmorBuff(): number {
//         return this.creatureStats.armorBuff;
//     }

//     public setLifeBuff(buff: number) {
//         this.creatureStats.lifeBuff = buff;
//     }

//     public getLifeBuff(): number {
//         return this.creatureStats.lifeBuff;
//     }

//     getCreatureStatsFor(creatureType: CreatureType) : CreatureStats {
//         var creatureStats: CreatureStats = new CreatureStats();
//         var name, image: string;
//         var life, dex, armor, charisma: number = 10,
//             attack: number = 0, magicAttack: number = 0, magicResist: number = 0, revivals: number = 0,
//             magicResistBuff: number = 0, armorBuff: number = 0, lifeBuff: number = 0, magicBuff: number = 0;
//         switch( creatureType ) {
//             case CreatureType.Archer:
//                 name = 'Archer'; life = 10; attack = 12; dex = 16; armor = 1; charisma = 12; image = 'archer.png'; break;
//             case CreatureType.Bard:
//                 name = 'Bard'; life = 15; attack = 8; dex = 12; armor = 1; charisma = 18; lifeBuff = 5; image = 'femalebard.png'; break;
//             case CreatureType.CarrionCrawler:
//                 name = 'Carrion Crawler'; life = 150; attack = 12; dex = 12; armor = 6; image = 'carrioncraler.png'; break;
//             case CreatureType.Demon: 
//                 name = 'Demon'; life = 20; attack = 12; dex = 10; armor = 4; charisma = 4; image = 'demon.png'; break;
//             case CreatureType.DemonPortal:
//                 name = 'Demon Portal'; life = 1; attack = 1; dex = 6; armor = 0; image = '.png'; break;
//             case CreatureType.DragonEgg:
//                 name = 'Dragon Egg'; life = 1; attack = 1; dex = 6; armor = 0; image = 'dragonegg.png'; break;
//             case CreatureType.Dwarf:
//                 name = 'Dwarf'; life = 20; attack = 10; dex = 6; armor = 3; image = 'dwarfwarrior.png'; break;
//             case CreatureType.Elaron:
//                 name = 'Elaron'; life = 12; attack = 5; magicAttack = 5; dex = 16; charisma = 14; armor = 2; image = 'elaron.png'; 
//                 magicResist = 50; magicResistBuff = 10; break;
//             case CreatureType.FrostGiant:
//                 name = 'Frost Giant'; life = 25; attack = 8; dex = 6; armor = 5; image = 'frostgiant.png'; break;
//             case CreatureType.InfestedRat:
//                 name = 'Infested Rat'; life = 8; attack = 4; dex = 12; armor = 0; image = 'infestedrat.png'; break;
//             case CreatureType.Gnome:
//                 name = 'Gnome'; life = 10; attack = 8; dex = 12; armor = 2; image = 'gnome.jpg'; break;
//             case CreatureType.Goblin:
//                 name = 'Goblin'; life = 10; attack = 8; dex = 14; armor = 2; image = 'goblin.png'; break;
//             case CreatureType.Genie:
//                 name = 'Genie'; life = 16; attack = 6; magicAttack = 6; dex = 10; armor = 3; magicResist = 25; image = 'genie.gif'; break;
//             case CreatureType.Kobold:
//                 name = 'Kobold'; life = 12; attack = 8; dex = 14; armor = 2; magicResist = 10; image = 'kobold.png'; break;
//             case CreatureType.Necromancer:
//                 name = 'Necromancer'; life = 16; attack = 5; dex = 8; armor = 5; 
//                 revivals = 1; image = 'necromancer.png'; break;
//             case CreatureType.Mortiserion:
//                     name = 'Mortiserion'; life = 16; attack = 5; dex = 8; armor = 5; 
//                     revivals = 1; image = 'mortiserion.png'; break;
//             case CreatureType.TrojanHorse:
//                 name = 'Trojan Horse'; life = 1; attack = 1; dex = 1; armor = 1; image = 'trojanhorse.png';  break;
//             case CreatureType.Orc:
//                 name = 'Orc'; life = 18; attack = 12; dex = 8; armor = 3; image = 'orc.png'; break;
//             case CreatureType.Paladin:
//                 name = 'Paladin'; life = 18; attack = 6; dex = 8; armor = 4; magicResist = 40;
//                 armorBuff = 2; image = 'paladin.png'; break;
//             case CreatureType.SkeletonWarrior:
//                 name = 'Skeleton Warrior'; life = 12; attack = 7; dex = 8; armor = 2; magicResist = 10; 
//                 revivals = 1; image = 'skeletonwarrior.png'; break;
//             case CreatureType.Wizard:
//                 name = 'Wizard'; life = 10; magicAttack = 15; dex = 8; armor = 1; magicResist = 10; charisma = 16; image = 'wizard.png'; break;
//             case CreatureType.TreeOfLife:
//                 name = 'Tree of Life'; life = 30; attack = 2; dex = 8; armor = 1; revivals = 1; image = 'treeoflife.png'; 
//                 lifeBuff = 5; break;
//             case CreatureType.Sorcerous: 
//                 name = 'Sorcerous'; life = 10; magicAttack = 25; dex = 8; armor = 1; image = 'sorcerous.png'; break;

//             case CreatureType.Dragon:
//                 name = 'Dragon'; life = 20; magicAttack = 15; dex = 8; armor = 5; magicResist = 75; image = 'dragon.png'; break;
//             case CreatureType.PurpleWand:
//                 name = 'Purple Wand'; life = 1; attack = 1; dex = 1; armor = 0; image = 'purplewand.png'; break;
//             case CreatureType.GoldPile:
//                 name = 'Gold Pile'; life = 1; attack = 1; dex = 1; armor = 0; image = 'goldpile.png'; break;
//             case CreatureType.Empty:
//                 name = 'Open Slot'; life = 1; attack = 1; dex = 1; armor = 0; image = 'openSlot.jpg'; break;
//             case CreatureType.Recruitment:
//                 name = 'Open Slot'; life = 1; attack = 1; dex = 1; armor = 0; image = 'recruitment.jpg'; break;
//             case CreatureType.Refresh:
//                 name = 'Open Slot'; life = 1; attack = 1; dex = 1; armor = 0; image = 'refresh.png'; break;
//             case CreatureType.NoRats:
//                 name = 'Open Slot'; life = 1; attack = 1; dex = 1; armor = 0; image = 'norats.png'; break;
//             case CreatureType.Locked:
//                 name = 'Locked'; life = 1; attack = 1; dex = 1; armor = 0; image = 'lockedSlot.jpg'; break;
    
//             default:
//                 image = '';  // Maybe a NOT Image
//                 armor = 0;
//                 dex = 0;
//                 life = 0;
//                 name = "CreatureNotFound";
//                 console.log("Error, no creatureType found");
//         }

//         creatureStats.name = name;
//         creatureStats.life = life;
//         creatureStats.attack = attack;
//         creatureStats.magicAttack = magicAttack;
//         creatureStats.dex = dex;
//         creatureStats.armor = armor;
//         creatureStats.magicResist = magicResist;
//         creatureStats.image = 'assets/images/' + image;
//         creatureStats.lifeBuff = lifeBuff;
//         creatureStats.armorBuff = armorBuff;
//         creatureStats.magicBuff = magicBuff;
//         creatureStats.revivals = revivals;
//         creatureStats.charisma = charisma;
        
//         return creatureStats;
//     }

// }