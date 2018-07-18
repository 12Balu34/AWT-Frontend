import {inject, TestBed} from '@angular/core/testing';

import {ManagerAuthguardService} from './manager-authguard.service';

describe('ManagerAuthguardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManagerAuthguardService]
    });
  });

  it('should be created', inject([ManagerAuthguardService], (service: ManagerAuthguardService) => {
    expect(service).toBeTruthy();
  }));
});
