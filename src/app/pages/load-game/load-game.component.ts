import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BoardResponse } from 'src/app/shared/interfaces/board-response';
import { SavedGameDatas } from 'src/app/shared/interfaces/saved-game-datas';
import { DeleteGameComponent } from 'src/app/shared/modals/delete-game/delete-game.component';
import { ApiService } from 'src/app/shared/services/api.service';

@Component({
  selector: 'app-load-game',
  templateUrl: './load-game.component.html',
  styleUrls: ['./load-game.component.scss']
})
export class LoadGameComponent implements OnInit, OnDestroy {
  filterInput: string;
  isFiltered = false;
  isSearchClicked = false;
  listedSavedGames: any[] = [];
  filteredSavedGame: any[] = [];

  readonly faTrash = faTrash;
  readonly faTimes = faTimes;
  readonly faCircle = faCircle;
  readonly faSearch = faSearch;

  private ngUnSubscribe = new Subject();

  constructor(private apiService: ApiService, private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.listSavedGames();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

  resetInputField(): void {
    this.filterInput = '';
    this.isFiltered = false;
    this.filteredSavedGame = [];
    this.isSearchClicked = false;
    this.listedSavedGames = [];
    this.listSavedGames();
  }

  searchGame(): void {
    this.isSearchClicked = true;
    this.filterSavedGames(this.filterInput);
  }
  shareDatas(id: number, name: string): void {
    this.apiService.id = id;
    this.apiService.name = name;
  }

  openDeleteGameModal(id: number): void {
    const data: number = id;
    const dialogref = this.dialog.open(DeleteGameComponent, { height: '140px', width: '475px', disableClose: true, data });
    dialogref
      .afterClosed()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe((idOfDeletableGame) => {
        if (idOfDeletableGame) {
          this.deleteSavedGame(idOfDeletableGame);
        }
      });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'close', {
      duration: 7000,
      verticalPosition: 'top',
      panelClass: ['my-snackbar']
    });
  }

  private transform(response: BoardResponse[], transformedGameContainer: any[]): void {
    for (const board of response) {
      const savedGameDatas: SavedGameDatas = {
        id: board.id,
        name: board.name,
        board: []
      };
      const transformedBoard = board.board.split('');
      for (const square of transformedBoard) {
        if (square === '0') {
          savedGameDatas.board.push('');
        }
        if (square === '1') {
          savedGameDatas.board.push('X');
        }
        if (square === '2') {
          savedGameDatas.board.push('O');
        }
      }
      transformedGameContainer.push(savedGameDatas);
    }
  }

  private listSavedGames(): void {
    this.apiService
      .listSavedGames()
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (response) {
            this.transform(response, this.listedSavedGames);
          }
        },
        (error) => {}
      );
  }

  private filterSavedGames(name: string): void {
    this.apiService
      .listSavedGames(name)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (response) {
            this.transform(response, this.filteredSavedGame);
            this.isFiltered = true;
          }
        },
        (error) => {}
      );
  }

  private deleteSavedGame(id: number): void {
    this.apiService
      .deleteSavedGame(id)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(
        (response) => {
          if (this.filterInput) {
            this.filteredSavedGame = [];
            this.filterSavedGames(this.filterInput);
          } else if (!this.filterInput) {
            this.listedSavedGames = [];
            this.listSavedGames();
          }
        },
        (error) => {
          this.openSnackBar(error.error);
        }
      );
  }
}
