import { TestBed } from '@angular/core/testing';

import { CategoryTransactionsService } from './category-transactions.service';

describe('CategoryTransactionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryTransactionsService = TestBed.get(CategoryTransactionsService);
    expect(service).toBeTruthy();
  });
});
