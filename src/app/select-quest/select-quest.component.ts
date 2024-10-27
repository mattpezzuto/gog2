import { Component, Input, OnInit } from '@angular/core';
import { Creature, CreatureType } from '../creatures/creature';
import { GameState } from '../gameState.model';
import { QuestRewardType } from '../quest-rewards';
import { CommonModule } from '@angular/common';
import { Wizard } from '../creatures/wizard';
import { SkeletonWarrior } from '../creatures/skeletonWarrior';
import { Dragon } from '../creatures/dragon';
import { FrostGiant } from '../creatures/frostGiant';
import { Kobold } from '../creatures/kobold';
import { Goblin } from '../creatures/goblin';
import { InfestedRat } from '../creatures/infestedRat';
import { GoldPile } from '../creatures/goldPile';
import { PurpleWand } from '../creatures/purleWand';
import { Recruitment } from '../creatures/recruitment';
import { Refresh } from '../creatures/refresh';
import { NoRats } from '../creatures/noRats';
import { GlobalBuffService } from '../globalBuffService';

@Component({
  selector: 'app-select-quest',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-quest.component.html',
  styleUrl: './select-quest.component.css'
})
export class SelectQuestComponent implements OnInit {

  @Input() localGameState!: GameState;
  @Input() globalBuffService!: GlobalBuffService;

  battleLogs: String[] = [];
  titleLog: String = "";

  questCreature: Creature[] = [];
  questUnits: number[] = [];
  questRewards: string[] = [];
  questRewardImages1: Creature[] = [];
  questRewardImages2: Creature[] = [];
  questRewardImages3: Creature[] = [];
  questRewardImages4: Creature[] = [];
  questRewardImages5: Creature[] = [];

  constructor() {
   }

  getLowest(range: number, times: number) : number {
    var result: number = range;
    for (var i = 0; i< times; i++) {
      var roll = Math.floor(Math.random()*range);
      if (roll < result) { 
        result = roll;
      }
    }
    return result;
  }

  getRandom(start: number, end: number) : number {
    var result = Math.floor(Math.random() * (end - start + 1) + start);
    console.log('inRandom, start, end, rnd = ' + start + end + result);
    return result;
  }

  getQuestRewardList(questNum: number) : Creature[] {
    var creatureList: Creature[] = [];
    switch(questNum) {
      case QuestRewardType['Gold - 10g']:
        creatureList.push(new GoldPile(this.globalBuffService)); break;
      case QuestRewardType['Gold - 25g']:
        creatureList.push(new GoldPile(this.globalBuffService)); break;
      case QuestRewardType['Gold - 50g']:
        creatureList.push(new GoldPile(this.globalBuffService)); 
        creatureList.push(new GoldPile(this.globalBuffService)); break;
      case QuestRewardType['Remove Infested Rat']:
        creatureList.push(new NoRats(this.globalBuffService)); break;
      case QuestRewardType['Gold - 75g']:
        creatureList.push(new GoldPile(this.globalBuffService));   
        creatureList.push(new GoldPile(this.globalBuffService)); 
        creatureList.push(new GoldPile(this.globalBuffService)); break;
      case QuestRewardType['Gold - 100g']:
        creatureList.push(new GoldPile(this.globalBuffService));   
        creatureList.push(new GoldPile(this.globalBuffService));   
        creatureList.push(new GoldPile(this.globalBuffService)); 
        creatureList.push(new GoldPile(this.globalBuffService)); break;
      case QuestRewardType['Extra Refresh']:
        creatureList.push(new Refresh(this.globalBuffService)); break;
      case QuestRewardType['Recruit Unit']:
        creatureList.push(new Recruitment(this.globalBuffService)); break;
      case QuestRewardType['Purple Wand']:
        creatureList.push(new PurpleWand(this.globalBuffService)); break;
      default:
        console.log('error');
    }
    return creatureList;
  }

  ngOnInit() {
    this.battleLogs = [];

    var rollsPerSlot = [5, 3, 2, 1, 1];

    for (var i = 0; i < 5; i++) {
      var rndCreature = this.getRandom(1 + i, 3+i);
      console.log('rndCreature=' + rndCreature);
      switch(rndCreature) {
        case 1:
          this.questCreature.push(new InfestedRat(this.globalBuffService)); break;
        case 2:
          this.questCreature.push(new Goblin(this.globalBuffService)); break;
        case 3:
          this.questCreature.push(new Kobold(this.globalBuffService)); break;
        case 4:
          this.questCreature.push(new SkeletonWarrior(this.globalBuffService)); break;
        case 5:
          this.questCreature.push(new FrostGiant(this.globalBuffService)); break;
        case 6:
          this.questCreature.push(new Wizard(this.globalBuffService)); break;
        case 7:
          this.questCreature.push(new Dragon(this.globalBuffService)); break;
        default:
          console.log('error');
      }
      // this.questCreature.push(new Creature(CreatureType.InfestedRat));
      this.questUnits.push(this.getRandom(1+i, 5+i));
      var questNum = Math.min(this.getRandom(i, (1+i)*2), (Object.keys(QuestRewardType).length/2 - 1));
      console.log('questNum=' + questNum);
      this.questRewards.push(QuestRewardType[questNum]);
      switch (i) {
        case 0:  this.questRewardImages1 = this.getQuestRewardList(questNum); break;
        case 1:  this.questRewardImages2 = this.getQuestRewardList(questNum); break;
        case 2:  this.questRewardImages3 = this.getQuestRewardList(questNum); break;
        case 3:  this.questRewardImages4 = this.getQuestRewardList(questNum); break;
        case 4:  this.questRewardImages5 = this.getQuestRewardList(questNum); break;
      }
      
      console.log('keys=' + Object.keys(QuestRewardType).length/2);
    }
  }

  onSelectQuest(slot: number) {
    var listSlot:number = slot -1;
    this.localGameState.playerList[0].questCreature = this.questCreature[listSlot];
    this.localGameState.playerList[0].questUnits = this.questUnits[listSlot];
    const questKey:string = this.questRewards[listSlot];
    this.localGameState.playerList[0].questReward = QuestRewardType[questKey as keyof typeof QuestRewardType];
    this.localGameState.stage++;
  }

  onNext() {
    // this.localGameState.stage++;
  }

}

