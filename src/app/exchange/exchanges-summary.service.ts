import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ExchangeBalance } from './exchange-balance';

const exchangesSummaryUrl = environment.baseApiUrl + '/exchange/account';

@Injectable({
  providedIn: 'root'
})
export class ExchangesSummaryService {

  constructor(private http: HttpClient) { }

  getBalances(exchange: string): Observable<ExchangeBalance[]> {
    return this.http.get<ExchangeBalance[]>(exchangesSummaryUrl + "/" + exchange);
  }
}