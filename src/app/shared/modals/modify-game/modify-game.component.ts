import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardRequest } from '../../interfaces/board-request';

@Component({
  selector: 'app-modify-game',
  templateUrl: './modify-game.component.html',
  styleUrls: ['./modify-game.component.scss']
})
export class ModifyGameComponent {
  constructor(private dialogRef: MatDialogRef<ModifyGameComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardRequest) {}

  modifySavedGame(): void {
    this.dialogRef.close(this.data);
  }
  close(): void {
    this.dialogRef.close();
  }
}
