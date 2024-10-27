import { Archer } from './creatures/archer';
import { Creature, CreatureType } from './creatures/creature';
import { Dragon } from './creatures/dragon';
import { Gnome } from './creatures/gnome';
import { Goblin } from './creatures/goblin';
import { InfestedRat } from './creatures/infestedRat';
import { Kobold } from './creatures/kobold';
import { Orc } from './creatures/orc';
import { GearType } from './gear';
import { Buff, GlobalBuffService } from './globalBuffService';
import { Player } from './player.model';

export class Battle {
    player1: Player;
    player2: Player;

    titleLog: string;
    battleLogs: string[] = [];

    // creatureListTeam1: Creature[] = [];
    // creatureListTeam2: Creature[] = [];

    pDamageDoneTeam1: number = 0;
    mDamageDoneTeam1: number = 0;
    pDamageDoneTeam2: number = 0;
    mDamageDoneTeam2: number = 0;

    creaturePool: Creature[] = [];
    globalBuffService: GlobalBuffService;

    constructor(globalBuffService:GlobalBuffService, player1: Player, player2: Player, creaturePool: Creature[]) {
        this.globalBuffService = globalBuffService;
        this.player1 = player1;
        this.player2 = player2;
        this.creaturePool = creaturePool;
        this.titleLog = '';
    }

    getNumberOf(team: Creature[], creatureType: CreatureType) {
      var total: number = 0;
      for (var i = 0; i< team.length; i++) {
        if (team[i].creatureType === creatureType) {
          total++;
        }
      }
      return total;
    }

    getRevivalCount(team: Creature[]): number {
      var count: number = 0;
      for (var i = 0; i < team.length; i++) {
          count+= team[i].getCurrentStats().revivals;
      }
      return count;
    }


    preCombatBuffs() {
      const necrosOnTeam1: number = this.player1.creatureList.filter(c=> c.creatureType === CreatureType.Necromancer).length;
      const necrosOnTeam2: number = this.player2.creatureList.filter(c=> c.creatureType === CreatureType.Necromancer).length;
      for (var i = 0; i< necrosOnTeam1; i++) {
        if (this.player1.creatureList[i].getCurrentStats().revivals > 0) {
          this.player1.creatureList[i].getCurrentStats().revivals += necrosOnTeam1;
        }
      }
      for (var i = 0; i< necrosOnTeam2; i++) {
        if (this.player2.creatureList[i].getCurrentStats().revivals > 0) {
          this.player2.creatureList[i].getCurrentStats().revivals += necrosOnTeam2;
        }
      }
      const highCharismaCountTeam1: number = this.player1.creatureList.filter(c => c.getCurrentStats().charisma > 14).length;
      const highCharismaCountTeam2: number = this.player2.creatureList.filter(c => c.getCurrentStats().charisma > 14).length;
      var rivialCountTeam1: number = this.getRevivalCount(this.player1.creatureList);
      var rivialCountTeam2: number = this.getRevivalCount(this.player2.creatureList);

      for (var i = 0; i< this.player1.creatureList.length; i++) {
        if (this.player1.creatureList[i].creatureType === CreatureType.Elaron) {
          this.player1.creatureList[i].getCurrentStats().magicAttack = 5 * highCharismaCountTeam1;
        }
        if (this.player1.creatureList[i].creatureType === CreatureType.Mortiserion) {
          this.player1.creatureList[i].getCurrentStats().attack = 5 * rivialCountTeam1;
          this.player1.creatureList[1].getCurrentStats().magicAttack = rivialCountTeam1;
        }
      }

      for (var i = 0; i< this.player2.creatureList.length; i++) {
        if (this.player2.creatureList[i].creatureType === CreatureType.Elaron) {
          this.player2.creatureList[i].getCurrentStats().magicAttack = 5 * highCharismaCountTeam2;
        }
        if (this.player2.creatureList[i].creatureType === CreatureType.Mortiserion) {
          this.player2.creatureList[i].getCurrentStats().attack = 5 * rivialCountTeam2;
          this.player2.creatureList[1].getCurrentStats().magicAttack = rivialCountTeam2;
        }
      }

    }

