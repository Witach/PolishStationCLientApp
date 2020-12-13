import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LovedListComponent } from './loved-list.component';

describe('LovedListComponent', () => {
  let component: LovedListComponent;
  let fixture: ComponentFixture<LovedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LovedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LovedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
