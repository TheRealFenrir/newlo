import { TestBed, inject } from '@angular/core/testing';

import { EloService } from './elo.service';

describe('EloService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EloService]
    });
  });

  it('should be created', inject([EloService], (service: EloService) => {
    expect(service).toBeTruthy();
  }));
});
