import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.scss']
})
export class DeleteGameComponent {
  constructor(private dialogref: MatDialogRef<DeleteGameComponent>, @Inject(MAT_DIALOG_DATA) public data: number) {}

  deleteSavedGame(): void {
    this.dialogref.close(this.data);
  }

  close(): void {
    this.dialogref.close();
  }
}
