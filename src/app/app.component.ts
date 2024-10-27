import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameState } from './gameState.model';
import { Player } from './player.model';
import { CreaturePool } from './creaturePool.model';
import { Creature, CreatureType } from './creatures/creature';
import { Goblin } from './creatures/goblin';
import { Kobold } from './creatures/kobold';
import { Orc } from './creatures/orc';
import { SkeletonWarrior } from './creatures/skeletonWarrior';
import { FrostGiant } from './creatures/frostGiant';
import { InfestedRat } from './creatures/infestedRat';
import { TreeOfLife } from './creatures/treeOfLife';
import { Wizard } from './creatures/wizard';
import { Bard } from './creatures/bard';
import { Necromancer } from './creatures/necromancer';
import { Archer } from './creatures/archer';
import { Gnome } from './creatures/gnome';
import { TrojanHorse } from './creatures/trojanHorse';
import { Dwarf } from './creatures/dwarf';
import { Genie } from './creatures/genie';
import { Sorcerous } from './creatures/sorcerous';
import { GlobalBuffService } from './globalBuffService';

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title: string;
  gameState: GameState;
  globalBuffService: GlobalBuffService;

  ngOnInit() {
  }


  constructor() {
    this.title = 'GoG';
    this.globalBuffService = new GlobalBuffService();
    let playerList: Player[] = [];
    let player = new Player("Russ", false);


    playerList.push(player);

    // Generate Computer Players
    for (var i = 1; i < 8; i++) {
      var playerName: string = "Player" + i;
      let compPlayer = new Player(playerName, true);      
      playerList.push(compPlayer);
    }
    
    var emptyCreaturePool: CreaturePool = new CreaturePool;
    this.gameState = new GameState(0, 1, playerList, emptyCreaturePool);
    this.createInitialCreaturePool();
    this.gameState.playerList = playerList;
    this.gameState.turn = 1;
    this.gameState.stage = 1;

  }

  createInitialCreaturePool(): Creature[] {
    let creatureList: Creature[] = [];
    for (var i = 0; i < 3; i++) {
    this.gameState.creaturePool.addCreatureToPool(1, new Gnome(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Goblin(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Kobold(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Dwarf(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new SkeletonWarrior(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Orc(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new FrostGiant(this.globalBuffService));

    this.gameState.creaturePool.addCreatureToPool(1, new TreeOfLife(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Wizard(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Necromancer(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Archer(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Bard(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new TrojanHorse(this.globalBuffService));
    }

    for(var i = 0; i < 8; i++) {
       this.gameState.creaturePool.addCreatureToPool(8, new InfestedRat(this.globalBuffService));
    }

    this.gameState.creaturePool.addCreatureToPool(1, new Genie(this.globalBuffService));
    this.gameState.creaturePool.addCreatureToPool(1, new Sorcerous(this.globalBuffService));

    return creatureList;
  }

}
