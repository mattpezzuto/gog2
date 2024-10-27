import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Battle } from '../battle';
import { Creature } from '../creatures/creature';
import { GameState } from '../gameState.model';
import { Player } from '../player.model';
import { QuestRewardType } from '../quest-rewards';
import Utils from '../utils';
import { GlobalBuffService } from '../globalBuffService';

@Component({
  selector: 'app-battle-screen-quest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-screen-quest.component.html',
  styleUrl: './battle-screen-quest.component.css'
})
export class BattleScreenQuestComponent implements OnInit {

  @Input() localGameState!: GameState;
  @Input() globalBuffService!: GlobalBuffService;

  battleLogs: String[] = [];
  battleLogsDetail: String[] = [];
  battleLogsResult: String[] = [];
  logsToggle: boolean = false;
  titleLog: String = "";

  constructor() { }

  ngOnInit() {
    this.battleLogs = [];
    this.battleLogsResult = [];
    this.battleLogsDetail = [];
    this.logsToggle = true;

    let playerIndexList: number[] = [];
    for (var i : number = 1; i < 8; i++) {
      playerIndexList.push(i);
    }
    let randomPlayerList = this.shuffle(playerIndexList);
    randomPlayerList.push(0);
    console.log('randomPlayerList: ' + randomPlayerList);

      var questPlayer : Player = new Player("Quest", true);
      for (var i = 0; i< this.localGameState.playerList[0].questUnits; i++) {
        var newQuestCreature = this.localGameState.playerList[0].questCreature.clone();
        questPlayer.creatureList.push(newQuestCreature);
      }

      var battle: Battle = new Battle(this.globalBuffService, this.localGameState.playerList[0], questPlayer, this.localGameState.creaturePool.tier1.length);

      battle.performBattle();
      var winner = battle.getWinner();
      this.battleLogsDetail = battle.getBattleLogs();
      var dmgDone1 = battle.getDamageDone(0);
      var dmgDone2 = battle.getDamageDone(1);

      console.log('dmgDones = ' + dmgDone1 + ', ' + dmgDone2);

      if (winner === 0) {
        switch(this.localGameState.playerList[0].questReward) {
          case QuestRewardType['Gold - 10g']:
            this.localGameState.playerList[0].gold += 10; break;
          case QuestRewardType['Gold - 25g']:
            this.localGameState.playerList[0].gold += 25; break;
          case QuestRewardType['Gold - 50g']:
            this.localGameState.playerList[0].gold += 50; break;
          case QuestRewardType['Gold - 75g']:
            this.localGameState.playerList[0].gold += 75; break;
          case QuestRewardType['Gold - 100g']:
            this.localGameState.playerList[0].gold += 100; break;
          case QuestRewardType['Extra Refresh']:
            this.localGameState.playerList[0].refreshCounter += 1; break;
          case QuestRewardType['Recruit Unit']:
            this.localGameState.creaturePool.tier1.push(Utils.upgradeRecruitment(this.globalBuffService));
            break;
          case QuestRewardType['Remove Infested Rat']:
            console.log('tier1 len = ' + this.localGameState.creaturePool.tier1.length);
            var slot = Utils.findFirstRatSlot(this.localGameState.creaturePool.tier1);
            console.log('slot = ' + slot);
            if (slot > 0 && slot < this.localGameState.creaturePool.tier1.length) {
              console.log('tier1 len = ' + this.localGameState.creaturePool.tier1.length);
              this.localGameState.creaturePool.removeCreatureFromPool(slot);
              console.log('tier1 len = ' + this.localGameState.creaturePool.tier1.length);
            }
            break;
          default:
            console.log('error:  should never get here');
        }
      this.battleLogsResult.push( this.localGameState.playerList[0].name + " completes the quest.");
      
    } else {
      this.battleLogsResult.push( this.localGameState.playerList[0].name + " fails the quest.");

    }
    this.battleLogs = this.battleLogsResult;

  }
  
  shuffle <T>(array: T[]): T[] {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
};

onToggleBattleLog() {
  if (this.logsToggle) {
    this.battleLogs = this.battleLogsDetail;
  } else {
    this.battleLogs = this.battleLogsResult;
  }
  this.logsToggle = !this.logsToggle;
}

onNext() {
    ++this.localGameState.stage;
  }

}

