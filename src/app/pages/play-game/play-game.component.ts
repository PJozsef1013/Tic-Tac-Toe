import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ResultAnnouncementComponent } from 'src/app/shared/modals/result-announcement/result-announcement.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit, OnDestroy {
  squares: any[] = [];
  emptyOrLoadedBoard = true;

  private ngUnSubscribe = new Subject();
  private nextPlayerIsX: boolean;
  private isWinner: boolean;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startNewGame();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  get Player(): string {
    return this.nextPlayerIsX ? 'X' : 'O';
  }

  makeAStep(index: number): void {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.Player);
      this.nextPlayerIsX = !this.nextPlayerIsX;
      this.emptyOrLoadedBoard = false;
    }
    this.checkWinner();
  }

  resetGame(): void {
    this.startNewGame();
    this.emptyOrLoadedBoard = true;
  }

  private startNewGame(): void {
    this.squares = Array(9).fill('');
    this.nextPlayerIsX = true;
  }

  private checkWinner(): void {
    const winnerCases = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (const line of winnerCases) {
      const [a, b, c] = line;
      if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
        this.isWinner = true;
        this.openResultDialog(this.squares[a]);
        break;
      }
    }
    let counter = 0;
    this.squares.forEach((square) => {
      counter += square !== '' ? 1 : 0;
    });
    if (counter === 9 && !this.isWinner) {
      this.openResultDialog();
    }
  }

  private openResultDialog(result?: string): void {
    const data = result;
    const dialogRef = this.dialog.open(ResultAnnouncementComponent, { height: '175px', width: '550px', disableClose: true, data });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(() => {
        this.resetGame();
        this.isWinner = false;
      });
  }
}
