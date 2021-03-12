import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { BoardResponse } from 'src/app/shared/interfaces/board-response';
import { SavedGameDatas } from 'src/app/shared/interfaces/saved-game-datas';
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

  constructor(private apiservice: ApiService) {}

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
  }
  searchGame(): void {
    this.isSearchClicked = true;
    this.filterSavedGames(this.filterInput);
  }

  private transform(response: BoardResponse[], transformedGameContainer: any[]): void {
    for (const board of response) {
      const savedGameDatas: SavedGameDatas = {
        id: board.id,
        name: board.name,
        board: []
      };
      let transformedBoard = board.board.split('');
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
    this.apiservice
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
    this.apiservice
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
}
