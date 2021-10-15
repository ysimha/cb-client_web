import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { UserProfile } from './user-profile';
import { ExchangeAccount } from './exchange-account';

const apiUrl = environment.baseApiUrl + '/profile';
const exchangeAccountUrl = apiUrl + '/excattc';
const exchangesUrl = environment.baseApiUrl + '/exchanges/public';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(apiUrl);
  }

  getExchanges(): Observable<any> {
    return this.http.get(exchangesUrl);
  }

  addEchangeAccount(axchangeAccountea: ExchangeAccount): Observable<any> {
    return this.http.post(exchangeAccountUrl, axchangeAccountea)
  }

  deleteExchangeAccount(exchange: string): Observable<any> {
    return this.http.delete(exchangeAccountUrl + "/" + exchange)
  }
}
