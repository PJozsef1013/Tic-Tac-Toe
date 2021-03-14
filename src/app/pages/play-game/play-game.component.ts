import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoardRequest } from 'src/app/shared/interfaces/board-request';
import { ModifyGameComponent } from 'src/app/shared/modals/modify-game/modify-game.component';
import { ResultAnnouncementComponent } from 'src/app/shared/modals/result-announcement/result-announcement.component';
import { SaveGameComponent } from 'src/app/shared/modals/save-game/save-game.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.scss']
})
export class PlayGameComponent implements OnInit, OnDestroy {
  squares: any[] = [];
  emptyOrLoadedBoard = true;
  isNewGame: boolean;
  gameName: string;

  private ngUnSubscribe = new Subject();
  private nextPlayerIsX: boolean;
  private isWinner = false;

  constructor(private dialog: MatDialog, private apiService: ApiService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (this.squares.length === 0 && !this.apiService.id) {
      this.startNewGame();
    }
    if (this.apiService.id) {
      this.loadSavedGame(this.apiService.id);
      this.isNewGame = false;
      this.gameName = this.apiService.name;
    }
  }

  ngOnDestroy(): void {
    this.apiService.id = null;
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
    this.gameName = '';
  }

  openSaveGameModal(): void {
    const transformedBoard: number[] = [];
    this.transform(transformedBoard);
    const data: BoardRequest = {
      board: transformedBoard.join(''),
      name: ''
    };
    const dialogRef = this.dialog.open(SaveGameComponent, { height: '150px', width: '300px', disableClose: true, data });
    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((savedGame: BoardRequest) => {
        if (savedGame) {
          this.saveGame(savedGame);
        }
      });
  }

  openModifyGameModal(): void {
    const transformedBoard: number[] = [];
    this.transform(transformedBoard);
    const data: BoardRequest = {
      board: transformedBoard.join(''),
      name: this.gameName
    };
    const dialogref = this.dialog.open(ModifyGameComponent, { height: '180px', width: '500px', disableClose: true, data });
    dialogref
      .afterClosed()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((modifiedGame) => {
        if (modifiedGame) {
          this.modifySavedGame(this.apiService.id, modifiedGame);
        }
      });
  }

  private startNewGame(): void {
    this.squares = Array(9).fill('');
    this.nextPlayerIsX = true;
    this.isNewGame = true;
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

  private transform(transformedBoard: number[]): void {
    for (const square of this.squares) {
      if (square === 'X') {
        transformedBoard.push(1);
      }
      if (square === 'O') {
        transformedBoard.push(2);
      }
      if (square === '') {
        transformedBoard.push(0);
      }
    }
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: ['my-snackbar']
    });
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

  private saveGame(board: BoardRequest): void {
    this.apiService
      .saveGame(board)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (response) {
            this.resetGame();
          }
        },
        (error) => {
          if (error) {
            this.openSnackBar(error.error);
          }
        }
      );
  }

  private loadSavedGame(id: number): void {
    this.apiService
      .loadSavedGame(id)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (response) {
            const transformedBoard = response.board.split('');
            for (const square of transformedBoard) {
              if (square === '0') {
                this.squares.push('');
              }
              if (square === '1') {
                this.squares.push('X');
              }
              if (square === '2') {
                this.squares.push('O');
              }
            }
            let xCounter = 0;
            let oCounter = 0;
            for (const item of this.squares) {
              if (item === 'X') {
                xCounter++;
              } else if (item === 'O') {
                oCounter++;
              }
            }
            if (xCounter === oCounter) {
              this.nextPlayerIsX = true;
            } else if (xCounter > oCounter) {
              this.nextPlayerIsX = false;
            }
          }
        },
        (error) => {
          if (error) {
            this.openSnackBar(error.error);
          }
        }
      );
  }

  private modifySavedGame(id: number, game: BoardRequest): void {
    this.apiService
      .modifySavedGame(id, game)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (response) {
            this.resetGame();
          }
        },
        (error) => {
          if (error) {
            this.openSnackBar(error.error);
          }
        }
      );
  }
}
