import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { BoardRequest } from '../../interfaces/board-request';

@Component({
  selector: 'app-save-game',
  templateUrl: './save-game.component.html',
  styleUrls: ['./save-game.component.scss']
})
export class SaveGameComponent {
  name = '';

  readonly faTrash = faTrash;

  constructor(private dialogRef: MatDialogRef<SaveGameComponent>, @Inject(MAT_DIALOG_DATA) public data: BoardRequest) {}

  saveGame(): void {
    this.data.name = this.name;
    console.log(this.data);
    this.dialogRef.close(this.data);
  }

  backToTheGame(): void {
    this.dialogRef.close();
  }
}
