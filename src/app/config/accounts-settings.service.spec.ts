import { TestBed } from '@angular/core/testing';

import { AccountsSettingsService } from './accounts-settings.service';

describe('AccountsSettingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountsSettingsService = TestBed.get(AccountsSettingsService);
    expect(service).toBeTruthy();
  });
});
