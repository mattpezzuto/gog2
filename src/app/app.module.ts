// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TitleScreenComponent } from './title-screen/title-screen.component';
import { TavernComponent } from './tavern/tavern.component';
import { BattleScreenComponent } from './battle-screen/battle-screen.component';
import { BattleScreenBossComponent } from './battle-screen-boss/battle-screen-boss.component';
import { SelectQuestComponent } from './select-quest/select-quest.component';
import { BattleScreenQuestComponent } from './battle-screen-quest/battle-screen-quest.component';
import { ScoreScreenComponent } from './score-screen/score-screen.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TitleScreenComponent,
    TavernComponent,
    BattleScreenComponent,
    BattleScreenBossComponent,
    SelectQuestComponent,
    BattleScreenQuestComponent,
    ScoreScreenComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
