import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [BoardComponent],
  imports: [CommonModule, FontAwesomeModule],
  exports: [BoardComponent]
})
export class BoardModule {}
