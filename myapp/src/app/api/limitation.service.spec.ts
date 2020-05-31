import { TestBed } from '@angular/core/testing';

import { LimitationService } from './limitation.service';

describe('LimitationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LimitationService = TestBed.get(LimitationService);
    expect(service).toBeTruthy();
  });
});
