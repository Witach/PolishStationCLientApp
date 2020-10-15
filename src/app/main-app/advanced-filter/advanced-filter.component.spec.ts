import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvancedFilterComponent } from './advanced-filter.component';

describe('AdvancedFilterComponentComponent', () => {
  let component: AdvancedFilterComponent;
  let fixture: ComponentFixture<AdvancedFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvancedFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvancedFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
