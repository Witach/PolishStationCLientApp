import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetrolStaionComponent } from './edit-petrol-staion.component';

describe('EditPetrolStaionComponent', () => {
  let component: EditPetrolStaionComponent;
  let fixture: ComponentFixture<EditPetrolStaionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPetrolStaionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPetrolStaionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
