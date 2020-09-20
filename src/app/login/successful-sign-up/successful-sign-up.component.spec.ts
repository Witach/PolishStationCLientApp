import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfulSignUpComponent } from './successful-sign-up.component';

describe('SuccessfulSignUpComponent', () => {
  let component: SuccessfulSignUpComponent;
  let fixture: ComponentFixture<SuccessfulSignUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessfulSignUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessfulSignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
