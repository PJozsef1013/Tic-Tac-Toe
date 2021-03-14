import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadGameComponent } from './load-game.component';
import { LoadGameRoutingModule } from './load-game-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { DeleteGameModule } from 'src/app/shared/modals/delete-game/delete-game.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [LoadGameComponent],
  imports: [
    CommonModule,
    LoadGameRoutingModule,
    FontAwesomeModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    DeleteGameModule,
    MatTooltipModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  exports: [LoadGameComponent]
})
export class LoadGameModule {}
