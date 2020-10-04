import { TestBed } from '@angular/core/testing';

import { DualToggleEventService } from './dual-toggle-event-service';

describe('DualToggleEventServiceService', () => {
  let service: DualToggleEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DualToggleEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
