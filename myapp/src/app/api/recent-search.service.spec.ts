import { TestBed } from '@angular/core/testing';

import { RecentSearchService } from './recent-search.service';

describe('RecentSearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecentSearchService = TestBed.get(RecentSearchService);
    expect(service).toBeTruthy();
  });
});
