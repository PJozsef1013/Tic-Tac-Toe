import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DeleteGameModule } from 'src/app/shared/modals/delete-game/delete-game.module';
import { LoadGameComponent } from './load-game.component';

describe('LoadGameComponent', () => {
  let component: LoadGameComponent;
  let fixture: ComponentFixture<LoadGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FontAwesomeModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        DeleteGameModule,
        MatTooltipModule,
        MatDialogModule
      ],
      declarations: [LoadGameComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
