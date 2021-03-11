import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameRulesComponent } from './game-rules.component';
import { GameRulesRoutingModule } from './game-rules-routing.module';

@NgModule({
  declarations: [GameRulesComponent],
  imports: [CommonModule, GameRulesRoutingModule],
  exports: [GameRulesComponent]
})
export class GameRulesModule {}
