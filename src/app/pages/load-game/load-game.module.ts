import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadGameComponent } from './load-game.component';
import { LoadGameRoutingModule } from './load-game-routing.module';

@NgModule({
  declarations: [LoadGameComponent],
  imports: [CommonModule, LoadGameRoutingModule],
  exports: [LoadGameComponent]
})
export class LoadGameModule {}
