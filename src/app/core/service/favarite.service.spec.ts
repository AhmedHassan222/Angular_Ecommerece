import { TestBed } from '@angular/core/testing';

import { FavariteService } from './favarite.service';

describe('FavariteService', () => {
  let service: FavariteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavariteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
