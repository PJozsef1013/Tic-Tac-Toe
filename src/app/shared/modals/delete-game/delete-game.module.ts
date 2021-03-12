import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteGameComponent } from './delete-game.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [DeleteGameComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [DeleteGameComponent]
})
export class DeleteGameModule {}
