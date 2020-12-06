import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResembleFormComponent } from './resemble-form.component';

describe('ResembleFormComponent', () => {
  let component: ResembleFormComponent;
  let fixture: ComponentFixture<ResembleFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResembleFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResembleFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
