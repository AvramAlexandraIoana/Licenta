import { TestBed } from '@angular/core/testing';

import { ImageHistoryService } from './image-history.service';

describe('ImageHistoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImageHistoryService = TestBed.get(ImageHistoryService);
    expect(service).toBeTruthy();
  });
});
