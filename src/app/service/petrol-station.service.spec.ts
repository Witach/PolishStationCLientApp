import { TestBed } from '@angular/core/testing';

import { PetrolStationService } from './petrol-station.service';

describe('PetrolStationService', () => {
  let service: PetrolStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetrolStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
