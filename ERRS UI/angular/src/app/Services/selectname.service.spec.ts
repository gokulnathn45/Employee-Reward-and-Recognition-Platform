import { TestBed } from '@angular/core/testing';

import { SelectnameService } from './selectname.service';

describe('SelectnameService', () => {
  let service: SelectnameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectnameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
