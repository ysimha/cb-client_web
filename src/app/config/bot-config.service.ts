import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BotConfig } from './bot-config';

const apiUrl = environment.baseApiUrl + '/bot/config';

@Injectable()
export class BotConfigService {

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    return this.http.get(apiUrl);
  }

  update(botConfig:BotConfig): Observable<any> {
    return this.http.put(apiUrl,botConfig)
  }
}
