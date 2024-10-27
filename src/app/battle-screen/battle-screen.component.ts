import { Component, OnInit, Input } from '@angular/core';
import { GameState } from '../gameState.model';
import { Battle } from '../battle';
import { CommonModule } from '@angular/common';
import { GlobalBuffService } from '../globalBuffService';


@Component({
  selector: 'battle-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './battle-screen.component.html',
  styleUrls: ['./battle-screen.component.css']
})
export class BattleScreenComponent implements OnInit {

  @Input() localGameState!: GameState;
  @Input() globalBuffService!: GlobalBuffService;

  battleLogs: String[] = [];
  battleLogsDetail: String[] = [];
  battleLogsResult: String[] = [];
  logsToggle: boolean;
  titleLog: String;
  battle!: Battle;

  constructor() {
    this.battleLogs = [];
    this.battleLogsResult = [];
    this.logsToggle = true;
    this.titleLog = '';
   }

  ngOnInit() {


    let playerIndexList: number[] = [];
    for (var i : number = 1; i < 8; i++) {
      playerIndexList.push(i);
    }
    let randomPlayerList = this.shuffle(playerIndexList);
    randomPlayerList.push(0);
    console.log('randomPlayerList: ' + randomPlayerList);

    // Perform Matches
    for (var matchIndex = 0; matchIndex < 4; matchIndex++) {
      this.titleLog = "";
      this.battleLogs = [];

      const slotTeam1:number = randomPlayerList[0 + matchIndex*2];
      const slotTeam2:number = randomPlayerList[1 + matchIndex*2];

      console.log('slotTeam1=' + slotTeam1 + ' playerList[slotTeam1].name=' + this.localGameState.playerList[slotTeam1].name);
      console.log('slotTeam2=' + slotTeam2 + ' playerList[slotTeam2].name=' + this.localGameState.playerList[slotTeam2].name);

      this.battle = new Battle(this.globalBuffService, this.localGameState.playerList[slotTeam1], this.localGameState.playerList[slotTeam2], this.localGameState.creaturePool.getCreaturePool().length);

      this.battle.performBattle();
      var winner = this.battle.getWinner();
      this.battleLogsDetail = this.battle.getBattleLogs();
      var dmgDone1 = this.battle.getDamageDone(0);
      var dmgDone2 = this.battle.getDamageDone(1);

      console.log('dmgDones = ' + dmgDone1 + ', ' + dmgDone2);

      // this.localGameState.playerList[slotTeam1].

      var slotLoser:number;
      var slotWinner:number

      this.battleLogsResult.splice(0, this.battleLogsResult.length);  // clear
      if (winner === 0 ) {
        slotLoser = slotTeam2;
        slotWinner = slotTeam1;
        this.localGameState.playerList[slotWinner].incrementWins();
        this.localGameState.playerList[slotLoser].incrementLoses();
        this.battleLogsResult.push(
          this.localGameState.playerList[slotWinner].name + " (1)" + " beats " + this.localGameState.playerList[slotLoser].name + "."
        );
      --this.localGameState.playerList[slotLoser].life;
      } else if (winner === 1) {
          slotLoser = slotTeam1;
          slotWinner = slotTeam2;
          this.localGameState.playerList[slotWinner].incrementWins();
          this.localGameState.playerList[slotLoser].incrementLoses();
          this.battleLogsResult.push(
            this.localGameState.playerList[slotWinner].name + " (2)" +  " beats " + this.localGameState.playerList[slotLoser].name + "."
          );
        --this.localGameState.playerList[slotLoser].life;
      } else {
        this.localGameState.playerList[slotTeam1].incrementTies();
        this.localGameState.playerList[slotTeam2].incrementTies();
        this.battleLogsResult.push(
          this.localGameState.playerList[slotTeam1].name + " ties with " + this.localGameState.playerList[slotTeam2].name + "."
        );
      }
      
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