    getNumberOfRats(): number {
      var numberOfRats: number = 0;
      for (var i = 0; i < this.creaturePool.length; i++) {
        if (this.creaturePool[i].creatureType === CreatureType.InfestedRat) {
          numberOfRats++;
        }
      }
      return numberOfRats;
    }

    resetTeam(team: Creature[]) : void {
      team.forEach(val => {
        console.log('val.name' + val.getName());
        val.reset();
      });
    }

    getTeam(team: Creature[]): Creature[] {
      var newTeam: Creature[] = [];
      team.forEach(val => {
        if (val.creatureType !== CreatureType.TrojanHorse) {
          newTeam.push(val);
        } else {
          var trojanHorseList: Creature[] = [];
          var trojanHorseKey = Math.floor(Math.random() * 3 + 1);
          switch (trojanHorseKey) {
            case 0:
              trojanHorseList.push(new InfestedRat(this.globalBuffService));
              trojanHorseList.push(new InfestedRat(this.globalBuffService));
              trojanHorseList.push(new Kobold(this.globalBuffService));
              break;
            case 1:
              trojanHorseList.push(new Goblin(this.globalBuffService));
              trojanHorseList.push(new Gnome(this.globalBuffService));
              if (this.creaturePool.length > 40) {
                trojanHorseList.push(new Archer(this.globalBuffService));
              }
              trojanHorseList.push(new Orc(this.globalBuffService));
              break;
            case 2:
              trojanHorseList.push(new Goblin(this.globalBuffService));
              trojanHorseList.push(new Gnome(this.globalBuffService));
              if (this.creaturePool.length > 50) {
                trojanHorseList.push(new Dragon(this.globalBuffService));
              } else {
                trojanHorseList.push(new Orc(this.globalBuffService));
              }
              break;
          }

        //   var trojanHorsePool: Creature[] = [];
        //   var numberOfRatsInCreaturePool = this.getNumberOfRats() + 3;
        //   for (var i = 0; i < numberOfRatsInCreaturePool; i++) {
        //     trojanHorsePool.push(new InfestedRat());
        //   }
        //   trojanHorsePool.push(new Kobold());
        //   trojanHorsePool.push(new Gnome());
        //   trojanHorsePool.push(new Orc());
        //   trojanHorsePool.push(new Goblin());

        //   if (this.creaturePool.length > 40) {
        //     trojanHorsePool.push(new Archer());
        //   }

        //   if (this.creaturePool.length > 45) {
        //     trojanHorsePool.push(new Archer());
        //   }

        //   if (this.creaturePool.length > 50) {
        //     trojanHorsePool.push(new Dragon());
        //   }

        //   if (this.creaturePool.length > 55) {
        //     trojanHorsePool.push(new Dragon());
        //   }

        //   var unitList: string[] = [];
        //   for (var i = 0; i < 3; i++) {
        //     var slot = Math.floor(Math.random() * trojanHorsePool.length);
        //     newTeam.push(new Creature([slot].creatureType));
        //     unitList.push(newTeam[i].getName());
        //   }
        //   this.battleLogs.push("The following creatures jump out of the trojan horse:  " + unitList[0] + ", " + unitList[1] + ", & " + unitList[2]);
        for (var i = 0; i < 3; i++) {
          newTeam.push(trojanHorseList[i]);
        }

        this.battleLogs.push("The following creatures jump out of the trojan horse:  " + trojanHorseList[0] + ", " + trojanHorseList[1] + ", & " + trojanHorseList[2]);

        }

      });
      console.log('returning new team len = ' + newTeam.length);
      return newTeam;
    }

