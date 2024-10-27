import { Component, Input, OnInit } from '@angular/core';
import { GameState } from '../gameState.model';
import { Player } from '../player.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-score-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './score-screen.component.html',
  styleUrl: './score-screen.component.css'
})
export class ScoreScreenComponent implements OnInit {
  @Input()
  localGameState!: GameState;

  sortedPlayerList: Player[] = [];
  sortedBossDmgList: Player[] = [];
  bottomHalfList: String[] = [];

  constructor() { }

  ngOnInit() {
    let currentPlayerList : Player[] = [];
    for(var i=0; i<this.localGameState.playerList.length; i++) {
      currentPlayerList.push(this.localGameState.playerList[i])
    }
    this.sortedPlayerList = currentPlayerList.sort((a,b) => {
      if (b.life === a.life ) {
        return b.wins - a.wins;
      }
      return b.life - a.life;
    });

    currentPlayerList = [];
    for(var i=0; i<this.localGameState.playerList.length; i++) {
      currentPlayerList.push(this.localGameState.playerList[i])
    }

    this.sortedBossDmgList = currentPlayerList.sort((a,b) => {
      if (b.bossDmg === a.bossDmg) {
        return 0;
      }
      return b.bossDmg - a.bossDmg;
    });

    console.log('players creature list length = ' + this.localGameState.playerList[0].creatureList.length);
    // Print Player List
    for(var i = 0; i<this.localGameState.playerList[0].creatureList.length; i++) {
      console.log(this.localGameState.playerList[0].creatureList[i].getName());
    }

  }

  onNext() {
    this.localGameState.turn++;
    this.localGameState.stage = 2;
  }

}

