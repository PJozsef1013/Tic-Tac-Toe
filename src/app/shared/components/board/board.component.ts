import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  @Input() board = [];
  @Output() stepMaked = new EventEmitter();

  readonly faCircle = faCircle;
  readonly faTimes = faTimes;

  constructor() {}

  makeAStep(idx: number): void {
    this.stepMaked.emit(idx);
  }
}
