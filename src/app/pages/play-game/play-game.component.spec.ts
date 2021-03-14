import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
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
      imports: [
        BoardModule,
        ResultAnnouncementModule,
        MatButtonModule,
        MatDialogModule,
        SaveGameModule,
        ModifyGameModule,
        HttpClientTestingModule,
        NoopAnimationsModule,
        MatSnackBarModule
      ],
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

  it('should check winner', () => {
    // Arrange
    component.squares = ['X', '', '', 'O', '', 'X', '', '', 'O'];
    const spy = spyOn<any>(component, 'checkWinner').and.callThrough();
    // Act
    component.makeAStep(1);
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component['isWinner']).toEqual(false);
  });

  it('should check winner and set isWinner to true', () => {
    // Arrange
    component.squares = ['O', 'O', '', 'X', '', 'X', '', '', 'X'];
    const spy = spyOn<any>(component, 'checkWinner').and.callThrough();
    // Act
    component.makeAStep(2);
    // Assert
    expect(spy).toHaveBeenCalled();
    expect(component['isWinner']).toEqual(true);
  });
});