    performBattle() {

          // For some reason val=>Object.get creates a copy, but doesn't copy the methods that go along with the class
          
          // this.creatureListTeam1 = this.getTeam(this.player1.creatureList);
          // this.creatureListTeam2 = this.getTeam(this.player2.creatureList);
          this.resetTeam(this.player1.creatureList);
          this.resetTeam(this.player2.creatureList);
          
          var done: boolean = false;
    
          this.titleLog = 
            this.player1.name + "(" + this.player1.creatureList.length + ")  vs. " 
            + this.player2.name + "(" + this.player2.creatureList.length + ")";

          this.preCombatBuffs();
    
          if (this.player1.creatureList.length === 0 || this.player2.creatureList.length === 0) {
            done = true;
          }
    
          var isTurnTeam1 = this.doesTeamOneGoFirst(this.player1.creatureList, this.player2.creatureList); 
          
          var loopTimeOutCounter = 0;
          var attackPosTeam1: number = 0, attackPosTeam2: number = 0;
    
          while (!done) {
            loopTimeOutCounter++;
            if (loopTimeOutCounter > 1000) {
              done = true;
            }
    
            console.log('isTurnTeam1 = ' + isTurnTeam1);
    
            console.log('attackPosTeam1 = ' + attackPosTeam1 + ', team1.size = ' + this.player1.getAliveCount() + ', team2.size = ' + this.player2.getAliveCount());
            if (isTurnTeam1) {
              this.performAttack(isTurnTeam1, this.player1, attackPosTeam1, this.player2);
              attackPosTeam1++;
              if (attackPosTeam1 > this.player1.creatureList.length -1) { attackPosTeam1 = 0; }
            } else {
              this.performAttack(isTurnTeam1, this.player2, attackPosTeam2, this.player1);
              attackPosTeam2++;
              if (attackPosTeam2 > this.player2.creatureList.length -1) { attackPosTeam2 = 0; }
            }
            isTurnTeam1 = !isTurnTeam1;
        
            // for (var i = deathsOnTeam2.length;  i >  0; i--) {
            //   var deathIndex = deathsOnTeam2[i - 1];
            //   this.battleLogs.push(
            //     "..." + this.player2.creatureList[deathIndex].getName() + " dies"
            //   );
              // this.creatureListTeam2.splice(deathIndex, 1);
              // if (attackPosTeam2 >= deathIndex) {
              //   attackPosTeam2 = Math.max(attackPosTeam2-1, 0);
              // }
            // } 
            console.log('Team counts:  ' + this.player1.getAliveCount() + ':' + this.player2.getAliveCount());
            if (this.player1.getAliveCount() === 0 || this.player2.getAliveCount() === 0 ) {
              done = true;
            }
          }
    }

    getWinner() : number {
        var winner:number = -1;  // assume tie
        if (this.player1.getAliveCount() === 0 && this.player2.getAliveCount() > 0 ) {
          winner = 1;
        } else if (this.player1.getAliveCount() > 0 && this.player2.getAliveCount() === 0 ) {
          winner = 0;
        }
        return winner;
    }

    getBattleLogs(): string[] { console.log('bl.len = ' + this.battleLogs.length); return this.battleLogs; }

    processRevivals(team: Creature[], playersName: string) {
        for (var i = 0; i < team.length; i++) {
          console.log('revivals = ' + team[i].getCurrentStats().revivals);
          if (team[i].getCurrentStats().life < 1 && team[i].getCurrentStats().revivals > 0) {
            team[i].getCurrentStats().revivals--;
            team[i].getCurrentStats().life = team[i].getCreatureStats().life / 2;
            console.log('new life total = ' + team[i].getCurrentStats().life + ', ' + team[i].getCreatureStats().life);
            this.battleLogs.push("..." + team[i].getName() + "(" + playersName + ") dies, but revives at half health.");
          }
        }
      }
    // processRevivals(team: Creature[], playersName: string) : Creature[] {
    //   for (var i = 0; i < team.length; i++) {
    //     console.log('revivals = ' + team[i].getCurrentStats().revivals);
    //     if (team[i].getCurrentStats().life < 1 && team[i].getCurrentStats().revivals > 0) {
    //       team[i].getCurrentStats().revivals--;
    //       team[i].getCurrentStats().life = team[i].getCreatureStats().life / 2;
    //       console.log('new life total = ' + team[i].getCurrentStats().life + ', ' + team[i].getCreatureStats().life);
    //       this.battleLogs.push("..." + team[i].getName() + "(" + playersName + ") dies, but revives at half health.");
    //     }
    //   }
    //   return team;
    // }

    // getDeathsOnTeam(team: Creature[]) : number[] {
    //     var deaths: number[] = [];
    //     for (var i = 0; i < team.length; i++) {
    //       if (team[i].getCurrentStats().life < 1) {
    //           deaths.push(i);
    //       }
    //     }
    //     return deaths;
    //   }



