import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapListPresentatorComponent } from './map-list-presentator.component';

describe('MapListPresentatorComponent', () => {
  let component: MapListPresentatorComponent;
  let fixture: ComponentFixture<MapListPresentatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapListPresentatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapListPresentatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
