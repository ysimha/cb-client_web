import { Injectable, Inject } from '@angular/core';

const CREDENTIAL_KEY = 'xAuthToken';

@Injectable()
export class TokenStorage {

  constructor() { }

  save(store) {
    window.sessionStorage[CREDENTIAL_KEY] = store;
  }

  get() {
    return window.sessionStorage[CREDENTIAL_KEY];
  }

  destroy() {
    window.sessionStorage.removeItem(CREDENTIAL_KEY);
  }

}