    performAttack(isTurnTeam1: boolean, attackPlayer: Player, attackTeamPos: number, defendPlayer: Player) {    
        if (attackPlayer.creatureList[attackTeamPos].getCurrentArmorBuff() > 0 ) {
          for(var i = 0; i< attackPlayer.creatureList.length; i++) {
            attackPlayer.creatureList[i].getCurrentStats().armor += attackPlayer.creatureList[attackTeamPos].getCurrentArmorBuff();
          }
          attackPlayer.creatureList[attackTeamPos].getCurrentStats().armorBuff = 0;

          this.logBuffAction(attackPlayer.name, attackPlayer.creatureList[attackTeamPos].getName());
        } else if (attackPlayer.creatureList[attackTeamPos].getCurrentLifeBuff() > 0 ) {
              for(var i = 0; i< attackPlayer.creatureList.length; i++) {
                attackPlayer.creatureList[i].getCurrentStats().life += attackPlayer.creatureList[attackTeamPos].getCurrentLifeBuff();
              }
              attackPlayer.creatureList[attackTeamPos].getCurrentStats().lifeBuff = 0;
              this.logBuffAction(attackPlayer.name, attackPlayer.creatureList[attackTeamPos].getName());
              if (attackPlayer.creatureList[attackTeamPos].creatureType === CreatureType.TreeOfLife) {
                var buff: Buff = { attackIncrease: 0, healthIncrease: 1, appliesTo: "TreeOfLife" };
                this.globalBuffService.addGlobalBuff(attackPlayer.name, buff);
              }
        } else {
          var targetIndex = this.getTargetIndex(defendPlayer.creatureList);
          console.log('targetIndex = ' + targetIndex);
          if (attackPlayer.creatureList[attackTeamPos].getCurrentStats().attack > 0) {
            var dmgDone = this.performPhysicalAttack(attackPlayer.creatureList, attackTeamPos, defendPlayer.creatureList, targetIndex, attackPlayer.name, defendPlayer.name);
            if (attackPlayer.creatureList[attackTeamPos].getCreatureType() === CreatureType.Orc) {
              attackPlayer.creatureList[attackTeamPos].incrementAttackDamage(1);
              console.log('Orc increased AttDmg:  ' + attackPlayer.creatureList[attackTeamPos].getPermanentAttackBuff());  
            }
            if (isTurnTeam1) { this.pDamageDoneTeam1+= dmgDone; } else { this.pDamageDoneTeam2+=dmgDone;}
          }
          if (attackPlayer.creatureList[attackTeamPos].getCurrentStats().magicAttack > 0 ) {
            var dmgDone = this.performMagicAttack(attackPlayer.creatureList, attackTeamPos, defendPlayer.creatureList, targetIndex, attackPlayer.name, defendPlayer.name);
            if (isTurnTeam1) { this.mDamageDoneTeam1+= dmgDone; } else { this.mDamageDoneTeam2+=dmgDone;}
          }
          // check for revivals
          this.processRevivals(attackPlayer.creatureList, attackPlayer.name);
          this.processRevivals(defendPlayer.creatureList, defendPlayer.name);
          if (!defendPlayer.creatureList[targetIndex].isAlive()) {
              this.battleLogs.push(
                "..." + defendPlayer.creatureList[targetIndex].getName() + " dies");
          }

        
      }              
}

getDamageDone(team: number) {
    if (team === 0) {
        return this.pDamageDoneTeam1 + this.mDamageDoneTeam1;
    } else {
        return this.pDamageDoneTeam2 + this.mDamageDoneTeam2;
    }
}

getTauntIndexes(team: Creature[]) : number[] {
  var indexes: number[] = [];
  for (var i = 0; i< team.length; i++) {
    if (team[i].getGear() !== null && team[i].getGear().gearType === GearType.Taunt) {
      indexes.push(i);
    }
  }
  return indexes;
}
getTargetIndex(defedningTeam: Creature[]) : number {
  var index: number = 0;
  var tauntIndex: number[] = this.getTauntIndexes(defedningTeam);
  if (tauntIndex.length === 0) {
    index = Math.floor(Math.random() * defedningTeam.length); 
  } else if (tauntIndex.length === 1) {
    index = tauntIndex[0];
  } else {
    index = tauntIndex[ Math.floor(Math.random() * tauntIndex.length) ];
  }
  return index;
}

performPhysicalAttack(creatureListAttackTeam: Creature[], attackTeamPos: number, creatureListDefenderTeam: Creature[], targetIndex: number, attackPlayerName: string, defendPlayerName: string)
: number {
    var dodgedDefenderTeam: boolean = this.doesDefenderDodge(creatureListDefenderTeam[targetIndex].getCurrentStats().dex);
    var dmgDone = 0;
    if (!dodgedDefenderTeam) {
        dmgDone = this.getDamageAfterArmorCheck(creatureListAttackTeam, attackTeamPos, creatureListDefenderTeam);
        creatureListDefenderTeam[targetIndex].getCurrentStats().life = creatureListDefenderTeam[targetIndex].getCurrentStats().life - dmgDone;
        this.battleLogs.push(creatureListAttackTeam[attackTeamPos].getName() + "(" + attackPlayerName + ") deals " + dmgDone + " physical damage to " + 
          creatureListDefenderTeam[targetIndex].getName() + "(" + defendPlayerName + ")");
    } else {
        this.battleLogs.push(creatureListAttackTeam[attackTeamPos].getName() + "(" + attackPlayerName + ") attacks " + 
          creatureListDefenderTeam[targetIndex].getName() + "(" + defendPlayerName + ").  Dodged");
    }
    return dmgDone;
}

performMagicAttack(creatureListAttackTeam: Creature[], attackTeamPos: number, creatureListDefenderTeam: Creature[], targetIndex: number, attackPlayerName: string, defendPlayerName: string)
: number {

  var dmg = this.getDamageAfterMagicResistCheck(creatureListAttackTeam, attackTeamPos, creatureListDefenderTeam);
  creatureListDefenderTeam[targetIndex].getCurrentStats().life = creatureListDefenderTeam[targetIndex].getCurrentStats().life - dmg; 
  this.battleLogs.push(creatureListAttackTeam[attackTeamPos].getName() + "(" + attackPlayerName + ") deals " + dmg + " magic damage to " +
  creatureListDefenderTeam[targetIndex].getName() + "(" + defendPlayerName + ")");
  return dmg;
}

getDamageAfterArmorCheck(attackerTeam: Creature[], attackTeamPos: number, defenderTeam: Creature[]): number {
var dmg = attackerTeam[attackTeamPos].getCurrentStats().attack;
if (defenderTeam[0].getCurrentStats().armor > 0) {
dmg = Math.max(dmg - defenderTeam[0].getCurrentStats().armor, 0);
defenderTeam[0].getCurrentStats().armor--;
}
console.log('Reduced ' + (attackerTeam[attackTeamPos].getCurrentStats().attack - dmg) + ' damage');
return dmg;
}

getDamageAfterMagicResistCheck(attackerTeam: Creature[], attackTeamPos: number, defenderTeam: Creature[]): number {
var reducedDmg = attackerTeam[attackTeamPos].getCurrentStats().magicAttack * defenderTeam[0].getCurrentStats().magicResist / 100;
var dmg = attackerTeam[attackTeamPos].getCurrentStats().magicAttack - reducedDmg;
console.log('Reduced ' + reducedDmg + ' damage');
return dmg;
}

doesDefenderDodge(dex: number): boolean {
var dodged: boolean = false;
if (Math.floor(Math.random() * 8000 + 1) < dex * dex * dex) {       // 20^3 dex^3 max = 72%
dodged = true;
}
return dodged;
}

doesTeamOneGoFirst(creatureListTeam1: Creature[], creatureListTeam2: Creature[]) : boolean {
var isTurnTeam1 = true;
var dexTeam1 = this.getTotalDexForTeam(creatureListTeam1);
var dexTeam2 = this.getTotalDexForTeam(creatureListTeam2);
if (dexTeam2 > dexTeam1) {
isTurnTeam1 = false;
}
return isTurnTeam1;
}

getTotalDexForTeam(creatureList: Creature[]) {
    var total = 0;
    for (var i = 0; i < creatureList.length; i++) {
        total += creatureList[i].getCreatureStats().dex;
    }
}
    
logBuffAction(playerName: string, creatureName: string) {
    this.battleLogs.push(
      creatureName + "(" + playerName + ") buffs the party. "
    );
}


}