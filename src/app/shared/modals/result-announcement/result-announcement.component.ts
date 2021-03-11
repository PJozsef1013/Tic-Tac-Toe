import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-result-announcement',
  templateUrl: './result-announcement.component.html',
  styleUrls: ['./result-announcement.component.scss']
})
export class ResultAnnouncementComponent {
  constructor(private dialogRef: MatDialogRef<ResultAnnouncementComponent>, @Inject(MAT_DIALOG_DATA) public data: string) {}

  close(): void {
    this.dialogRef.close();
  }
}
