import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualPresentatorComponent } from './dual-presentator.component';

describe('DualPresentatorComponent', () => {
  let component: DualPresentatorComponent;
  let fixture: ComponentFixture<DualPresentatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualPresentatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualPresentatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
