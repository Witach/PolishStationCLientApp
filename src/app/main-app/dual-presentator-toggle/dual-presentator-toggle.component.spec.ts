import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DualPresentatorToggleComponent } from './dual-presentator-toggle.component';

describe('DualPresentatorToggleComponent', () => {
  let component: DualPresentatorToggleComponent;
  let fixture: ComponentFixture<DualPresentatorToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DualPresentatorToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DualPresentatorToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
