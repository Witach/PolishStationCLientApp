import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolishStationStatsComponent } from './polish-station-stats.component';

describe('PolishStationStatsComponent', () => {
  let component: PolishStationStatsComponent;
  let fixture: ComponentFixture<PolishStationStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolishStationStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolishStationStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
