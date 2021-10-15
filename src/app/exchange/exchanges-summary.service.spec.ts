import { TestBed } from '@angular/core/testing';

import { ExchangesSummaryServiceService } from './exchanges-summary-service.service';

describe('ExchangesSummaryServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExchangesSummaryServiceService = TestBed.get(ExchangesSummaryServiceService);
    expect(service).toBeTruthy();
  });
});
