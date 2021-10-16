import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Credentials } from './credentials';
import { TokenStorage } from './token-storage';
import { Promise } from 'q';
import { BehaviorSubject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { CompletionObserver } from 'rxjs';

const apiUrl = environment.baseApiUrl + '/auth';

interface State {
  credentials: Credentials;
  authenticated: boolean;
}

const defaultState: State = {
  credentials: null,
  authenticated: false
};

const _store = new BehaviorSubject<State>(defaultState);

class Store {
  private _store = _store;
  changes = this._store.asObservable().distinctUntilChanged();

  setState(state: State) {
    // console.log('update user credentials state:' + JSON.stringify(state));
    this._store.next(state);
  }

  getState(): State {
    return this._store.value;
  }

  updateState(data: State) {
    this._store.next(Object.assign({}, this.getState(), data));
  }

  purge() {
    this._store.next(defaultState);
  }
}

class Registration {
  constructor(private username: string, private password: string) { }
}

@Injectable()
export class AuthService {

  private verified: boolean = false
  private store: Store = new Store();

  constructor(private http: HttpClient, private tokenlStorage: TokenStorage) { }

  login(username: string, password: string): Observable<Credentials> {
    // console.log("attemp login: " + username + ", " + password)

    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password));

    return this.http.get<Credentials>(apiUrl + "/user", { headers })
      .do(data => {
        this.store.setState({
          credentials: data, authenticated: Boolean(data)
        });
      },
        err => {
          console.log(err);
        });
  }

  register(username: string, password: string): Observable<any> {
    console.log("attemp register: " + username + ", " + password);
    return this.http.post<Credentials>(apiUrl + "/register", new Registration(username, password));
  }

  //called on start or after refresh check local store for tocken
  verifyAuth() {
    // console.log('start verify auth');

    if (this.tokenlStorage.get()) {
      this.http.get<Credentials>(apiUrl + "/user").subscribe(this.verifyObserver);

    } else {
      // console.log('credentials is not found in local storage.');
      this.tokenlStorage.destroy();
      this.store.purge();
    }
  }

  signout() {
    this.http.get<any>(apiUrl + '/logout').subscribe(
      data => {
        // console.log("logout response "+data);
        this.store.purge();
        this.tokenlStorage.destroy();
      },
      err => {
        console.error("logout response with error " + err);
      }
    );
    // this.store.purge();
    // this.tokenlStorage.destroy();
  }

  stateObserver(): Observable<State> {
    return this.store.changes
  }

  currentCredentials(): Observable<Credentials> {
    return this.store.changes.map(data => data.credentials);
  }

  isAuthenticated(): Observable<boolean> {

    var tockenObserver: Observable<boolean> =
      this.store.changes.map(data => data.authenticated);

    if (!this.verified) {
      // console.log("NOT VERIFIED");
      return this.http.get<Credentials>(apiUrl + "/user").do(this.verifyObserver)
        .concat(tockenObserver).last();
    }
    // else {
    // console.log("VERIFIED");
    // }
    return tockenObserver;
  }

  private verifyObserver: CompletionObserver<any> = {
    next: (data) => {
      // console.log("VERIFY AUTH RETURNED");
      this.store.setState({ credentials: data, authenticated: Boolean(data) });
      this.verified = true;
      return true;
    },
    error: (err) => {
      console.error("ERROR VERIFY AUTH RETURNED " + err.error.errorMessage);
      this.tokenlStorage.destroy();
      this.store.purge();
      this.verified = true;
      return false;
    },
    complete: () => {
      // console.log("VERIFY AUTH COMPLETE");
      this.verified = true;
    }
  }
}
