import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModifyGameComponent } from './modify-game.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ModifyGameComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ModifyGameComponent]
})
export class ModifyGameModule {}
