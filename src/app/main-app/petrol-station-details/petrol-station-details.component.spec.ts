import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetrolStationDetailsComponent } from './petrol-station-details.component';

describe('PetrolStationDetailsComponent', () => {
  let component: PetrolStationDetailsComponent;
  let fixture: ComponentFixture<PetrolStationDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetrolStationDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetrolStationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
