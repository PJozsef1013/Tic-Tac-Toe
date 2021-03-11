import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResultAnnouncementComponent } from './result-announcement.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ResultAnnouncementComponent],
  imports: [CommonModule, MatButtonModule],
  exports: [ResultAnnouncementComponent]
})
export class ResultAnnouncementModule {}
