import { Injectable , OnInit , OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BotInstance } from './bot-instance';
import { Observable, BehaviorSubject } from 'rxjs';

const botInstanceUrl = environment.baseApiUrl + '/bot/instance';

@Injectable({
  providedIn: 'root'
})
export class BotInstanceService {//implements OnInit,OnDestroy{

  public readonly botInstanceObservable: Observable<BotInstance[]>;
  private intervalObservable: Observable<BotInstance[]>;

  constructor(private http: HttpClient) {

    this.intervalObservable = Observable.timer(0,5000)
        .flatMap(_=>this.getInstances());

    this.botInstanceObservable=this.intervalObservable.publish().refCount();//.share();
  }

  private getInstances(): Observable<BotInstance[]> {
    return this.http.get<BotInstance[]>(botInstanceUrl);
  }
}

