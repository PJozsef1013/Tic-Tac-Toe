import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadGameComponent } from './load-game.component';
import { LoadGameRoutingModule } from './load-game-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoadGameComponent],
  imports: [CommonModule, LoadGameRoutingModule, FontAwesomeModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  exports: [LoadGameComponent]
})
export class LoadGameModule {}
