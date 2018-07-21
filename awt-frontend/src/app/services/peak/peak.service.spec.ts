import { TestBed, inject } from '@angular/core/testing';

import { PeakService } from './peak.service';

describe('PeakService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PeakService]
    });
  });

  it('should be created', inject([PeakService], (service: PeakService) => {
    expect(service).toBeTruthy();
  }));
});
