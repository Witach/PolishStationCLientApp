import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginTogglePresenterButtonComponent } from './login-toggle-presenter-button.component';

describe('LoginTogglePresenterButtonComponent', () => {
  let component: LoginTogglePresenterButtonComponent;
  let fixture: ComponentFixture<LoginTogglePresenterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginTogglePresenterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginTogglePresenterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
