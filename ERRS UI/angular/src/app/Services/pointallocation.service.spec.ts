import { TestBed } from '@angular/core/testing';

import { PointallocationService } from './pointallocation.service';

describe('PointallocationService', () => {
  let service: PointallocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PointallocationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
