import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { TradingSessionRecord } from './history';

const historyUrl = environment.baseApiUrl + "/history";

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http: HttpClient) { }

  getHistory(): Observable<TradingSessionRecord[]> {
    return this.http.get<TradingSessionRecord[]>(historyUrl);
  }
}
