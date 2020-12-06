import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResembleConfirmComponent } from './resemble-confirm.component';

describe('ResembleConfirmComponent', () => {
  let component: ResembleConfirmComponent;
  let fixture: ComponentFixture<ResembleConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResembleConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResembleConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
