import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SaveGameComponent } from './save-game.component';

@NgModule({
  declarations: [SaveGameComponent],
  imports: [CommonModule, MatInputModule, FormsModule, MatFormFieldModule, MatButtonModule, FontAwesomeModule],
  exports: [SaveGameComponent]
})
export class SaveGameModule {}
