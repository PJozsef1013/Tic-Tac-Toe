import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayGameComponent } from './play-game.component';
import { PlayGameRoutingModule } from './play-game-routing.module';
import { ResultAnnouncementModule } from 'src/app/shared/modals/result-announcement/result-announcement.module';
import { MatButtonModule } from '@angular/material/button';
import { BoardModule } from 'src/app/shared/components/board/board.module';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [PlayGameComponent],
  imports: [CommonModule, BoardModule, PlayGameRoutingModule, ResultAnnouncementModule, MatButtonModule, MatDialogModule],
  exports: [PlayGameComponent]
})
export class PlayGameModule {}
