import { TestBed } from '@angular/core/testing';

import { AdminRewardService } from './admin-reward.service';

describe('AdminRewardService', () => {
  let service: AdminRewardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminRewardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
