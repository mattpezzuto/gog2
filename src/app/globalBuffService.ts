import { Injectable } from "@angular/core";

export interface Buff {
    attackIncrease: number;
    healthIncrease: number;
    appliesTo: string | "ALL"; // Type of creature or "ALL"
  }
  
  // This ensures the service is injectable and available in DI
  @Injectable({
    providedIn: 'root', // This makes it a singleton service available throughout the app
  })
  
  export class GlobalBuffService {
    private playerBuffs: Map<string, Buff[]> = new Map();
  

    addGlobalBuff(playerId: string, buff: Buff): void {
      const buffs = this.playerBuffs.get(playerId) || [];
      buffs.push(buff);
      this.playerBuffs.set(playerId, buffs);
    }
  
    // Calculate total attack buff for a specific type
    getGlobalAttackBuff(playerId: string, type: string): number {
      const buffs = this.playerBuffs.get(playerId) || [];
      return buffs
        .filter(buff => buff.appliesTo === type || buff.appliesTo === "ALL")
        .reduce((total, buff) => total + buff.attackIncrease, 0);
    }
  
    // Calculate total health buff for a specific type
    getGlobalLifeBuff(playerId: string, type: string): number {
      const buffs = this.playerBuffs.get(playerId) || [];
      console.log('getting life buff for: ' + type + ', ' + buffs.length);
      return buffs
        .filter(buff => buff.appliesTo === type || buff.appliesTo === "ALL")
        .reduce((total, buff) => total + buff.healthIncrease, 0);
    }
  }
  