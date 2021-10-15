import { TestBed } from '@angular/core/testing';

import { BotInstanceService } from './bot-instance.service';

describe('BotInstanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BotInstanceService = TestBed.get(BotInstanceService);
    expect(service).toBeTruthy();
  });
});
