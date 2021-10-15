import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { BotActivation} from './bot-activation'
import { ExchangeAccount } from '../../config/exchange-account';
import { BotConfig } from '../../config/bot-config';

const activationtUrl = environment.baseApiUrl + '/bot/instance';
const conigIdsUrl = environment.baseApiUrl + '/bot/config/all';

@Injectable({
  providedIn: 'root'
})
export class BotActivationService {

  constructor(private http: HttpClient) { }

  start(botActivation:BotActivation): Observable<any> {
    return this.http.post(activationtUrl,botActivation);
  }

  // stop(botTermination:BotTermination): Observable<any> {
  //   return this.http.delete(activationtUrl+"/"+botTermination.instanceId+"/"+botTermination.sell);
  // }

  getConfigsId(): Observable<BotConfig[]> {
    return this.http.get<BotConfig[]>(conigIdsUrl);
  }

  // activeBots(): Observable<BotActivation[]> {
  //   return this.http.get<BotConfig[]>(conigIdsUrl);
  // }
}
