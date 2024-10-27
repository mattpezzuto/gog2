
import { CreaturePool } from './creaturePool.model';
import { Player } from './player.model';

export class GameState {
    stage: number;
    turn: number;
    playerList: Player[];
    creaturePool: CreaturePool;

    constructor(stage: number, turn: number, playerList: Player[], creaturePool: CreaturePool) {
        this.stage = stage;
        this.turn = turn;
        this.playerList = playerList;
        this.creaturePool = creaturePool;
    }

}