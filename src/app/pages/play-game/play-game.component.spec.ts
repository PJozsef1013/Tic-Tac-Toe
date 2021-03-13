import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { BoardModule } from 'src/app/shared/components/board/board.module';
import { ModifyGameModule } from 'src/app/shared/modals/modify-game/modify-game.module';
import { ResultAnnouncementModule } from 'src/app/shared/modals/result-announcement/result-announcement.module';
import { SaveGameModule } from 'src/app/shared/modals/save-game/save-game.module';

import { PlayGameComponent } from './play-game.component';

describe('PlayGameComponent', () => {
  let component: PlayGameComponent;
  let fixture: ComponentFixture<PlayGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardModule, ResultAnnouncementModule, MatButtonModule, MatDialogModule, SaveGameModule, ModifyGameModule],
      declarations: [PlayGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
