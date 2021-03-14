import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderModule } from './shared/components/header/header.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HeaderModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [AppComponent]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Tic-Tac-Toe'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Tic-Tac-Toe');
  });
});
