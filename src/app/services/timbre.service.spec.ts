import { TestBed } from '@angular/core/testing';

import { TimbreService } from './timbre.service';

describe('TimbreService', () => {
  let service: TimbreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimbreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
