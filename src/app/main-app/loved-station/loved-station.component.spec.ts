import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedStationComponent } from './loved-station.component';

describe('LovedStationComponent', () => {
  let component: LovedStationComponent;
  let fixture: ComponentFixture<LovedStationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovedStationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovedStationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
