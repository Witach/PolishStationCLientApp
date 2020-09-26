import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FuelPricesComponent } from './fuel-prices.component';

describe('FuelPricesComponent', () => {
  let component: FuelPricesComponent;
  let fixture: ComponentFixture<FuelPricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FuelPricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FuelPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
