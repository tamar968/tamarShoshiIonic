import { TestBed } from '@angular/core/testing';

import { SearchModalService } from './search-modal.service';

describe('SearchModalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchModalService = TestBed.get(SearchModalService);
    expect(service).toBeTruthy();
  });
});
