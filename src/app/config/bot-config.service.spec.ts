import { TestBed } from '@angular/core/testing';

import { BotConfigService } from './bot-config.service';

describe('BotConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotConfigService = TestBed.get(BotConfigService);
    expect(service).toBeTruthy();
  });
});
