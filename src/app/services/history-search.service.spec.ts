import { TestBed } from '@angular/core/testing';

import { HistorySearchService } from './history-search.service';

describe('HistorySearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HistorySearchService = TestBed.get(HistorySearchService);
    expect(service).toBeTruthy();
  });
});
